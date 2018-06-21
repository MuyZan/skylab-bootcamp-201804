import React, { Component } from 'react'
import logic from '../../logic'
import Header from './../header/header'
import Footer from './../footer/footer'
import './register.css'

const logoMan = require('./../../static/images/logo/logo.svg')

export default class Register extends Component {

  constructor() {
    super()

    this.state = {
      username: "",
      email: "",
      password: "",
      name: "",
      surname: "",
      errorMessage: ""

    }
  }

  _handlerWriteUsername = e => this.setState({ username: e.target.value })

  _handlerWriteEmail = e => this.setState({ email: e.target.value })

  _handlerWritePassword = e => this.setState({ password: e.target.value })

  _handlerWriteName = e => this.setState({ name: e.target.value })

  _handlerWriteSurname = e => this.setState({ surname: e.target.value })

  _handlerRegister = e => {

    e.preventDefault();
    const { username, email, password, name, surname } = this.state

    logic.registerUser(username, email, password, name, surname)
      .then(() => this.props.history.push("/login"))
  }

  render() {
    return (
      <div className="container">
        <Header />
        <div className="main-register">
        
          <h3 className="">Register for free</h3>

          <form onSubmit={this._handlerRegister}>

            <label className="field">
              <input className="field-input" type="text" name="username" placeholder="Choose username" onChange={this._handlerWriteUsername} autocomplete="off" required />
              <span className="field-label-wrap">
                <span className="field-label">Username</span>
              </span>
            </label>

            <label className="field">
              <input className="field-input" type="text" name="name" placeholder="Insert your name" onChange={this._handlerWriteName} autocomplete="off" required />
              <span className="field-label-wrap">
                <span className="field-label">Name</span>
              </span>
            </label>

            <label className="field">
              <input className="field-input" type="text" name="surname" placeholder="Insert your surname" onChange={this._handlerWriteSurname} autocomplete="off" required />
              <span className="field-label-wrap">
                <span className="field-label">Surname</span>
              </span>
            </label>

            <label className="field">
              <input className="field-input" type="text" name="email" placeholder="Insert your email" onChange={this._handlerWriteEmail} autocomplete="off" required />
              <span className="field-label-wrap">
                <span className="field-label">Email</span>
              </span>
            </label>

            <label className="field">
              <input className="field-input" type="password" name="password" placeholder="Choose your Password" onChange={this._handlerWritePassword} autocomplete="off" required />
              <span className="field-label-wrap">
                <span className="field-label">Password</span>
              </span>
            </label>

            <button type="submit">Register!</button>
          </form>
        </div>

        <Footer />

      </div>
    )
  }
}
