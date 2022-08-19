import React, {useEffect, useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Board.css';
import Items from './BoardFormItems.json';
import $ from 'jquery';
import axios from 'axios';
let swt_code= '';

function BoardSave(props) {
    // 네비게이션
    let navigate = useNavigate();

    useEffect( () => {
        if(swt_code != 'register') {
            CallSwToolfoApi();
        }
    }, ['/']); 

    const location = useLocation();
    swt_code = location.state.swt_code;
    const [boardInfo, setBoardInfo] = useState({});
    const setBoard = (boardData) => {
        setBoardInfo(boardData);
        console.log(boardInfo);
    }

    async function CallSwToolfoApi (){
        axios.post('/board?type=list', { 
            swt_code : swt_code
        }).then(res => {
            try{
                setBoard(res.data.json[0]);
                console.log("CallSwToolfoApi");
            } catch(e) {
                console.log('[BoardSave] API Response error : ' + e);
            }
        }).catch(err => {
            console.log('[BoardSave] API Load error : ' + err);
        })
    }

    async function submitClick(type, e){
        let swt_toolname_checker = $('#is_swt_toolname').val();
        let swt_function_checker = $('#is_is_swt_function').val();
        let swt_LabeImg_checker = $('#is_LabeImg').val();
        let swt_MainImg_checker = $('#is_MainImg').val();
        let swt_demo_site_checker = $('#is_swt_demo_site').val();
        let swt_ManualName_checker = $('#is_is_ManualName').val();
        let swt_github_url = $('#is_swt_github_url').val();
        let swt_end_date = $('#is_end_date').val();
        let fnValidate = (e) => {
            if( swt_toolname_checker === '' ){
                alert('툴이름 확인필요');
                return false;
            } else if(swt_function_checker === '' || swt_LabeImg_checker === '' || swt_MainImg_checker === '' 
                || swt_demo_site_checker === '' || swt_ManualName_checker === '' 
                || swt_github_url === '' || swt_end_date === ''){
                alert("입력값 중 비어있는게 있음!");
                return false;
            }
            return true;
        }
        if(fnValidate()) {
            // serialize() : form에 있는 값을 URL 인코딩 표기법으로 텍스트 문자열을 만듬
            var jsonstr = $("form[name='inupForm']").serialize();
            jsonstr = decodeURIComponent(jsonstr);
            var json_form = JSON.stringify(jsonstr).replace(/\"/gi, '');
            json_form = "{\"" +json_form.replace(/\&/g, '\",\"').replace(/=/gi,'\":"') + "\"}";
            alert(type);
            try{
                const response = await fetch('/board?type=' + type, {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json',
                    },
                    body : json_form,
                });
                const body = await response.text();
                if(body == "success") {
                    if(type == "insertBoard") {
                        alert("insert 성공!");
                    }
                    setTimeout(function(){
                        navigate('/board');
                    }.bind(this), 100);
                } else {
                    alert('body 망 작업중 에러 발생');
                }
            }catch {
                alert('작업중 에러 발생');
            }
        }
    }

    return(
        <>
            <section className="BoardListCardContiner">
                <div className="BoardTitle">
                    <p>등록 과 수정 페이지</p>
                </div>
                <div className="BoardForm">
                    <form name="inupForm" id="inupForm" action="" method="POST">
                        {
                            Items.BoardFormItems.map((item, index) => {
                                if(item.id === "swt_code" || item.id === "is_Email") {
                                    if(item.id === "swt_code") {
                                        return(
                                            <input id={item.id} type="hidden" name={item.id} key={index} value={swt_code? swt_code : ''}/>
                                        )
                                    } else {
                                        return(
                                            <input id={item.id} type="hidden" name={item.id} key={index} />
                                        )
                                    }
                                } else if(item.id === "is_end_date") {
                                    return (
                                        <div className="BoradFormLineSet" key={index}>
                                            <label className="BoardFormLabel" htmlFor={item.id}>{item.label}</label>
                                            <input type="date" name={item.id} id={item.id} className="BoardFormInput" defaultValue = {(boardInfo[item.value]) ? boardInfo[item.value] : ''}/>
                                        </div>
                                    )
                                } else {
                                    return(
                                        <div className="BoradFormLineSet" key={index}>
                                            <label className="BoardFormLabel" htmlFor={item.id}>{item.label}</label>
                                            <input type="text" name={item.id} id={item.id} className="BoardFormInput" defaultValue = {(boardInfo[item.value]) ? boardInfo[item.value] : ''}/>
                                        </div>
                                    )
                                }

                            })
                        }
                        <div className="btn">
                            <Link to={'/board'} className="cancelBtn"> 취소 </Link>
                            {
                               swt_code == 'register' ? <div onClick={(e) => submitClick('insertBoard',e) } className="saveBtn">저장</div> : <div onClick={(e) => submitClick('updateBoard',e) } className="saveBtn">수정</div>
                            }                            
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default BoardSave;