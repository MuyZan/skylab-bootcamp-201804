import React, { Component } from 'react'
import './event-card.css'
import './../../App.css'
export default class EventCard extends Component {

    _addFavorite = (eventId) =>{


    }

    render() {

        const { closeCard, event } = this.props

        return (
            <section id="event-card" className="grid">

                <div className="content-wrap" >

                    <button className="closeCard" onClick={closeCard}>X</button>

                    <div className="card">
                        <div className="bg-filter">
                            <div className="top-layer-filter"></div>
                            <div className="img-container">
                                <img alt="" src={event.image} />
                            </div>
                        </div>

                        <div className="card-content">
                            <h3 className="card-title">{event.name}</h3>
                            <h6>Date: {event.date}</h6>
                            <h6>Adress: {event.adress}</h6>
                            <h6>Description: {event.description}</h6>
                        </div>

                        <button className="more-info">+Info</button>
                    </div>

                </div>
            </section>
        )
    }
}