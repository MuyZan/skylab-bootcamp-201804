import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import { toast } from 'react-toastify'
import logic from '../../logic'
import 'react-toastify/dist/ReactToastify.css'
import './map.css'
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
        allButton: true,
        readyToRender: false
    }

    componentWillMount() {

        /*Checks if geolocation exists*/

        if (!navigator.geolocation) {
            const error = 'Geolocation is not supported by your browser'
            toast.error(`Ups! ${error}, sorry!`)
            return;
        }

        /*Geolocation API*/

        logic.userPosition()
            .then((position) => {
                const { coords: { latitude, longitude } } = position
                this.setState({ lat: latitude, lng: longitude })
            })
            .then(() => {
                const { lng, lat } = this.state
                logic.listNearbyEvents(lng, lat)
                    .then(events => {
                        
                        this.setState({ eventsDraw: events })
                        _events = events //save a copy for manipulation
                    })
                    .catch(err => toast.error(`Ups! Something happens: ${err}`))
            })
            .catch((err) => {
                toast.error(`Ups! Something happens: ${err}`)
            })

        /* Import Event Types and set the display boolean for the filter buttons */

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

        const { eventTypes } = this.state

        switch (eventTypes[eventId]) {
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

        const { eventTypes } = this.state

        switch (eventTypes[eventId]) {
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

        //ALL Types of Event Button

        const { eventTypesDisplay, allButton } = this.state

        const setAllDisplayTrue = () => {
            Object.keys(eventTypesDisplay).map((event) => {
                eventTypesDisplay[event] = true
                return eventTypesDisplay;
            })
            return this.setState({ eventTypesDisplay })
        }

        if (allButton === false) {
            setAllDisplayTrue()
            this.setState({ allButton: true })
            this.setState({ eventsDraw: _events })
        }
    }

    filterEvents = (eventTypeId) => {

        const { eventTypesDisplay } = this.state

        //FILTER BUTTONS: toggle the eventTypesDisplay [true-false] and button style

        if (eventTypesDisplay[eventTypeId] === true) {
            eventTypesDisplay[eventTypeId] = false;
            this.setState({ allButton: false })
            this.setState({ eventTypesDisplay })
        } else {
            eventTypesDisplay[eventTypeId] = true;
            this.setState({ eventTypesDisplay })
        }

        //check if all eventTypesDisplay are true;

        const isAllDisplayTrue = (objs) => {
            let isTrue = true
            Object.keys(objs).map((obj) => {
                if (!objs[obj]) isTrue = false;
                return isTrue
            })
            return isTrue;
        }

        let showAllTypes = isAllDisplayTrue(eventTypesDisplay)

        if (showAllTypes) {
            this.setState({ allButton: true })
            this.setState({ eventsDraw: _events })
        } else {

            let allTypesFilteredEvents = []

            Object.keys(eventTypesDisplay).map((eventType) => {
                if (eventTypesDisplay[eventType] === false) {
                    let filteredEvents = _events.filter(event => event.eventType.includes(eventType))
                    allTypesFilteredEvents = allTypesFilteredEvents.concat(filteredEvents)
                }
                return allTypesFilteredEvents
            })

            this.setState({ eventsDraw: allTypesFilteredEvents })

        }
    }


    render() {

        const { lng, lat, zoom, eventsDraw, eventTypes, eventTypesDisplay, allButton, readyToRender} = this.state
        const { onShowEvent } = this.props
        /*User position on a map*/
        const position = [lat, lng]

        const stamenTiles = "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png";
        const attribution = '<a href="http://stamen.com">Stamen</a> | <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' ;

        //setTimeout added for allow load the css before the tiles of map (prevents gray tiles)
        setTimeout(() => {
            this.setState({ readyToRender: true });
          }, 70);

        return (
            <div id="section-map">

            {readyToRender && (
                <Map id="map-container" center={position} zoom={zoom}>
                    <TileLayer attribution={attribution} url={stamenTiles} />

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
                </Map>)}

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
                    <div onClick={() => this.setAll()} className={allButton === true ? "filter" : "filter nonSelected"}>
                        <img alt="" className="filter-icon" src="" placeholder="" />
                        <span className="filter-text ">All Event Types</span>
                    </div>

                </section>
            </div>
        )
    }
}