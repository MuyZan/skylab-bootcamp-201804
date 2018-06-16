import React, { Component } from 'react'
import logic from '../../logic'
import ListResults from '../list-results/listResults'
import PartyMap from '../map/map'
import './../map/map.css'
import UserGeoLocation from './../geolocation/geolocation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


class Home extends Component {

    constructor() {
        super()

        this.state = {
            logged: '',      
            search: false,
            message: '',
            latitude: '',
            longitude: '',
            geoLoc: false,
            error: '',
        }
    }


   componentDidMount(){

       const auth = this.props.authenticated
       console.log(auth)
       auth ? toast.success(`Welcome ${logic._username} :D!`) : this.props.isNotAuth();

    }
   


   _logout =() => {
       this.props.onLogout()
       logic.logout()
       this.props.isNotAuth()
   }

    _handlerSearch = () => {

        this.setState({ search: true })
    }

    _geoFindMe = () => {


        if (!navigator.geolocation) {
            this.setState({ message: 'Geolocation is not supported by your browser' })
            return;
        }


        const success = (position) => {
       
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                this.setState({ latitude, longitude })
        
        
        };

        const geo_options ={
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000
        }

        function error(error) {
            let errorMessage = `Unable to retrieve your location. ERROR: (${error.code}) ${error.message}`;
            alert(errorMessage)
            this.setState({ error: errorMessage})
        }

        return navigator.geolocation.watchPosition(success, error, geo_options);

    }




    render() {



        return (
            <div>
                            <ToastContainer autoClose={3000}/>

                <button onClick={this._logout}>LOGOUT</button>
                <button onClick={this._handlerSearch}>LIST EVENTS</button>

                <button onClick={this._geoFindMe}>Show my location</button>

                <PartyMap/>

                <UserGeoLocation />


                

                {this.state.search === true ?
                    <ListResults _events={this.state.events} />
                    :
                    ""
                }
            </div>

        )

    }
}

export default Home;