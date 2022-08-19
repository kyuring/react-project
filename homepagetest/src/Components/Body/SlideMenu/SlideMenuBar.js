import React, {Component, useState} from 'react'
import './SlideMenuBar.css'
import Items from './SlideMenuItems.json'
import {Link} from 'react-router-dom'

var slideMenuBarItemClick = (name, url) => {
    //alert(url);
}

class SlideMenuBar extends Component {
    render(){
        
        return(
            <div className="SlideMenuBar">
                <ul className="SlideMenuList">
                    <li className="SlideMenuItemMyPage">
                        <img src='http://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg'></img>
                        <div className="SlideMenuItemMyPageText">
                            <p>이니라인</p>
                            <p>박규리</p>
                        </div>
                    </li>
                    {
                        Items.SlideMenuItem.map((item, index) => {
                            return(
                                <Link to={item.contenturl} key={index}>
                                    <li className="SlideMenuItem"  onClick={()=>{slideMenuBarItemClick(item.name, item.contenturl)}}>{item.name}</li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }    
}
export default SlideMenuBar;
