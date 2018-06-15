import React, { Component } from 'react'
import logic from '../../logic'
import ListResults from '../list-results/listResults'
import PartyMap from '../map/map'
import './../map/map.css'
import UserGeoLocation from './../geolocation/geolocation'



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


   componentWillMount(){
       const sessionData = sessionStorage.getItem("token")
       sessionData ? this.setState({ logged: true }) : this.setState({ logged: false }, ()=> this._ejectRoute("/"))     
    }
   

     _ejectRoute = route => {
         
        if(this.state.logged === false){
            this.props.history.push(route);
          }
     }
   

     _logout = () => {
        sessionStorage.clear();
        this.setState({logged: false}, ()=>this._ejectRoute("/"))   
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