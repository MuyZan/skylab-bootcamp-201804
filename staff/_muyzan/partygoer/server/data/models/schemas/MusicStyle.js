'use strict'

const { Schema } = require('mongoose')

module.exports = new Schema({
    type: {
        type: 'String',
        required: true,
        enum: ['Rock', 'Hip Hop', 'Pop', 'Latin', 'Jazz', 'Folk', 'Breakbeat', 'Disco', 'Drum and bass', 'Dub', 'Electro', 'Dancehall', 'Dubstep', 'Hardcore', 'House', 'Funky', 'Techno', 'Trance', 'Acid', 'Trap', 'Other']
    }
})