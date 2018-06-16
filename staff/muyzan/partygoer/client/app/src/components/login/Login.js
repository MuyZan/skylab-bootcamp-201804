'use strict'

import React, { Component } from 'react'
import logic from '../../logic'
import './login.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Animated} from "react-animated-css";

class Login extends Component{

    constructor(){
        super()

        this.state = {
            username: "",
            password: "",
            errorMessage:"", 
            visibleComponent:true 
        }
    }




    _handlerWriteUsername = e =>{
        this.setState({username: e.target.value})
      }
    
      _handlerWritePassword = e =>{
        this.setState({password: e.target.value})
      }
    
      
      _handlerLogin = e => {
        e.preventDefault();
    
        const { username, password} = this.state

        this.setState({username:"", password:""})
 
        logic.login(username, password)
        .then(res => {
            this.setState({visibleComponent:false})
           
           this.props.onLogin()

        })
        .catch(data =>{
            this.setState({errorMessage: data.message})
            toast.error(`Ups! Something happens: ${this.state.errorMessage}`)
          })
        
      }

    render(){
        return(
            <div>

<Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={this.state.visibleComponent}>
   

<h1>Sign in</h1> 
        <form onSubmit={this._handlerLogin}>
        <input type="text" value={this.state.username} name="username" placeholder="Insert your username" onChange={this._handlerWriteUsername}/>
        <input type="password" value={this.state.password } name="password" placeholder="Insert your password " onChange={this._handlerWritePassword}/>
        <button type="submit">Login</button>
        </form> 
      

</Animated>


            <ToastContainer autoClose={3000}/>


            </div>
        )
    }
}

export default Login

