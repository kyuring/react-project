import React, {Component} from 'react'
import './Header.css'
import draw from '../../img/DrawMenu.png'

class Header extends Component{
    render(){
        return(
            <div className="HeaderContainer">
                <div className="HeaderLogo">
                    Kyuring
                </div>
                <div className="HeaderLists">
                    <ul>
                        <li>
                            <a>MENU1</a>
                        </li>
                        <li>
                            <a>MENU2</a>
                        </li>
                        <li>
                            <a>MENU3</a>
                        </li>
                        <li>
                            <a>MENU4</a>
                        </li>
                    </ul>
                </div>
                <div className="HeaderDrawerMenu">
                    <img src={draw} ></img>
                    <div className="HeaderDrawMenuLists"></div>
                </div>
            </div>
        )
    }
}

export default Header;