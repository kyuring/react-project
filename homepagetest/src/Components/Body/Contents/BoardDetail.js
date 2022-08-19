import React, {useEffect, useState} from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import './Board.css';
import './BoardTable.css';
import Items from './BoardFormItems.json';
import axios from 'axios';
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

let swt_code= '';

function BorderDetail(props){
    // 네비게이션 
    let navigate = useNavigate();

    // 한번만 실행함
    useEffect( () => {
        CallSwToolfoApi();
    }, ['/']); 
    

    const location = useLocation();
    const [boardInfo, setBoardInfo] = useState({});
    const setBoard = (boardData) => {
        setBoardInfo(boardData);
    }
    swt_code = location.state.swt_code;

    // 화면 그리는 용도
    return(
        <>
        <div className="BoardListCardContiner">
            <div className="BoardTitle">
                <p>보기 페이지</p>
            </div>
            <div className="BoardTableAria">
                <table className="detailTable" id='detailTable'>
                    <thead>
                        <tr>
                            <th colSpan="2"> 테이블 제목 </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        Items.BoardFormItems.map((item, index) => {
                            if(item.id != "swt_code" && item.id != "is_Email") {
                                return(
                                    <tr  key={index}>
                                        <th>{item.label}</th>
                                        <td>{boardInfo[item.value]}</td>
                                    </tr>
                                )
                            }
                        })
                    }
                    </tbody>
                </table>

                <div className="btn">
                    <Link to={'/board'} className="cancelBtn"> 취소 </Link>
                    <Link to={'/board/boardSave'} state={{'swt_code': swt_code}} className="modifyBtn">수정</Link>
                    <div onClick={exportPDF} className="pdfBtn"> PDF 저장 </div>
                    <div onClick={deleteBoard} className="pdfBtn"> 삭제 </div>
                </div>
            </div>
        </div>
        </>
    )
    // 가져올때 사용
    async function CallSwToolfoApi (){
        axios.post('/board?type=list', { 
            swt_code : swt_code
        }).then(res => {
            try{
                setBoard(res.data.json[0]);
                console.log("CallSwToolfoApi");
            } catch(e) {
                console.log('[BoardDetail] API Response error : ' + e);
            }
        }).catch(err => {
            console.log('[BoardDetail] API Load error : ' + err);
        })
    }
    //pdf 저장
    function exportPDF(){
        // html 캡쳐
        html2canvas(document.getElementById('detailTable')).then(canvas=>{
            var imgData = canvas.toDataURL('image/png');
            var imgWidth = 190; // 이미지 가로 길이(mm) / A4 기준 210mm
            var pageHeight = imgWidth * 1.414;  // 출력 페이지 세로 길이 계산 A4 기준
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            var margin = 10; // 출력 페이지 여백설정
            var doc = new jsPDF('p', 'mm');
            var position = 0;
               
            // 첫 페이지 출력
            doc.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
                 
            // 한 페이지 이상일 경우 루프 돌면서 출력
            while (heightLeft >= 20) {
                position = heightLeft - imgHeight;
                doc.addPage();
                doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            doc.save("a4.pdf");
        })
    }
    async function deleteBoard(){
        try{
            const response = await fetch('/board?type=deleteBoard', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({"swt_code" : swt_code}),
            });
            const body = await response.text();
            if(body == "success") {
                alert("삭제 성공");
                setTimeout(function(){
                    navigate(-1);
                }.bind(this), 100);
            } else {
                alert('body 망 작업중 에러 발생');
            }
        }catch {
            alert('작업중 에러 발생');
        }
    }
}
export default BorderDetail;
