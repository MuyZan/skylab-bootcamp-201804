import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './nav.css'

const dancer = require('./../../static/images/navIcons/013-dancer.svg')
const user = require('./../../static/images/navIcons/068-user-9.svg')
const star = require('./../../static/images/navIcons/092-star.svg')
const logoMan = require('./../../static/images/logo/logo.svg')



export default class Nav extends Component {

    render() {
        return (

            <nav className="navBar">
                <div id="navContainer">
                    <div className="navigation">
                    <img src={user} />
                    <img src={star} />
                    <span onClick={this.props.logout}>LOGOUT</span>
                    <span onClick={this.props.listAll}>LIST EVENTS</span>
                    </div>
                    <div className="nav-logo">
                        <div className="title">partygoer</div>
                        <img clasName="logito" src={logoMan} />
                    </div>
                </div>
            </nav>

        )
    }

}


