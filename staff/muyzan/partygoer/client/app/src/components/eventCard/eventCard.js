import React, { Component } from 'react'
import './eventCard.css'
import './../../App.css'
import { Animated } from 'react-animated-css'


export default class EventCard extends Component {

    render() {
        return (
            <section id="event-card" className="grid">
                <div className="content-wrap" >
                
                <button className="closeCard" onClick={this.props.closeCard}>X</button>

                    <div className="card">
                        <div className="bg-filter">
                            <div className="top-layer-filter"></div>
                            <div className="img-container">
                                <img src={this.props.event.image} />
                            </div>
                        </div>
                        <div className="card-content">
                        <h3 className="card-title">{this.props.event.name}</h3>

                        <h5>Date: {this.props.event.date}</h5>
                        <h5>Description: {this.props.event.description}</h5>
                        </div>
                        <button className="more-info">+Info</button>
                    </div>
                </div>
            </section>

        )

    }

}


