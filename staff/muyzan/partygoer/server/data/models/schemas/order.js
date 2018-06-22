'use strict'

const { Schema, Schema: { ObjectId } } = require('mongoose')
const PaymentMethod = require('./payment-method')

module.exports = new Schema({

    events: {
        type: ObjectId,
        ref: 'Event',
        required: true
    },

    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    paymentMethod: [PaymentMethod],

    status: {
        type: Boolean,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    },

    tickets: [{
        type: ObjectId,
        ref: 'Ticket',
        required: true
    }]

})