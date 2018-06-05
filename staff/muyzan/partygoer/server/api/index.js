'use strict'

const mongoose = require('mongoose')
const express = require('express')
const router = require('./routes')

const { env: { PORT, DB_URL } } = process;
const url = DB_URL;


mongoose.connect(url)
    .then(() => {

        const port = PORT || 3000
        const app = express()
        app.use('/api', router)

        app.listen(port, () => console.log(`Hey-Hou! Server running on port ${port}`))

        process.on('SIGINT', () => {
            console.log('\nstoppping server!')

            mongoose.connection.close(() => {
                console.log('hey! database connection closed')

                process.exit()
            })
        })
    })
    .catch(console.error)










