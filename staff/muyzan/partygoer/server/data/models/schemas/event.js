'use strict'

const { Schema, Schema: { ObjectId }, SchemaTypes: { Decimal128 } } = require('mongoose')
const Ticket = require('./ticket')
const TicketType = require('./ticket-type')

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

    address: {
        type: 'String',
        required: true
    },

    place: {
        type: 'String',
        required: true
    },

    location: {
        type: { type: String },
        coordinates: [Decimal128],
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