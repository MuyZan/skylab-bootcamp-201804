'use strict'

const { Schema, Schema: { ObjectId } } = require('mongoose')
const Ticket = require('./Ticket')
const TicketType = require('./TicketType')

module.exports = new Schema({

    name: {
        type: 'String',
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    promoter: {
        type: ObjectId,
        ref: 'Promoter',
        required: true
    },

    geolocation: {
        type: [Number],
        index: '2d',
        required: true
    },
    
    eventType: [{
        type: ObjectId,
        ref: 'EventType',
        required: true
    }],

    musicStyle: [{
        type: ObjectId,
        ref: 'MusicStyle',
        required: true
    }],

    image: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    ticketTypes: [TicketType],

    purchaseType: {
        type: Number,
        required: true,
        enum: [0, 1, 2, 3]
    },

    capacity: {
        type: Number,
        required: false
    },

    soldTickets: [Ticket]

})