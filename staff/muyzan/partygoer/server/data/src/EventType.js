'use strict'

const mongoose = require('mongoose')
const { EventType } = require('./schemas')

module.exports = mongoose.model('EventType', EventType)