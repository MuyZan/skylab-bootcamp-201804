import React, { Component } from 'react';
// import '../App.css';
// import App from '../App'
import logic from '../logic'
// import Unregister from './Unregister'
// import Xtorage from './Xtorage';

class Profile extends Component {
    state = {
        data: {},
        username: "",
        location: ""
    }

    componentDidMount() {
        // if (Xtorage.local.get('user')) {
        //     logic.token = Xtorage.local.get('user').token
        //     logic.id = Xtorage.local.get('user').id
        //     logic.retrieve()
        if (logic.userId !== "NO-ID") {
            logic.retrieveUser()
                .then(res => {
                    if (res.status === "KO") {
                        // Xtorage.local.remove('user')
                        logic.logout()
                        throw Error("Time expired and you should log in again")
                    }
                    return res
                })
                .then(data => {
                    this.setState({
                        data,
                        username: data.username,
                        location: data.location
                    })
                })
                .catch(err => {
                    console.log(err)
                    // this.props.history.push(`/login`)
                })
        }  else this.props.history.push(`/login`)
    }

    render() {
        return (
            <div className="Profile">
                <section className="pf-profile">
                    <h1>Profile</h1>
                    <article className="info">
                        <h1>{this.state.username}</h1>
                        <h4>{this.state.location}</h4>
                    </article>
                </section>
            </div >
        )
    }
}

export default Profile

