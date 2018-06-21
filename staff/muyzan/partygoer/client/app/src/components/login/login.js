import React, { Component } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify'
import { Animated } from "react-animated-css";
import Header from './../header/header'
import Footer from './../footer/footer'
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
                <Header/>
                <div className="main-login">
                    <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>

                        <h3>Sign in</h3>
                        <form onSubmit={this._handlerLogin}>

                            <label className="field">
                                <input className="field-input" type="text" value={username} name="_username" placeholder="Insert your username" onChange={this._handlerWriteUsername} autoComplete="off" required />
                                <span className="field-label-wrap">
                                    <span className="field-label">Username</span>
                                </span>
                            </label>

                            <label className="field">
                                <input className="field-input"  type="password" value={password} name="_password" placeholder="Insert your password " onChange={this._handlerWritePassword} autoComplete="off" required />

                                <span className="field-label-wrap">
                                    <span className="field-label">Password</span>
                                </span>
                            </label>

                            <button type="submit">Login</button>
                        </form>

                    </Animated>

                </div>
                <ToastContainer autoClose={3000} transition={Slide} toastClassName='red-toast-container' />
                <Footer/>
            </div>
        )
    }
}