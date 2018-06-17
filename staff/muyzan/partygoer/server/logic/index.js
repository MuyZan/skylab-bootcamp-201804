'use strict'

require('dotenv').config()

const {env: { MAX_DISTANCE_NEARBY_SEARCH } } = process;

const maxDistance = MAX_DISTANCE_NEARBY_SEARCH

const moment = require('moment')
const now = new Date(moment().format('L'))

const { models: {
    User,
    Event,
    Order,
    Promoter,
    EventType,
    MusicStyle }
} = require('data')

const logic = {

    /**
     * ---------------
     * |||| USERS ||||
     * ---------------
     */

    /**************
    * REGISTER USER
    * 
    * @param {String} username
    * @param {String} email
    * @param {String} password
    * @param {String} name
    * @param {String} surname
    * 
    * @return {Promise<boolean>}
    */

    registerUser(username, email, password, name, surname) {
        return Promise.resolve()
            .then(() => {

                if (typeof username !== 'string') throw Error('username is not a string')
                if (!(username = username.trim()).length) throw Error('username is not a string')

                if (typeof email !== 'string') throw Error('email is not a string')
                if (!(email = email.trim()).length) throw Error('email is not a string')

                if (typeof password !== 'string') throw Error('password is not a string')
                if (!(password = password.trim()).length) throw Error('password is not a string')

                if (typeof name !== 'string') throw Error('name is not a string')
                if (!(name = name.trim()).length) throw Error('name is not a string')

                if (typeof surname !== 'string') throw Error('surname is not a string')
                if (!(surname = surname.trim()).length) throw Error('surname is not a string')

                return User.findOne({ username })
                    .then(user => {
                        if (user) throw Error(`user with username ${username} already exists`);

                        return User.create({ username, email, password, name, surname })
                            .then(() => true)
                    })
            })
    },

    /******************
    * AUTHENTICATE USER
    * 
    * @param {String} username
    * @param {String} password
    * 
    * @return {Promise<String>}
    */

    authenticateUser(username, password) {
        return Promise.resolve()
            .then(() => {

                if (typeof username !== 'string') throw Error('username is not a string')
                if (!(username = username.trim()).length) throw Error('username is not a string')

                if (typeof password !== 'string') throw Error('password is not a string')
                if (!(password = password.trim()).length) throw Error('password is not a string')

                return User.findOne({ username, password })
                    .then(user => {

                        if (!user) throw Error('wrong credentials')
                        return user.id
                    })

            })
    },

    /**************
    * RETRIEVE USER
    * 
    * @param {String} userId
    * 
    * @return {Promise<User>}
    */

    retrieveUser(userId) {
        return Promise.resolve()
            .then(() => {

                if (typeof userId !== 'string') throw Error('user userId is not a string')
                if (!(userId = userId.trim()).length) throw Error('user userId is empty or blank')

                return User.findById(userId).select({ _id: 0, username: 1, email: 1, name: 1, surname: 1, photo: 1 })
            })
            .then(user => {
                if (!user) throw Error(`no user found with id ${userId}`)

                return user
            })
    },

    /************
    * UPDATE USER
    * 
    * @param {String} userId
    * @param {String} name
    * @param {String} surname
    * @param {String} email
    * @param {String} password
    * @param {String} newPassword
    * @param {String} photo 
    * 
    * @return {Promise<boolean>}
    */

    updateUser(userId, username, name, surname, email, password, newPassword, photo) {
        return Promise.resolve()
            .then(() => {

                if (typeof userId !== 'string') throw Error('userId is not a string')
                if (!(userId = userId.trim()).length) throw Error('userId is not a string')

                if (typeof name !== 'string') throw Error('name is not a string')
                if (!(name = name.trim()).length) throw Error('user name is empty or blank')

                if (typeof surname !== 'string') throw Error('surname is not a string')
                if (!(surname = surname.trim()).length) throw Error('user surname is empty or blank')

                if (typeof email !== 'string') throw Error('email is not a string')
                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof password !== 'string') throw Error('password is not a string')
                if (!(password = password.trim()).length) throw Error('user password is empty or blank')

                if (typeof newPassword !== 'string') throw Error('newPassword is not a string')
                if (!(newPassword = newPassword.trim()).length) throw Error('user newPassword is empty or blank')

                if (typeof photo !== 'undefined') {
                    if (typeof photo !== 'string') throw Error('photo is not a string')
                    if (!(photo = photo.trim()).length) throw Error('user photo is empty or blank')
                }

                return User.findOne({ username, password })
            })
            .then(user => {

                if (!user) throw Error('wrong credentials')

                if (user.id !== userId) throw Error(`no user found with ${userId} for given credentials`)

                return user
            })
            .then(user => {
                user.name = name;
                user.surname = surname;
                user.email = email;
                user.password = newPassword ? newPassword : password;
                user.photo = photo;

                return user.save()
            })
            .then(() => true)
    },

    /****************
    * UNREGISTER USER
    * 
    * @param {String} userId
    * @param {String} username
    * @param {String} password
    * 
    * @return {Promise<boolean>}
    */

    unregisterUser(userId, username, password) {
        return Promise.resolve()
            .then(() => {

                if (typeof userId !== 'string') throw Error('userId is not a string')
                if (!(userId = userId.trim()).length) throw Error('userId is not a string')

                if (typeof username !== 'string') throw Error('username is not a string')
                if (!(username = username.trim()).length) throw Error('username is not a string')

                if (typeof password !== 'string') throw Error('password is not a string')
                if (!(password = password.trim()).length) throw Error('user password is empty or blank')

                return User.findOne({ username, password })
            })
            .then(user => {

                if (!user) throw Error('wrong credentials')

                if (user.id !== userId) throw Error(`no user found with id ${userId} for given credentials`)

                return user.remove()
            })
            .then(() => true)
    },



    /*---------------------------------------*/


    /****************
     * LIST EVENTS
     * 
     * 
     * 
     * @return {Promise<Events>}
     */



    listEvents() {
        return Promise.resolve()
            .then(() => {
                return Event.find()
                    .then(events => {
                        return events
                    })
            })
    },

    /****************
     * SEARCH NEARBY EVENTS
     * 
     * 
     * 
     * @return {Promise<Events>}
     */

     searchNearbyEvents(geolocation){
        return Promise.resolve()
        .then(()=>{
            const [lat, lng] = geolocation;
            return Event.find({location: {$near: {$maxDistance:maxDistance, $geometry: {type: 'Point', coordinates: [lng, lat]}}}})
        })
        .then(nearbyEvents => {
            return nearbyEvents;
        })
     },









    /**
     * ----------------
     * |||| ORDERS ||||
     * ----------------
     */




    /*ORDERS*/

    listOrders() { },

    createOrder() { },

    retrieveOrder() { },


    /**
     * -------------------
     * |||| PROMOTERS ||||
     * -------------------
     */


    /* PROMOTER */



    /**
     * ----------------
     * |||| EVENTS ||||
     * ----------------
     */



    listEventTypes() {
        return Promise.resolve()
            .then(() => {
                return EventType.find()
                    .then(eventTypes => {
                        return eventTypes
                    })
            })
    },


    /*EVENT*/

    createEvent() { },

    updateEvent() { },

    deleteEvent() { },



    filterEventsByType(eventTypeId) {
        return Promise.resolve()
        .then(()=>{
            return Event.find({eventType: {type: eventTypeId}})
        })
        .then(events =>{
            return events
        })
    },

    filterEventsByStyle(styleId) {

    },

    /**
     * -------------------------------------
     * |||| USER INTERACTION WITH EVENTS ||||
     * -------------------------------------
     */

    /** 
     * ADD EVENT TO 'INTERESTED' USER LIST
     * 
     * @param {String} userId
     * @param {String} eventId
     * 
     * @return {Promise<boolean>}
     * 
    */

   addEvent(userId, eventId) {
    return Promise.resolve()
        .then(() => {
            return User.findByIdAndUpdate(userId, { $push: { interested: eventId } }, { new: true })
                .then(() => true)
        })
},

    /** 
     * DELETE EVENT ON 'INTERESTED' USER LIST
     * 
     * @param {String} userId
     * @param {String} eventId
     * 
     * @return {Promise<boolean>}
     * 
    */

    deleteAddedEvent(userId, eventId) { },

    retrieveEvent(eventId) { },


    listAddedEvents(userId) {
        return Promise.resolve()
        .then(() => {
            return User.findById(userId).select({_id:0, interested:1})
        })
        .then(events => {
            if (!events) throw Error(`no events on user found with id ${userId}`)
            return events
        })
    },

    listPurchasedEvents() { },

    buyTickets() { },

    retrieveTicket() { },

    sendTicket() { },
}

module.exports = logic
