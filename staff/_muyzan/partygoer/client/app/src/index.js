import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import partygoerApi from 'api'
import logic from './logic'

partygoerApi.token = function (token) {

    if (token) {
        sessionStorage.setItem('token', token)
        return
    }
    return sessionStorage.getItem('token')
}

logic.setUserId = function (userId) {
    if (userId === null)
      sessionStorage.removeItem('userId')
    else if (userId !== undefined) {
      sessionStorage.setItem('userId', userId)
  
      return
    }
  
    return sessionStorage.getItem('userId')
  }


  logic.setUsername = function (username) {
    if (username === null)
      sessionStorage.removeItem('username')
    else if (username !== undefined) {
      sessionStorage.setItem('username', username)
  
      return
    }
  
    return sessionStorage.getItem('username')
  } 

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>, document.getElementById('root'));
registerServiceWorker();
