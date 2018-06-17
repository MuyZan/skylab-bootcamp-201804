import React, { Component } from 'react'
import logic from '../../logic'
import ListResults from '../list-results/listResults'
import PartyMap from '../map/map'
import './../map/map.css'
import './home.css'
import UserGeoLocation from './../geolocation/geolocation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


class Home extends Component {

    constructor() {
        super()

        this.state = {
            username: '',
            logged: '',
            search: false,
            message: '',
            latitude: '',
            longitude: '',
            geoLoc: false,
            error: '',
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

    


    

    render() {



        return (
            <div>
               
                <ToastContainer autoClose={3000} toastClassName='gradient-toast-container' />

                <button onClick={this._logout}>LOGOUT</button>
                <button onClick={this._handlerSearch}>LIST EVENTS</button>

                 

                <PartyMap />

                <UserGeoLocation />


          

                {this.state.search === true ?
                    <ListResults />
                    :
                    ""
                }
            </div>

        )

    }
}

export default Home;