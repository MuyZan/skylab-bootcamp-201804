import React, { Component } from 'react'
import logic from '../../../logic'
import markers from './../markers'
import { toast } from 'react-toastify'
import placeholder from './../../../static/images/icons/rock.svg'

const { userPlaceholder, djPlaceholder, rock, raca, generic } = markers
export default class Filterbox extends Component {

    state = {
        allButton: true,
        eventTypesDisplay: null
    }

    componentWillMount() {
        /* fix
        const { _eventTypes } = this.props
        let eventTypesDisplay = {}

        Object.keys(this.props._eventTypes).map((key) => {
            return eventTypesDisplay[key] = true
        })

        this.setState({ eventTypesDisplay })*/
    }

    setFilterIcon = (eventId) => {

        const { eventTypes } = this.props

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
        const { _events } = this.props

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

            this.props.setState({ eventsDraw: _events })
        }
    }

    filterEvents = (eventTypeId) => {

        const { eventTypesDisplay, allButton } = this.state
        const { onSetStateEventsDraw, _events } = this.props

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
            onSetStateEventsDraw(_events)
        } else {

            let allTypesFilteredEvents = []

            Object.keys(eventTypesDisplay).map((eventType) => {
                if (eventTypesDisplay[eventType] === false) {
                    let filteredEvents = _events.filter(event => event.eventType.includes(eventType))
                    allTypesFilteredEvents = allTypesFilteredEvents.concat(filteredEvents)
                }
                return allTypesFilteredEvents
            })

            onSetStateEventsDraw(allTypesFilteredEvents)

        }
    }

    render() {

        const { allButton } = this.state
        const { eventTypes, eventTypesDisplay } = this.props

        return (
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
        )
    }
}