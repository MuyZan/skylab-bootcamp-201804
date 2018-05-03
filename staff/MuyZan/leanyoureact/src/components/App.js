import React, { Component } from "react";
import "./App.css";
import Title from "./Title/Title.js";
import SearchForm from "./SearchForm/SearchForm";
import MainContent from "./MainContent/MainContent.js";

class App extends Component {
  constructor() {
    super();

    this.state = {
      username:'',
      data:{},
      onError: false
    };
  }

  _handlerSearchUser=(e)=> {

    e.preventDefault();

    const headers = {
      headers: {
          Authorization: 'Bearer dd35934d1e9e884884e96051e44de04d8f381aa6'
      }
  };


    fetch(`https://api.github.com/users/${this.state.username}`, headers)
      .then(data =>data.json()) 
      .then(data => {
        data.message ? this.setState({onError:true}) : this.setState({onError:false});
        this.setState({data, username:''})
      })
      
  }

  _handlerWriteName =e=> {
    this.setState({
      username: e.target.value
    })
  }

  render() {
    return (
      <div className="App">
        <Title appTitle={"Github App"} />
        <SearchForm 
        _handlerSearchUser={this._handlerSearchUser} 
        _handlerWriteName={this._handlerWriteName} value={this.state.username}/>

        {this.state.onError === true && <h2>{'User not found, sorry :_____('}</h2>}
        {this.state.onError === false && <MainContent data={this.state.data} />}
        
      </div>
    );
  }
}

export default App;
