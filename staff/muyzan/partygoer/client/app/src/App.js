import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom"
import logo from './logo.svg';
import './App.css';

import { Home, Landing, Login, Register } from './components'

import "./components/landing/landing.css"
import "./components/home/home.css"


class App extends Component {



  render() {
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/home" component={Home}/>
        
      </Switch>
    )

  }
}

export default App;