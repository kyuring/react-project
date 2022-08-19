import React, {Component} from 'react'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import 'bootstrap/dist/css/bootstrap.css'
import Body from './Components/Body/Body';
import './App.css'
import { BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div className="AppContainer">
        <Header />
        <BrowserRouter>
          <Body />  
        </BrowserRouter>
        <Footer />
    </div>
  );
}

export default App;
