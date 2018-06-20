
import React from 'react';
import logo from '../../../src/logo.svg';
import "./Title.css";


function Title(props){

return (

<header className="App-header">
<img src={logo} className="App-logo" alt="logo" />
<h1 className="App-title">{props.appTitle}</h1>
</header>

)
}

export default Title;


