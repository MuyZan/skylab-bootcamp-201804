import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../logo.svg'
import './landing.css'
import logic from "../../logic"
import Login from "./../login/login"

class Landing extends Component{

    constructor(){
        super()

        this.state = {
            username: "",
            password: "",
            userId: "",
      
       
        }
    }

  
  

    _handlerSignIn = () => {
      this.props.history.push("/home")
    }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Heeeello, React!</h1>
        </header>
  

      <div className="landing-container">
      {/* CARRUSEL*/ }
      <div className="carrusel">

      <h2>Here a info carrusel</h2>
      </div>
      <Link to={`/register`} activeClassName=""><h3>Sign up</h3></Link>
         
         <h4>Do you already have an account?</h4> 
         <Link to={`/login`} activeClassName="">Sign In</Link>

      </div>




      </div>
    );
  }
}

export default Landing
