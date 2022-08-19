import React, {Component} from 'react';
const axios = require('axios');

class ProxyComponent extends Component{
    componentDidMount = async() => {
        // get 방식
        // const response = await fetch('/users');
        // const body = await response.json();
        // console.log("body ::: " + body.message);

        // post 방식
        axios.post('/users', {}).then(res => {console.log("response data message : " + res.data.message)})
    }
    render(){
        return(
            <>
            <h1> Proxy Call Node Api!!! </h1>
            </>
        )
    }
}
export default ProxyComponent;