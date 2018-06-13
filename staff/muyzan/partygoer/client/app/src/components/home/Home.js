import React, { Component } from 'react'
import logic from '../../logic'
import ListResults from '../list-results/ListResults'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import PartyMap from '../map/Map'
import leaflet from 'leaflet'
import './../map/map.css'
import UserGeoLocation from './../geolocation/Geolocation'


class Home extends Component {

    constructor() {
        super()

        this.state = {
            search: false,
            message: '',
            latitude: '',
            longitude: '',
            error:'',
        }
    }

    _handlerSearch = () => {

           this.setState({ search: true})
    }

    _geoFindMe = () => {

console.log("hola")
        if (!navigator.geolocation){
            this.setState({message: 'Geolocation is not supported by your browser'})
            return;
        }


       const success = (position) => {

            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;
         this.setState({latitude, longitude})
        };

   function error() {
        this.setState({error: "Unable to retrieve your location"})
        }

           return navigator.geolocation.getCurrentPosition(success, error);

    }

    render() {
        


        return (
            <div>
                <button onClick={this._handlerSearch}>LIST EVENTS</button>
                 <PartyMap/>




<UserGeoLocation/>


<button onClick={this._geoFindMe}>Show my location</button>

                {this.state.search === true ?
                <ListResults _events={this.state.events}/>
                :
                ""
            }
            </div>

        )

    }
}

export default Home;