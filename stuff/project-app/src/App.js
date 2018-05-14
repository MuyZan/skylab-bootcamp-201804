import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Register, Login, Landing, Home } from './components'
import { Link, Route, withRouter } from 'react-router-dom'
import logic from './logic'
import Xtorage from './utils/xtorage-1.0.1'

//logic.init()
//logic.init(Xtorage.local)

// defining a custom Xtorage that manages items in memory
class MemStorage extends Xtorage {
  constructor() {
    super({})
  }

  set(key, value) {
    this.storage[key] = value
  }

  get(key) {
    return this.storage[key]
  }

  remove(key) {
    delete this.storage[key]
  }

  clear() {
    this.storage = {}
  }

  get length() {
     return Object.keys(this.storage).length
  }
}

logic.init(new MemStorage())

class App extends Component {
  state = { registered: false }

  componentDidMount() {
    if (logic.loggedIn) this.props.history.push('/home')
  }

  onRegister = () => {
    console.log('register')

    this.setState({ registered: true })
  }

  onRegisterError(message) {
    console.error('register error', message)
  }

  onLogin = () => {
    console.log('login')

    this.props.history.push('/home')
  }

  onLoginError(message) {
    console.error('login error', message)
  }

  onLogout = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <Route exact path="/" render={() => <Landing />} />
        {
          <Route exact path="/register" render={() => {
            return this.state.registered ?
              <Link to="/login">Login</Link>
              :
              <Register onRegister={this.onRegister} onRegisterError={this.onRegisterError} />
          }} />
        }
        <Route exact path="/login" render={() => !logic.loggedIn && <Login onLogin={this.onLogin} onLoginError={this.onLoginError} />} />
        {logic.loggedIn && <Route path="/home" render={() => <Home onLogout={this.onLogout} />} />}
      </div>
    );
  }
}

export default withRouter(App);
