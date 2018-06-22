import React, { Component } from 'react'
import moment from 'moment'
import './event-card.css'
import './../../App.css'
export default class EventCard extends Component {

    _addFavorite = (eventId) =>{} 

    render() {

        const { closeCard, event } = this.props

        const dateString = event.date;

        const date = moment(dateString).format("MMMM D, YYYY, h:mm")


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
                            <h5>Date:</h5> <p>{date}</p>
                            <h5>Address:</h5> <p>{event.address}</p>
                            <h5>Description:</h5><p> {event.description}</p>
                        </div>

                        <button className="more-info">+Info</button>
                    </div>

                </div>
            </section>
        )
    }
}