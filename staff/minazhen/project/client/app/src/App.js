import React, { Component } from 'react';
import Header from './components/Header';
import Main from './components/Main'
import Footer from './components/Footer';

import './App.css';
// import './styles/common.css';

class App extends Component {

  state = {
    url: '',
    token: '',
    username: '',
    password: '',
    id: ''
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Main/>
        <Footer />

      </div>
    );
  }
}

export default App;
