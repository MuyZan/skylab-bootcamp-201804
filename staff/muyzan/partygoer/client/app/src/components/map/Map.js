import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './map.css'
import logic from '../../logic'
import markers from './markers'

import placeholder from './../../static/images/icons/rock.svg'

const { userPlaceholder, djPlaceholder, rock, raca, generic } = markers

let _events = []

export default class PartyMap extends Component {

    state = {
        lat: 0,
        lng: 0,
        zoom: 16,
        eventsDraw: [],
        eventTypes: null,
        eventTypesDisplay: null,
        allButton: true
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

                let eventTypesDisplay = {}

                Object.keys(eventTypes).map((key) => {
                    return eventTypesDisplay[key] = true
                })

                this.setState({ eventTypesDisplay })


            })
            .catch(err => toast.error(`Ups! Something happens: ${err}`))
    }


    componentWillUnmount() {

    }

    /*Switch icon according to the type of party */

    setIcon = (eventId) => {
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

    setFilterIcon = (eventId) => {
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

    setAll = () => {

        const { eventTypesDisplay, allButton } = this.state

        const setAllDisplayTrue = () =>{
            Object.keys(eventTypesDisplay).map((event) => {
                eventTypesDisplay[event] = true
                return eventTypesDisplay;
            })
            return this.setState({ eventTypesDisplay })
        }

        if(allButton === false) {
            setAllDisplayTrue()
            this.setState({allButton: true})
            this.setState({ eventsDraw: _events })
        }
    }

    filterEvents = (eventTypeId) => {

        const { eventTypesDisplay, allButton } = this.state

        //FILTER BUTTONS: toggle the eventTypesDisplay [true-false] and button style

        if(eventTypesDisplay[eventTypeId] === true){
            eventTypesDisplay[eventTypeId] = false;
            this.setState({allButton: false})
            this.setState({ eventTypesDisplay })
        } else {
            eventTypesDisplay[eventTypeId] = true;
            this.setState({ eventTypesDisplay })
        }

        //check if all eventTypesDisplay are true;

        const isAllDisplayTrue = (objs) => {
            let isTrue = true
            Object.keys(objs).map((obj)=>{
                 if(!objs[obj]) isTrue = false;   
                 return isTrue   
            })
           return isTrue;
        }

        let showAllTypes = isAllDisplayTrue(eventTypesDisplay)
 
        if(showAllTypes){
            this.setState({allButton: true})
            this.setState({ eventsDraw: _events })
        } else {

            let allTypesFilteredEvents = []

            Object.keys(eventTypesDisplay).map((eventType) =>{
                if(eventTypesDisplay[eventType] === false){
                    let filteredEvents = _events.filter(event => event.eventType.includes(eventType))
                    allTypesFilteredEvents = allTypesFilteredEvents.concat(filteredEvents)
                }
                return allTypesFilteredEvents
            })

            this.setState({ eventsDraw: allTypesFilteredEvents })

        }   
    }


    render() {

        const { lng, lat, zoom, eventsDraw, eventTypes, eventTypesDisplay, allButton } = this.state
        const { onShowEvent } = this.props
        /*User position*/
        const position = [lat, lng]

        return (
            <div id="section-map">
                <Map id="map-container" center={position} zoom={zoom}>
                    <TileLayer attribution='<a href="http://stamen.com">Stamen</a> | <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png" />


                    <Marker position={position} icon={userPlaceholder}>
                        <Popup >
                            <span >
                                {logic.setUsername()}: Let's party!
                            </span>
                        </Popup>
                    </Marker>

                    {eventsDraw.map((event) =>
                        <Marker key={event._id} onClick={() => onShowEvent(event._id)} position={[parseFloat(event.location.coordinates["1"].$numberDecimal), parseFloat(event.location.coordinates["0"].$numberDecimal)]} icon={this.setIcon(event.eventType["0"])} />
                    )}
                </Map>

                <section id="section-filter">
                    {eventTypes !== null && eventTypesDisplay !== null ?
                        Object.keys(eventTypes).map((eventTypeId) =>
                            <div key={eventTypeId} onClick={() => this.filterEvents(eventTypeId)} className={eventTypesDisplay[eventTypeId] === true ? "filter nonSelected" : "filter"}>
                                <img alt={eventTypes[eventTypeId]} className="filter-icon" src={this.setFilterIcon(eventTypeId)} placeholder={eventTypes[eventTypeId]} />
                                <span className="filter-text ">{eventTypes[eventTypeId]}</span>
                            </div>
                        )
                        :
                        ""
                    }
                    <div onClick={() => this.setAll()} className={allButton === true ? "filter":"filter nonSelected"}>
                        <img alt="" className="filter-icon" src="" placeholder="" />
                        <span className="filter-text ">ALL</span>
                    </div>

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






