import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { Animated } from 'react-animated-css'
import logic from '../../logic'
import ListResults from '../list-results/list-results'
import EventCard from '../event-card/event-card'
import Nav from '../nav/nav'
import PartyMap from '../map/map'
import './../map/map.css'
import './home.css'
import 'react-toastify/dist/ReactToastify.css'

export default class Home extends Component {

    constructor() {
        super()

        this.state = {
            search: false,
            event: undefined,
        }
    }

    componentDidMount() {
        const { authenticated, isNotAuth } = this.props
        authenticated ? toast.success(`Welcome ${logic.setUsername()}! :D`) : isNotAuth();
    }

    _logout = () => {
        const { onLogout, isNotAuth } = this.props
        onLogout()
        logic.logout()
        isNotAuth() 
    }

    _handlerSearch = () => {
        this.setState({ search: true })
    }

    _showEvent = (event) => {
        logic.retrieveEvent(event)
            .then(event => this.setState({ event }))
    }

    _closeCard = () => {
        this.setState({ event: undefined })
    }

    render() {

        const { search, event } = this.state

        return (
            <div className="container">

                <ToastContainer autoClose={3000} toastClassName='gradient-toast-container' />

                <Nav logout={this._logout} listAll={this._handlerSearch} />

                <main className="main">

                    <PartyMap onShowEvent={this._showEvent} />

                    {/*search && <ListResults /> NOT NOW*/}

                    {event !== undefined && (
                        <Animated animationIn="bounceInUp" animationOut="bounceInUp" isVisible={true}>
                            <EventCard event={event} closeCard={this._closeCard} />
                        </Animated>
                    )}

                </main>

                <footer className="footer">Coded with ♥ and <span role="img" aria-labelledby="droplet">💧💧</span> by Zan</footer>
            </div>
        )
    }
}