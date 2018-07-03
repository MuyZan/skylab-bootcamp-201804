import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom"
import { Home, Landing, Login, Register } from './components'
import { ToastContainer, toast } from 'react-toastify'

import logic from './logic'
import './App.css';
import "./components/landing/landing.css"
import "./components/home/home.css"
import 'react-toastify/dist/ReactToastify.css'

class App extends Component {
  constructor(){
    super()

    this.state = {
      authenticated: logic.loggedIn,
    }
  }

   
  onLogin = () => {
    this.setState({ authenticated: true })

    this.props.history.push('/home')  
  }

  onLogout = () => {
    this.setState({ authenticated: false}, ()=> {
      toast.success(`See you soon! Don't forget the ibuprofen`)
    })
   }
    

  noAuth = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" render={(()=> <Login onLogin={this.onLogin}/> )}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/home" render={(()=> <Home onLogout={this.onLogout} authenticated={this.state.authenticated} isNotAuth={this.noAuth}/> )}/>

      </Switch>

      </div>
    )
  }
}

export default withRouter(App);