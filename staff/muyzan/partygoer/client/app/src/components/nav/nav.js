import React, { Component } from 'react'
import './nav.css'

class Nav extends Component{

    render(){
        return(
            <div id="navContainer">
            <button onClick={this.props.logout}>LOGOUT</button>
            <button onClick={this.props.listAll}>LIST EVENTS</button>
            </div>
        )
    }

}

export default Nav