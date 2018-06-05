'use strict'

const mongoose = require('mongoose')
const { MusicStyle } = require('./schemas')

module.exports = mongoose.model('MusicStyle', MusicStyle)