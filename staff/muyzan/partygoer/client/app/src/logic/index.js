const partygoerApi = require('api')

//partygoerApi.url = 'http://localhost:5000/api'
partygoerApi.url = 'https://fierce-taiga-60122.herokuapp.com/api'

const logic = {
    _userId: null,
    _username: null,

    setUserId(userId){
        if(userId){
            this._userId = userId
            return
        }
        return this._userId
    },

    setUsername(username){
        if(username){
            this._username = username;
            return
        }
        return this._username
    },

    get loggedIn(){
        return !!this.setUserId()
    },

    logout(){
        this.setUserId(null)
        this.setUsername(null)
        sessionStorage.clear()
    },

    registerUser(username, email, password, name, surname){
        return partygoerApi.registerUser(username, email, password, name, surname)
        .then(() => true)
    },

    login(username, password){
        return partygoerApi.authenticateUser(username, password)
        .then(id => {      
            this.setUserId(id)
            this.setUsername(username)
            return true
        })
    },

    retrieveUser(){
        return partygoerApi.retrieveUser(this.setUserId())
        .then(userData => userData )
    },

    updateProfile(userId, username, name, surname, email, password, newPassword, photo){
        return partygoerApi.updateProfile(userId, username, name, surname, email, password, newPassword, photo)
        .then(() => true)
    },

    unregisterUser(userId, username, password){
        return partygoerApi.unregisterUser(userId, username, password)
        .then(() => true)
    },

    addEvent(userId, eventId){
        return partygoerApi.addEvent(userId, eventId)
        .then(() => true)
    },

    listEvents(){
        return partygoerApi.listEvents()
        .then(events => events)
    },

    listEventTypes(){
        return partygoerApi.listEventTypes()
        .then((eventTypes) => {
            let eventTypesObj = {}
            eventTypes.forEach(eventType => {
                eventTypesObj[eventType._id] = eventType.type        
            });
            return eventTypesObj
        })
    },

    listNearbyEvents(lng, lat){
        return partygoerApi.listNearbyEvents(lng, lat)
        .then(events => events)
    },

    retrieveEvent(eventId){
        return partygoerApi.retrieveEvent(eventId)
        .then(event => event)
    },

    userPosition(){
        return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject))
    },

    shareEvent() { },
}

module.exports = logic
