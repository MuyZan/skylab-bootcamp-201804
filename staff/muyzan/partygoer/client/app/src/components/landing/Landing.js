import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './landing.css'

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
      <div>

        <section id="landing-carrousel">HERE A CARROUSEL</section>

        <section id="landing-buttons">

          <Link to={`/register`} style={{ textDecoration: 'none' }}><button>Sign up</button></Link>

          <h6>Do you already have an account?</h6>

          <Link to={`/login`} style={{ textDecoration: 'none' }}><button>Sign In</button></Link>
          
        </section>

      </div>
    );
  }
}