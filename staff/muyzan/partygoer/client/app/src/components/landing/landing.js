import React, { Component } from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify'

import { Link } from 'react-router-dom'
import Header from './../header/header'
import Carousel from './carousel/carousel'
import Footer from './../footer/footer'

import './landing.css'
import 'react-toastify/dist/ReactToastify.css'

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

        <Header />

        <div className="main-landing">
          <section id="landing-carrousel"><Carousel /></section>

          <section id="landing-buttons">

            <Link to={`/register`} style={{ textDecoration: 'none' }}><button>Sign up</button></Link>

            <h6>Do you already have an account?</h6>

            <Link to={`/login`} style={{ textDecoration: 'none' }}><button className="line-btn">Sign In</button></Link>

          </section>
        </div>

        <Footer />
        <ToastContainer autoClose={3000} toastClassName='gradient-toast-container' />

      </div>
    );
  }
}