'use strict'

const partygoerApi = require('api')

partygoerApi.url = 'http://localhost:3000/api'

const logic = {
    userId: 'NO-ID',
    eventId: '',


    registerUser(username, email, password, name, surname){
        return partygoerApi.registerUser(username, email, password, name, surname)
        .then(() => true)
    },

    login(username, password){
        return partygoerApi.authenticateUser(username, password)
        .then(id => {
            this.userId = id
            return id
        })
    },

    retrieveUser(userId){
        return partygoerApi.retrieveUser(userId)
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



    shareEvent() { },


}


module.exports = logic
