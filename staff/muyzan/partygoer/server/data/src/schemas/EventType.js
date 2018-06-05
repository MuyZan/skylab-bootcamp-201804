'use strict'

const { Schema, Schema: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: {
        type: 'String',
        required: true,
        enum: ['Concert', 'Musical atmosphere', 'Festival', 'Block party', 'Electronic Live', 'Karaoke', 'Cultural event']
    },

    musicStyle: [{
        type: ObjectId,
        ref: 'MusicStyle',
        required: true
    }]
})