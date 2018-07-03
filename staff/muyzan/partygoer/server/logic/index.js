'use strict'

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

/*---------------------*/

listEvents() { 
    return Promise.resolve()
    .then(()=>{
        return Event.find()
        .then(events => {
            return events
        })
    })
},


addEvent(userId, eventId) {
    return Promise.resolve()
    .then(()=>{
        return User.findByIdAndUpdate(userId, { $push: { interested:  eventId  } }, {new: true} )
        .then(() => true)
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



    /*EVENT*/

    createEvent() { },

    updateEvent() { },

    deleteEvent() { },

    /*EVENTS*/

    searchEvents(geolocalitation) {

        //PRIMERO FILTRAR LAS CERCANAS
        //LUEGO LAS POR LAS QUE ESTÉN OCURRIENDO EN EL TIEMPO

        return Promise.resolve()
            .then(() => {

            })



    }, /*geolocalitation */



    filterEventsByType(typeEvent, date) {

        return Event.find(typeId)
        /* let type = { type: typeEvent}
        type.date = date
        
        return Event.find(type).then(events => events)
        
        o
        
        filterEventsByType({eventType, date = today, userlocation}){
            return Promise.resolve().then(() =>{
                return Event.find({eventType})
                .populate('date')
                .then(res => 
                    array X
                    si la fecha está contenida entre X y X, 
                    puhear a un array
                    
                })
                retornar array
            })
        }
        
        
        
        
        
        */
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


    deleteAddedEvent() { },

    retrieveEvent() { },

    shareEvent() { },

    listAddedEvents(userId) {
        return
    },

    listPurchasedEvents() { },

    buyTickets() { },

    retrieveTicket() { },

    sendTicket() { },
}

module.exports = logic
