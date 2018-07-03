import React, { Component } from 'react'
import logo from '../../logo.svg'
import './landing.css'
import logic from "../../logic"

class Landing extends Component{

    constructor(){
        super()

        this.state = {
            username: "",
            password: "",
            userId: "",
      
       
        }
    }


      _handlerWriteUsername = e =>{
        this.setState({username: e.target.value})
      }
    
      _handlerWritePassword = e =>{
        this.setState({password: e.target.value})
      }
    
      
      _handlerLogin = e => {
        e.preventDefault();
    
          let username = this.state.username;
          let password = this.state.password;
      
    
        logic.login(username, password).then(id => this.state.userId = id)
        .then(() => {this.state.password = ''
        this.props.history.push("/home")
        })
        
      }
        
    


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Hello, React!</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        {/* LOGIN FORM*/ }
        <h1>Login</h1> 
        <form onSubmit={this._handlerLogin}>
        <input type="text" name="username" placeholder="Insert your username" onChange={this._handlerWriteUsername}/>
        <input type="password" name="password" placeholder="Insert your password " onChange={this._handlerWritePassword}/>
        <button type="submit">Login</button>
        </form>


      </div>
    );
  }
}

export default Landing
