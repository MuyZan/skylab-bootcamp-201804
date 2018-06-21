import React, { Component } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify'
import { Animated } from "react-animated-css";
import logic from '../../logic'
import './login.css'
import 'react-toastify/dist/ReactToastify.css'

const logoMan = require('./../../static/images/logo/logo.svg')

export default class Login extends Component {

    constructor() {
        super()

        this.state = {
            username: "",
            password: "",
            errorMessage: "",
        }
    }

    _handlerWriteUsername = e => this.setState({ username: e.target.value })
    
    _handlerWritePassword = e => this.setState({ password: e.target.value })
    
    _handlerLogin = e => {

        e.preventDefault();

        const { username, password, errorMessage } = this.state

        this.setState({ username: "", password: "" })

        logic.login(username, password)
            .then(res => this.props.onLogin())
            .catch(data => {
                this.setState({ errorMessage: data.message })
                toast.error(`Ups! Something happens: ${errorMessage}`)
            })
    }

    render() {
        const { username, password } = this.state
        return (
            <div className="container">
             <header className="header"><span className="title">partygoer</span><img className="logo" src={logoMan} /></header>

            <div className="main-login">
                <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                    <h3>Sign in</h3>
                    <form onSubmit={this._handlerLogin}>

  <label className="field">
  <input className="field-input" type="text" value={username} name="username" placeholder="Insert your username" onChange={this._handlerWriteUsername} autocomplete="off" required/>

              <span className="field-label-wrap">
                <span className="field-label">Username</span>
              </span>
            </label>

            <label className="field">
            <input className="field-input" required type="password" value={password} name="password" placeholder="Insert your password " onChange={this._handlerWritePassword}  autocomplete="off" required/>

              <span className="field-label-wrap">
                <span className="field-label">Password</span>
              </span>
            </label>


                   
                        <button type="submit">Login</button>
                    </form>

                </Animated>

            </div>
            <ToastContainer autoClose={3000} transition={Slide} toastClassName='red-toast-container' />

                <footer className="footer">Coded with ♥ and <span role="img" aria-labelledby="droplet">💧💧</span> by Zan</footer>

            </div>
        )
    }
}



/*
 <label htmlFor="username"> Username:</label>

                        <input id="username" required type="text" value={username} name="username" placeholder="Insert your username" onChange={this._handlerWriteUsername} autocomplete="off" required/>
                        <label htmlFor="password"> Password:</label>

                        <input id="password" required type="password" value={password} name="password" placeholder="Insert your password " onChange={this._handlerWritePassword}  autocomplete="off" required/>

*/