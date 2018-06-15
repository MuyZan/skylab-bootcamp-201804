'use strict'

import React, { Component } from 'react'
import logic from '../../logic'
import './register.css'

class Register extends Component {

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

  _handlerWriteUsername = e => {
    this.setState({ username: e.target.value })
  }

  _handlerWriteEmail = e => {
    this.setState({ email: e.target.value })
  }

  _handlerWritePassword = e => {
    this.setState({ password: e.target.value })
  }



  _handlerWriteName = e => {
    this.setState({ name: e.target.value })
  }

  _handlerWriteSurname = e => {
    this.setState({ surname: e.target.value })
  }


  _handlerRegister = e => {
    e.preventDefault();

    let username = this.state.username;
    let email = this.state.email;
    let password = this.state.password;
    let name = this.state.name;
    let surname = this.state.surname;



    logic.registerUser(username, email, password, name, surname)
      .then(() => {
        this.props.history.push("/login")
      })
  
  }


  render() {
    return (
      <div>

        <h1>Register</h1>
        <form onSubmit={this._handlerRegister}>

          <label htmlFor="inputUsername"> Username:</label>
          <input id="inputUsername" type="text" name="username" placeholder="Choose your username" onChange={this._handlerWriteUsername} />

          <label htmlFor="inputName"> Name:</label>
          <input id="inputName" type="text" name="name" placeholder="Insert your name" onChange={this._handlerWriteName} />

          <label htmlFor="inputSurname"> Surname:</label>
          <input id="inputSurname" type="text" name="surname" placeholder="Insert your surname" onChange={this._handlerWriteSurname} />

          <label htmlFor="inputEmail"> Email:</label>
          <input id="inputEmail" type="text" name="email" placeholder="Insert your email" onChange={this._handlerWriteEmail} />

          <label htmlFor="inputPassword"> Password:</label>
          <input id="inputPassword" type="password" name="password" placeholder="Choose your Password" onChange={this._handlerWritePassword} />

          <button type="submit">Register!</button>
        </form>



      </div>
    )
  }
}

export default Register
