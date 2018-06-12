import React, { Component } from 'react'
import logic from '../../logic'
import ListResults from '../list-results/ListResults'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import PartyMap from '../map/Map'
import leaflet from 'leaflet'
import './../map/map.css'
import GeoLocation from './../geolocation/Geolocation'


class Home extends Component {

    constructor() {
        super()

        this.state = {
            search: false
        }
    }

    _handlerSearch = () => {

           this.setState({ search: true})
    }

    render() {
        


        return (
            <div>
                <button onClick={this._handlerSearch}>LIST EVENTS</button>
                 <PartyMap/>




    <GeoLocation />


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