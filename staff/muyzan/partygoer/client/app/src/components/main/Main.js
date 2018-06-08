import React, { Component } from "react";
import { withRouter, Route, Switch } from "react-router-dom"
import logic from "../../logic";
import "./main.css"
import "../App.ss"

import Login from "../Login/Login"
import Home from "../Home/Home"

class Main extends Component {
   

        render() {
            <div>
                <Switch>
                    <Route exact path="/" render=""/>
                    <Route path="/home"/>


                </Switch>
            </div>
        }


}


export default withRouter(Main)