import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import './header.css'

const logoMan = require('./../../static/images/logo/logo.svg')

 class Header extends Component {

  _onClick = () =>{
    this.props.history.push('/')  
}
  render() {  
    return  <header onClick={this._onClick} className="header"><span className="title">partygoer</span><img className="logo" src={logoMan} /></header>  
  }
}

export default withRouter(Header)