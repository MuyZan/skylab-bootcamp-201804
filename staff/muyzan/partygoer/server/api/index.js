'use strict'

require('dotenv').config()

const { mongoose } = require('data')
const express = require('express')
const { userRouter, eventRouter, promoterRouter, orderRouter} = require('./routes')
const cors = require('cors')
const logic = require('logic')

const { env: { PORT, DB_URL, MAX_DISTANCE_NEARBY_SEARCH } } = process;
const url = DB_URL;

logic.maxDistance = MAX_DISTANCE_NEARBY_SEARCH

mongoose.connect(url)
    .then(() => {

        const port = PORT || process.argv[2] || 3000
        const app = express()
        app.use(cors())
        app.use('/api', [userRouter, eventRouter]) //add the rest later

        app.listen(port, () => console.log(`Hey-Hou! Server running on port ${port}`))

        process.on('SIGINT', () => {
            console.log('\nstoppping server!')

            mongoose.connection.close(() => {
                console.log('hey! database connection closed. \nNo more party!')

                process.exit()
            })
        })
    })
    .catch(console.error)