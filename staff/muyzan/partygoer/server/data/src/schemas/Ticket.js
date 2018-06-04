'use strict'

const { Schema } = require('mongoose')

module.exports = new Schema({
    tickedType: {
        type: Object,
        required: true
    }
})