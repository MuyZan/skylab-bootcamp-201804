'use strict'

const { Schema } = require('mongoose')

module.exports = new Schema({
    type: {
        type: 'String',
        required: true,
        enum: ['Concert', 'Musical atmosphere', 'Festival', 'Block party', 'Electronic Live', 'Karaoke', 'Cultural event']
    }
})