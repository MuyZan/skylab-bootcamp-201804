'use strict'

const { Schema, Schema: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    tickedType: {
        type: ObjectId,
        ref: 'TicketType',
        required: true
    }
})