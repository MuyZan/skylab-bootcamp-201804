'use strict'

const mongoose = require('mongoose')
const { Event } = require('./schemas')

Event.index({ location: '2dsphere'})

module.exports = mongoose.model('Event', Event)