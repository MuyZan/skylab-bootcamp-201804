import React, { Component } from 'react'
import logic from '../../logic'
import ListResults from '../list-results/listResults'
import EventCard from '../eventCard/eventCard'
import Nav from '../nav/nav'
import PartyMap from '../map/map'
import './../map/map.css'
import './home.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


class Home extends Component {

    constructor() {
        super()

        this.state = {
            search: false,
            event: undefined
        }
    }


    componentDidMount() {

        const auth = this.props.authenticated

        auth ? toast.success(`Welcome ${logic.setUsername()} :D!`) : this.props.isNotAuth();

    }



    _logout = () => {
        this.props.onLogout()
        logic.logout()
        this.props.isNotAuth()
    }

    _handlerSearch = () => {

        this.setState({ search: true })
    }

    
    _showEvent = (event) => {
        logic.retrieveEvent(event)
        .then(event => this.setState({ event }))
    }

    _closeCard = () => {
        this.setState({event: undefined})
    }
    

    render() {



        return (
            <div>
               
                <ToastContainer autoClose={3000} toastClassName='gradient-toast-container' />

                <nav>
                    <Nav logout={this._logout} listAll={this._handlerSearch}/>
                </nav>
                

                 

                <PartyMap onShowEvent={this._showEvent}/>



                {this.state.search === true ?
                    <ListResults />
                    :
                    ""
                }

                {this.state.event !== undefined ?
                <EventCard event={this.state.event} closeCard={this._closeCard}/>
                :
                ""
                 }
            </div>

        )

    }
}

export default Home;