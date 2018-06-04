'use strict'

const { Schema } = require('mongoose')

module.exports = new Schema({

    quantity: {
        type: Number,
        required: true
    },

    price: {
        type: Number,
        required: true
    },
    
    description: {
        type: String,
        required: true
    }
})