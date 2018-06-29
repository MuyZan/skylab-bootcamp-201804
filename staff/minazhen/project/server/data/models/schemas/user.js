const { Schema } = require("mongoose")

module.exports = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    bio: { type: String, required: false },
    bestTravel: { type: String, required: false },
    countries: { type: Array, required: false }
})