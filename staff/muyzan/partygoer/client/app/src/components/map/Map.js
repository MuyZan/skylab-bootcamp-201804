'use strict'

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, DivOverlay } from 'react-leaflet'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './map.css'
import logic from '../../logic'
import markers from './markers'

const { userPlaceholder, djPlaceholder, rock, raca, generic } = markers

export default class PartyMap extends Component {

    state = {
        lat: 0,
        lng: 0,
        zoom: 16,
        events: [],
        eventTypes: null
    }

    componentDidMount() {

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
                        this.setState({ events })
                    })
                    .catch(err => toast.error(`Ups! Something happens: ${err}`))
            })
            .catch((err) => {
                toast.error(`Ups! Something happens: ${err}`)
            })

        logic.listEventTypes()
            .then(eventTypes => {
                this.setState({ eventTypes })

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

    _showEvent = (eventId) => {
console.log(eventId)    
} 


    render() {

        /*User position*/
        const position = [this.state.lat, this.state.lng]

        return (
            <Map id="map-container" center={position} zoom={this.state.zoom}>
                <TileLayer attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png" />


                <Marker position={position} icon={userPlaceholder}>
                    <Popup >
                        <span >
                            {logic.setUsername()}: Let's party!
                            </span>
                    </Popup>
                </Marker>

                {this.state.events.map((event) =>
                    <Marker onClick={()=>this.props.onShowEvent(event._id)} key={event._id} position={[parseFloat(event.location.coordinates["1"].$numberDecimal), parseFloat(event.location.coordinates["0"].$numberDecimal)]} icon={this.setIcon(event.eventType["0"])}>
                       {/*<Popup >
                            <span >
                                {event.name}                              
                            </span>
                       </Popup>*/ } 
                    </Marker>
                )}
            </Map>
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






