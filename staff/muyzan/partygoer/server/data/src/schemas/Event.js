'use strict'

const { Schema } = require('mongoose')
const Ticket = require('./Ticket')
const TicketType = require('./TicketType')

module.exports = new Schema({

    date: {
        type: Date,
        required: true
    },

    promoter: {
        type: Object,
        required: true
    },

    eventType: {
        type: Number,
        required: true
    },

    musicStyle: {
        type: [Number],
        required: true
    },

    image: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    ticketType: [TicketType],

    geolocation: {
        type: String,
        required: true
    },

    purchaseType: {
        type: Number,
        required: true
    },

    capacity:{
        type: Number,
        required: true
    },

    soldTickets: [Ticket]

})