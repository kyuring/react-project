import React, {Component, useState} from 'react'
import './SlideMenuBar.css'
import Items from './SlideMenuItems.json'


class TopSlideMenuBar extends Component {
    render(){
        
        return(
            <div className="TopSlideMenuBar">
                <div className="TopSlideMenuBarTitle">
                    <img src='http://www.urbanbrush.net/web/wp-content/uploads/edd/2020/02/urbanbrush-20200227023608426223.jpg'></img>
                    <div className="SlideMenuItemMyPageText">
                        <p>이니라인 박규리</p>
                    </div>
                </div>
                <div className="TopSlideMenuBarItems">
                    <ul>
                    {
                        Items.SlideMenuItem.map((item, index) => {
                            return(
                                <li key={index} onClick={()=>console.log({index})}>{item.name}</li>
                            )
                        })
                    }
                    </ul>
                </div>
            </div>
        )
    }    
}
export default TopSlideMenuBar;
