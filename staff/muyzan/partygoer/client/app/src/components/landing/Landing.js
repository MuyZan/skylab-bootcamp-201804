import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Carousel from './carousel/carousel'
import './landing.css'

const logoMan = require('./../../static/images/logo/logo.svg')

export default class Landing extends Component {

  constructor() {
    super()

    this.state = {
      username: "",
      password: "",
      userId: "",
    }
  }

  _handlerSignIn = () => this.props.history.push("/home")

  render() {
    return (
      <div id="landing" className="container">

        <header className="header"><span className="title">partygoer</span><img className="logo" src={logoMan} /></header>

        <div className="main-landing">
          <section id="landing-carrousel"><Carousel /></section>

          <section id="landing-buttons">

            <Link to={`/register`} style={{ textDecoration: 'none' }}><button>Sign up</button></Link>

            <h6>Do you already have an account?</h6>

            <Link to={`/login`} style={{ textDecoration: 'none' }}><button className="line-btn">Sign In</button></Link>

          </section>
        </div>


        <footer className="footer">Coded with ♥ and <span role="img" aria-labelledby="droplet">💧💧</span> by <strong>Zan</strong></footer>

      </div>
    );
  }
}