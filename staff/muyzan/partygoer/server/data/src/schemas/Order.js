'use strict'

const { Schema } = require('mongoose')
const PaymentMethod = require('./PaymentMethod')

module.exports = new Schema({

    events: {
        type: [Object],
        required: true
    },

    user: {
        type: Object,
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

    tickets: {
        type: [Object],
        required: true
    }

})
