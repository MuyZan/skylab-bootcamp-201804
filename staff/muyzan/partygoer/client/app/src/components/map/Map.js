import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './map.css'
import logic from '../../logic'
import markers from './markers'

import placeholder from './../../static/images/icons/rock.svg'

const { userPlaceholder, djPlaceholder, rock, raca, generic } = markers

let _events=[]

export default class PartyMap extends Component {

    state = {
        lat: 0,
        lng: 0,
        zoom: 16,
        eventsDraw: [],
        eventTypes: null,
        eventsDisplay: null
    }

    componentWillMount() {

        /*Checks if geolocation exists*/

        if (!navigator.geolocation) {
            const error = 'Geolocation is not supported by your browser'
            toast.error(`Ups! Something happens: ${error}`)
            return;
        }

        /*Geolocation API*/

        const userPosition = function () {
            return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))
        }

        userPosition()
            .then((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                this.setState({ lat: latitude, lng: longitude })
            })
            .then(() => {
                logic.listNearbyEvents(this.state.lng, this.state.lat)
                    .then(events => {
                        this.setState({ eventsDraw: events })
                        _events = events
                    })
                    .catch(err => toast.error(`Ups! Something happens: ${err}`))
            })
            .catch((err) => {
                toast.error(`Ups! Something happens: ${err}`)
            })

        logic.listEventTypes()
            .then(eventTypes => {
                this.setState({ eventTypes })

                let eventsDisplay = {}

                Object.keys(eventTypes).map((key) => {
                    return eventsDisplay[key] = true
                })

                this.setState({eventsDisplay})
            

            })
            .catch(err => toast.error(`Ups! Something happens: ${err}`))
    }


    componentWillUnmount() {

    }

    /*Switch icon according to the type of party */

    setIcon(eventId) {
        switch (this.state.eventTypes[eventId]) {
            case "Festival":
                return djPlaceholder
            case "Concert":
                return rock
            case "Musical atmosphere":
                return raca
            default:
                return generic
        }
    }

    setFilterIcon(eventId) {
        switch (this.state.eventTypes[eventId]) {
            case "Festival":
                return placeholder
            case "Concert":
                return placeholder
            case "Musical atmosphere":
                return placeholder
            default:
                return placeholder
        }
    }

    filterEvents(eventId){

        if(this.state.eventsDisplay[eventId] === true){

            const filterEvents = _events.filter(event => event.eventType.includes(eventId))
            this.setState({eventsDraw:filterEvents}) 
            
            Object.keys(this.state.eventsDisplay).map((event) => {
                const { eventsDisplay } = this.state
                eventsDisplay[event] = true  
                return this.setState({eventsDisplay})
            })

            const { eventsDisplay } = this.state
            eventsDisplay[eventId] = false  
            this.setState({eventsDisplay}) 

        }else{

            this.setState({eventsDraw:_events}) 
            const { eventsDisplay } = this.state
            eventsDisplay[eventId] = true  
            this.setState({eventsDisplay})
        }     
    }


    render() {

        const { lng, lat, zoom, eventsDraw, eventTypes, eventsDisplay } = this.state
        /*User position*/
        const position = [lat, lng]

        return (
            <div id="section-map">
                <Map id="map-container" center={position} zoom={zoom}>
                    <TileLayer attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png" />


                    <Marker position={position} icon={userPlaceholder}>
                        <Popup >
                            <span >
                                {logic.setUsername()}: Let's party!
                            </span>
                        </Popup>
                    </Marker>

                    {eventsDraw.map((event) =>
                        <Marker key={event._id} onClick={() => this.props.onShowEvent(event._id)} position={[parseFloat(event.location.coordinates["1"].$numberDecimal), parseFloat(event.location.coordinates["0"].$numberDecimal)]} icon={this.setIcon(event.eventType["0"])}/>
                    )}
                </Map>

                <section id="section-filter">
                    {eventTypes !== null && eventsDisplay !==null ?
                        Object.keys(eventTypes).map((key) =>
                            <div key={key} onClick={() => this.filterEvents(key)} className={this.state.eventsDisplay[key] === true ? "filter nonSelected": "filter"}>
                                <img alt={eventTypes[key]} className="filter-icon" src={this.setFilterIcon(key)} placeholder={eventTypes[key]} />
                                <span className="filter-text ">{eventTypes[key]}</span>
                            </div>
                        )
                        :
                        ""
                    }

                    <button>All</button>

                </section>
            </div>
        )
    }
}




/*

----Leaflet map base style:
                <ToastContainer autoClose={3000} toastClassName='gradient-toast-container' />


url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

alternative link: http://{s}.tile.osm.org/{z}/{x}/{y}.png'

attribution:  <TileLayer attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"

----Other Stamen/Carto styles:

http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png

https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png


*/






