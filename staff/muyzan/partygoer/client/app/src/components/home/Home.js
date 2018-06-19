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
import { Animated } from 'react-animated-css'


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
            <div className="container">
               

                <nav className="navBar">
                    <ToastContainer autoClose={3000} toastClassName='gradient-toast-container' />
                    <Nav logout={this._logout} listAll={this._handlerSearch}/>
                </nav>
                

                <main className="main">
                    <PartyMap onShowEvent={this._showEvent}/>

                     {this.state.search === true ?
                    <ListResults />
                    :
                    ""
                }

                {this.state.event !== undefined ?
                <Animated animationIn="bounceInUp" animationOut="bounceInUp" isVisible={true}>
                <EventCard event={this.state.event} closeCard={this._closeCard}/>
                </Animated>

                :
                ""
                 }

                </main>
                 
<footer className="footer">Coded with ♥ and 💧💧 by Zan</footer>
                


                
            </div>

        )

    }
}

export default Home;