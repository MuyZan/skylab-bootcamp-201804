'use strict'

const { Schema } = require('mongoose')

module.exports = new Schema({

    method: {
        type: String,
        required: true
    },

    status: {
        type: Boolean,
        required: true
    },
    
    description: {
        type: String,
        required: true
    }
})