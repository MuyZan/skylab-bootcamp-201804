import React, { Component } from 'react'
import './eventCard.css'
import { Animated } from 'react-animated-css'


export default class EventCard extends Component {

    render() {
        return (
            <Animated animationIn="bounceInUp" animationOut="bounceInUp" isVisible={true}>
                <div id="eventCard">
                    <button onClick={this.props.closeCard}>X</button>
                    <img src={this.props.event.image} />
                    <h2>{this.props.event.name}</h2>
                    <h5>Date: {this.props.event.date}</h5>
                    <h5>Description: {this.props.event.description}</h5>
                    <button>+Info</button>
                </div>
            </Animated>

        )

    }

}


