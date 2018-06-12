import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import './map.css'

export default class PartyMap extends Component {
       
    
    state = {
            lat: 41.398478,
            lng: 2.199981,
            zoom: 13,
        }
    
    render() {
        const position = [this.state.lat, this.state.lng]
        return (
            
            <Map id="map-container" center={position} zoom={this.state.zoom}>
                <TileLayer attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <Marker position={position}>
                    <Popup>
                        <span>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </span>
                    </Popup>
                </Marker>
            </Map>

        )

    }
}





//            <div id="map-container"></div>


