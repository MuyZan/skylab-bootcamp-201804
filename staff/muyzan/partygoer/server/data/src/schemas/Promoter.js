'use strict'

const { Schema } = require('mongoose')

module.exports = new Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },

    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    photo: {
        type: String,
        required: false
    },

    events: {
        type: [Object],
        required: false
    }

})

