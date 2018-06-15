import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom"
import logo from './logo.svg';
import './App.css';

import { Home, Landing, Login } from './components'

import "./components/landing/landing.css"
import "./components/home/home.css"


class App extends Component {

  
  constructor(){
    super();

    this.state = {
      logged: false,      
    };
  }

/*
  componentDidMount(){
    const sessionData = sessionStorage.getItem("key")
    sessionData ? this.setState({ logged: true }) : this.setState({ logged: false })
  }


  _isLogged = logged => {
    logged ? this.setState({ logged: true }) : this.setState({ logged: false})
            <Route path="/home" component={Home} />

  }*/


  render() {
    return (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/home" component={Home}/>
        <Route path="/login" component={Login}/>
      </Switch>
    )

  }
}

export default App;