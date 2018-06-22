'use strict'

const mongoose = require('mongoose')
const { Promoter } = require('./schemas')

module.exports = mongoose.model('Promoter', Promoter)