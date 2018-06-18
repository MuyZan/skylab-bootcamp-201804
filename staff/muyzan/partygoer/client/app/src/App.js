import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom"
import './App.css';
import logic from './logic'

import { Home, Landing, Login, Register } from './components'

import "./components/landing/landing.css"
import "./components/home/home.css"


class App extends Component {
  constructor(){
    super()

    this.state = {
      authenticated: logic.loggedIn
    }
  }
   
  
  onLogin = () => {
    this.setState({ authenticated: true })

    this.props.history.push('/home')  }

  onLogout = () => {
    this.setState({ authenticated: false })
  }

  noAuth = () => {
    this.props.history.push('/')

  }



  render() {


    return (
      <Switch>

        <Route exact path="/" component={Landing} />
        <Route exact path="/login" render={(()=> <Login onLogin={this.onLogin}/> )}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/home" render={(()=> <Home onLogout={this.onLogout} authenticated={this.state.authenticated} isNotAuth={this.noAuth}/> )}/>

      </Switch>
    )

  }
}

export default withRouter(App);



