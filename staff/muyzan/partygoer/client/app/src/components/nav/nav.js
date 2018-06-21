import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './nav.css'

const dancer = require('./../../static/images/navIcons/013-dancer.svg')
const logout = require('./../../static/images/navIcons/logout.svg')
const user = require('./../../static/images/navIcons/068-user-9.svg')
const star = require('./../../static/images/navIcons/092-star.svg')
const logoMan = require('./../../static/images/logo/logo.svg')

class Nav extends Component {

    _onClick = () =>{
        this.props.history.push('/home')  
    }

    render() {
        return (

            <nav className="navBar">
                <div id="navContainer">
                    <div className="navigation">
                    <img className="user" src={user} />
                    <img src={star} />
                    <img className="logout" src={logout} placeholder="logout" onClick={this.props.logout}/>
                    <span onClick={this.props.listAll}>LIST EVENTS</span>
                    </div>
                    <div onClick={this._onClick} className="nav-logo">
                        <div className="title">partygoer</div>
                        <img className="logito" src={logoMan} />
                    </div>
                </div>
            </nav>

        )
    }

}

export default withRouter(Nav)