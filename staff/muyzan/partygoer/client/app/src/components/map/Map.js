import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import './map.css'
import pin from './../../static/images/icons/placeholder.svg'
import L from 'leaflet'


const userPlaceholder = new L.icon({
    iconUrl: require('./../../static/images/icons/placeholder.svg'),
    iconSize: [34, 85],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
})

const djPlaceholder = new L.icon({
    iconUrl: require('./../../static/images/icons/dj.svg'),
    iconSize: [34, 85],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
})


const rock = new L.icon({
    iconUrl: require('./../../static/images/icons/rock.svg'),
    iconSize: [48, 85],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
})


export default class PartyMap extends Component {

    state = {
        lat: 0,
        lng: 0,
        zoom: 16,
        data: [[41.3980822, 2.198788199999967], [41.4004274, 2.1980124000000387], [41.3946117, 2.193671399999971]]

    }

    componentWillMount() {

        if (!navigator.geolocation) {
            this.setState({ message: 'Geolocation is not supported by your browser' })
            return;
        }


        const success = (position) => {
            Promise.resolve()
                .then(() => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    this.setState({ lat: latitude, lng: longitude })
                })
                .then(() => {
                    this.setState({ geoLoc: true })

                })



        };


        function error(error) {
            let errorMessage = `Unable to retrieve your location. ERROR: (${error.code}) ${error.message}`;
            alert(errorMessage)
            this.setState({ error: errorMessage })
        }

        navigator.geolocation.getCurrentPosition(success, error);

    }






    componentWillUnmount() {

    }




    render() {
        const array = this.state.data


        const position = [this.state.lat, this.state.lng]
        return (


            <Map id="map-container" center={position} zoom={this.state.zoom}>
                <TileLayer attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png" />


                {array.map((coor) =>

                    <Marker key={new Date()} position={coor} icon={djPlaceholder}>
                        <Popup >
                            <span >
                                USER POSITION
<button>jaja</button>
                            </span>
                        </Popup>
                    </Marker>

                )
                }


                <Marker position={[41.411614, 2.157429699999966]} icon={rock}>
                    <Popup >
                        <span >
                            DOS POSITION
<button>jaja</button>
                        </span>
                    </Popup>
                </Marker>

                <Marker position={position} icon={userPlaceholder}>
                    <Popup >
                        <span >
                            USER POSITION
<button>jaja</button>
                        </span>
                    </Popup>
                </Marker>


            </Map>

        )

    }
}







//            <div id="map-container"></div>

//url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//'http://{s}.tile.osm.org/{z}/{x}/{y}.png'

// http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png

/* // https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png


const stamenTonerAttr =
   'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';


   https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png
*/



/*

                <TileLayer attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"


*/



/*





*/


/*

 





*/