'use strict'

const axios = require('axios')

const partygoerApi = {
    url: 'NO-URL',

    token(token){
        if(token){
            this._token = token
            return
        }
        return this._token
    },

    /**
     * 
     */

    registerUser(username, email, password, name, surname) {
        return Promise.resolve()
            .then(() => {
                return axios.post(`${this.url}/register`, { username, email, password, name, surname })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status != 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err
                            throw Error(message)
                        } else throw err
                    })
            })
    },

    authenticateUser(username, password) {
        return Promise.resolve()
            .then(() => {
                return axios.post(`${this.url}/auth`, { username, password })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        const { data: { id, token } } = data;

                        this.token(token)

                        return id
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })

    },

    retrieveUser(userId) {
        return Promise.resolve()
            .then(() => {
                return axios.get(`${this.url}/users/${userId}`, { headers: { authorization: `Bearer ${this.token()}` } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    updateUser(userId, username, name, surname, email, password, newPassword, photo) {
        return Promise.resolve()
            .then(() => {
                return axios.patch(`${this.url}/users/${userId}`, { username, name, surname, email, password, newPassword, photo }, { headers: { authorization: `Bearer ${this.token()}` } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true

                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })

            })
    },

    unregisterUser(userId, username, password) {
        return Promise.resolve()
            .then(() => {
                return axios.delete(`${this.url}/users/${userId}`, { headers: { authorization: `Bearer ${this.token()}` }, data: { username, password } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    addEvent(userId, eventId) {
        return Promise.resolve()
            .then(() => {

                return axios.put(`${this.url}/users/${userId}/events/${eventId}`, { headers: { authorization: `Bearer ${this.token()}` } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    listEvents() {
        return Promise.resolve()
            .then(() => {

                return axios.get(`${this.url}/events`, { headers: { authorization: `Bearer ${this.token()}` } })
                .then(({ status, data })=>{
                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                    return data.data
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')
    
                    if (err.response) {
                        const { response: { data: { error: message } } } = err
    
                        throw Error(message)
                    } else throw err
                })
                
            })
            
    },


    listEventTypes(){
        return Promise.resolve()
        .then(()=>{

            return axios.get(`${this.url}/event-types`, {headers: { authorization: `Bearer ${this.token()}` }})
            .then(({ status, data })=>{
                if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                return data.data

            })
            .catch(err => {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server')
    
                if (err.response) {
                    const { response: { data: { error: message } } } = err
    
                    throw Error(message)
                } else throw err
            })
        })
    },

    retrieveEvent(eventId){
        return Promise.resolve()
        .then(() => {
            return axios.get(`${this.url}/event/${eventId}`, { headers: { authorization: `Bearer ${this.token()}` } })
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                    return data.data
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                    if (err.response) {
                        const { response: { data: { error: message } } } = err

                        throw Error(message)
                    } else throw err
                })
        })
    },

    listNearbyEvents(lng, lat) {
        return Promise.resolve()
            .then(() => {
                return axios.post(`${this.url}/nearby-events`, {lng, lat}, { headers: { authorization: `Bearer ${this.token()}` } })
                .then(({ status, data })=>{
                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                    return data.data
                })
                .catch(err => {
                    if (err.code === 'ECONNREFUSED') throw Error('could not reach server')
    
                    if (err.response) {
                        const { response: { data: { error: message } } } = err
    
                        throw Error(message)
                    } else throw err
                })
                
            })      
    },

}

module.exports = partygoerApi