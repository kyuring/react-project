import React, {Component} from 'react'
import Contents from './Contents/Contents'
import SlideMenuBar from './SlideMenu/SlideMenuBar'
import TopSlideMenuBar from './SlideMenu/MobileSlideMenuBar'
import './Body.css'

class Body extends Component{
    render(){
        return(
            <div className="BodyContainer">
                <TopSlideMenuBar />
                <SlideMenuBar />
                <Contents />
            </div>
        )
    }
}
export default Body
