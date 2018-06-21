import React, { Component } from 'react'
import './header.css'

const logoMan = require('./../../static/images/logo/logo.svg')

export default class Header extends Component {
  render() {  
    return  <header className="header"><span className="title">partygoer</span><img className="logo" src={logoMan} /></header>  
  }
}




