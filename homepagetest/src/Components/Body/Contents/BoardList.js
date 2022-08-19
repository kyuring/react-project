import React, {Component} from 'react';
import './Board.css';
import {Link} from 'react-router-dom'
const axios = require('axios');

class BoardList extends Component {
    constructor(props) {
        super(props);
        // state 정의
        this.state = {
            responseBoardList : {},
            append_BoardList : ""
        }
    }
    componentDidMount(){
        this.callBoardListApi();
    }
    callBoardListApi = async() => {
        axios.post('/board?type=list', {
        }).then(res => {
            try{
                // state 값 지정
                this.setState({responseBoardList : res})
                this.setState({append_BoardList : this.BoardListAppend()})
                // console.log(this.state.responseBoardList);
            }catch(e){
                console.log('[BoardList] callBoardListApi state setting error : ' + e);
            }
        }) .catch(e => {
            console.log('[BoardList] callBoardListApi post error : ' + e)
        })
    }
    BoardListAppend = () => {
        let result = [];
        var BoardListData = this.state.responseBoardList.data;

        for (let i=0; i<BoardListData.json.length; i++){
            var data = BoardListData.json[i];
            //console.log(data);

            // 값 넣기
            var end_date = data.end_date;
            var today = new Date();
            var year = today.getFullYear();
            var month = today.getMonth()+1;
            var day = today.getDate();
            var today_format = year+"-"+(("00"+month.toString()).slice(-2))+"-"+(("00"+day.toString()).slice(-2));

            result.push(
                <Link to={'/board/boardDetail/'} key={data.swt_code} state = {{'swt_code': data.swt_code}}>
                <div className={today_format.valueOf() < end_date.valueOf() ? "boardCard" : "boardCardAfter"} onClick={this.clickBoard}>
                    <div className="boardCardTitle">
                        <h4>{data.swt_toolname}</h4>
                        <p>{data.swt_comments}</p>
                    </div>
                    <div className="boardCardInfo">
                        {/* <p>{data.reg_user}</p> */}
                        <p>{end_date}</p>
                    </div>
                </div>  
                </Link>
            )
        }
        return result

    }
    render(){
        return(
            <section className="BoardListCardContiner">
                {this.state.append_BoardList}
                <Link to={'/board/boardSave'} state={{'swt_code': 'register'}}>
                <div className="boardCardAdd">
                    +
                </div>
                </Link>
            </section>
        )
    }
}
export default BoardList;