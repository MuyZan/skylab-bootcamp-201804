"use strict"

const { Schema } = require("mongoose")
const Photo = require("./photo")

module.exports = new Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    info: { type: Object, required: false },
    description: { type: String, required: false},
    photos: [Photo]
})