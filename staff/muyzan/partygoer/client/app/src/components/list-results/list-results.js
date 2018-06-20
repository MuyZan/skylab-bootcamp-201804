import React, { Component } from 'react'
import { toast } from 'react-toastify'
import logic from '../../logic'
import 'react-toastify/dist/ReactToastify.css'

export default class ListResults extends Component {

    constructor() {
        super()
        this.state = {
            events: []
        }
    }

    componentDidMount() {  
        
        logic.listEvents()
        .then(events =>  this.setState({ events }))
        .catch(err => toast.error(`Ups! Something happens: ${err}`))
    }

    render() {
        const { events } = this.state
        return (
            <div>
                <h2>Events</h2>
                <ul>{events.map(event => <li key={event._id}>{event.name}<br/>{event.description}<br/><button>Add Event</button></li>)}
                </ul>
            </div>
        )
    }
}