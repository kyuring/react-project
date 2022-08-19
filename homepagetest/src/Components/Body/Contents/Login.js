import React, {Component} from 'react'
import './Login.css'
class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isType : 'company'
        }
    }
    handleChange = (e) =>{
        this.setState(
            {
                isType : e.target.value
            }
        )
    }
    render(){
        return(
            <div className="LoginContainer">
                <form className="LoginForm">
                    <div className="login_type">
                        <label className={(this.state.isType == "company" ? "login_type_label login_type_label_check" : "login_type_label")}>
                            <input type="radio" name="loginType" id="company" value="company" onChange={this.handleChange}/>
                            회사
                        </label>
                        <label className={(this.state.isType == "employee" ? "login_type_label login_type_label_check" : "login_type_label")}>
                            <input type="radio" name="loginType" id="employee" value="employee" onChange={this.handleChange}/>
                            직원
                        </label>
                    </div>
                    <div className="form_box">
                        <input className="box_input" type="text" name="id" id="id" placeholder="ID"/>
                        <input className="box_input" type="password" name="password" id="password" placeholder="Password"/>           
                        <input className="btn_Login" type="button" value="Login"/>
                        <input className="btn_Login" type="button" value="Register"/>
                    </div>
                </form>
            </div>
        )
    }
}
export default Login