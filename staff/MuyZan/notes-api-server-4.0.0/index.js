'use strict'

const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./src/routes')
<<<<<<< HEAD:staff/MuyZan/notes-api-server-4.0.0/index.js
const logic = require('./src/logic')
=======
const cors = require('cors')
>>>>>>> upstream/develop:stuff/notes-api-server-5.0.0/index.js

mongoose.connect('mongodb://localhost/skylab-bootcamp-201804')
    .then(() => {
        const port = process.argv[2] || 3000

        const app = express()

        app.use(cors())

        app.use(bodyParser.json()) // middleware

<<<<<<< HEAD:staff/MuyZan/notes-api-server-4.0.0/index.js
    const app = express()
    app.use(bodyParser.json()) // middleware
=======
        app.use('/api', router)

        app.listen(port, () => console.log(`server running on port ${port}`))

        process.on('SIGINT', () => {
            console.log('\nstopping server')
>>>>>>> upstream/develop:stuff/notes-api-server-5.0.0/index.js

            mongoose.connection.close(() => {
                console.log('db connection closed')

                process.exit()
            })
        })
    })
    .catch(console.error)