import React, {Component} from 'react'
import './Contents.css'
import { Route, Routes} from "react-router-dom";
import Login from './Login'
import ProxyComponent from './ProxyComponent';
import BoardList from './BoardList';
import BoardDetail from './BoardDetail';
import BoardSave from './BoardSave';

class Contents extends Component{
    render(){
        return(
            <div className="ContentsContiner">
                <Routes>
                    <Route exact path="/"></Route>
                    <Route path="/Login" element={<Login/>}></Route>
                    <Route path="/reactProxy" element={<ProxyComponent/>}></Route>
                    <Route path="/board" element={<BoardList/>}></Route>
                    <Route path="/board/boardDetail" element={<BoardDetail/>}></Route>
                    <Route path="/board/boardSave" element={<BoardSave/>}></Route>
                </Routes>
            </div>
        )
    }
}
export default Contents
