'use strict'

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup, DivOverlay } from 'react-leaflet'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


import './map.css'
import L from 'leaflet'
import logic from '../../logic'
import markers from './markers'

const { userPlaceholder, djPlaceholder, rock, raca, generic } = markers



export default class PartyMap extends Component {

    state = {
        lat: 0,
        lng: 0,
        zoom: 16,
        events: [],
        eventTypeId: ["5b226fb3caba1427c946e118", "5b226fb3caba1427c946e116", "5b226fb3caba1427c946e117"]
    }

    componentWillMount() {

        /*Check if geolocation exists*/

        if (!navigator.geolocation) {
            const error = 'Geolocation is not supported by your browser'
            toast.error(`Ups! Something happens: ${error}`)
            return;
        }

        /*Succes callback for Geolocation API*/

        const success = (position) => {
            Promise.resolve()
                .then(() => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    this.setState({ lat: latitude, lng: longitude })
                })
                .catch((error) => toast.error(`Ups! Something happens: ${error}`))
        };

        /*Error callbackt Geolocation API*/

        const error = (error) => {
            let errorMessage = `Unable to retrieve your location. ERROR: (${error.code}) ${error.message}`;
            toast.error(`Ups! Something happens: ${errorMessage}`)
        }

        /*Geolocation API*/

        navigator.geolocation.getCurrentPosition(success, error);

        /*Capture all nearby events*/

        logic.listEvents()
            .then(res => {
                const { data: { data } } = res
                this.setState({ events: data })
            })
            .catch(err => toast.error(`Ups! Something happens: ${err}`))

    }


    componentWillUnmount() {

    }

    /*Switch icon according to the type of party */

    setIcon(eventId) {
        switch (eventId) {
            case this.state.eventTypeId[0]:
                return djPlaceholder
            case this.state.eventTypeId[1]:
                return rock
            case this.state.eventTypeId[2]:
                return raca
            default:
                return generic
        }
    }


    render() {

        /*User position*/
        const position = [this.state.lat, this.state.lng]

        return (
            <div>
                <Map id="map-container" center={position} zoom={this.state.zoom}>

                    <TileLayer attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png" />


                    <Marker position={position} icon={userPlaceholder}>
                        <Popup >
                            <span >
                                {logic.setUsername()} says: Let's party!
                            </span>
                        </Popup>
                    </Marker>


                    {this.state.events.map((event) =>

                        <Marker key={event._id} position={[event.location.coordinates["1"].$numberDecimal, event.location.coordinates["0"].$numberDecimal]} icon={this.setIcon(event.eventType["0"])}>
                            <Popup >
                                <span >
                                    {event.name}
                                    <button>jaja</button>
                                </span>
                            </Popup>
                        </Marker>
                        
                    )
                    }

                </Map>
                <ToastContainer autoClose={3000} toastClassName='gradient-toast-container' />
            </div>
        )
    }
}




/*

----Leaflet map base style:

url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

alternative link: http://{s}.tile.osm.org/{z}/{x}/{y}.png'

attribution:  <TileLayer attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"

----Other Stamen/Carto styles:

http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png

https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png


*/






