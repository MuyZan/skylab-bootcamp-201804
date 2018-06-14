import React, { Component } from 'react'
import logic from '../../logic'
import ListResults from '../list-results/listResults'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import PartyMap from '../map/map'
import leaflet from 'leaflet'
import './../map/map.css'
import UserGeoLocation from './../geolocation/geolocation'
import pin from './../../static/images/icons/placeholder.svg'



class Home extends Component {

    constructor() {
        super()

        this.state = {
            search: false,
            message: '',
            latitude: '',
            longitude: '',
            geoLoc: false,
            error: '',
        }
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
                          <img src={pin} alt="pin" />

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