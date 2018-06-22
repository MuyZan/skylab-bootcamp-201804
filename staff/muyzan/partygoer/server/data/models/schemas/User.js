'use strict'
const { Schema, Schema: { ObjectId }, SchemaTypes: { Decimal128 }} = require('mongoose')

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

    newPassword: {
        type: 'String',
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
    }, 

    geolocation: {
        type: { type: String },
        coordinates: [Decimal128],
    },

    interested: [{
        type: ObjectId,
        ref: 'Event',
    }],

    orders: [{
        type: ObjectId,
        ref: 'Order',
    }]
})