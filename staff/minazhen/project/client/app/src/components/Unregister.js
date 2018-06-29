import React, { Component } from 'react';
import '../App.css';
import { withRouter } from 'react-router-dom'
// import App from '../App'
import logic from '../logic/index'
// import Xtorage from './Xtorage'


class Unregister extends Component {
    state = {
        user: '',
        password: '',
        state: ''
    }
    userName = (e) => {
        const user = e.target.value
        this.setState({ user })
    }
    userPassword = (e) => {

        const password = e.target.value
        this.setState({ password })
    }
    submit = (e) => {
        e.preventDefault()
            //ALERT are you sure?
        logic.unregister(this.state.user, this.state.password)
            // .then(res => {
            //     if (res.status === 'OK') {
            //         Xtorage.local.remove('user')
            //         //alert ok
            //     } else {
            //         // alert error
            //     }
            // })
            .then(this.bucle)
                
    }
    bucle = () => {
        if (logic.userId === "NO-ID") {
            this.props.history.push(`/register`)
        }else{
            this.props.history.push(`/unregister`)
        }
    }
    render() {
        const { user, password } = this.state
        return <div className="unregister">
            <h1>Delete User</h1>
            <form onSubmit={this.submit}>
                <input type="text" onChange={this.userName} value={user} placeholder="User" />

                <input type="password" onChange={this.userPassword} value={password} placeholder="Password" />
                <button type="submit">Delete</button>
            </form>
        </div>
    }
}

export default withRouter(Unregister)
