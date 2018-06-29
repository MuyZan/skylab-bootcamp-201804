import React from 'react';
// import '../App.css';
// import App from '../App'
import { withRouter } from 'react-router-dom'
import World from './World'
// import logic from '../logic'
// import Xtorage from './Xtorage';
// import SearchCountry from './SearchCountry';
// import ShowCities from './ShowCity';

function Home(props) {


    return (
        <div className="home">
            <h1>YOU ARE IN HOME</h1>
            <World />
        </div>

    )
}

export default withRouter(Home)