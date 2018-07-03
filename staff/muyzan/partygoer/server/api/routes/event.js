'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const logic = require('logic')

const jwt = require('jsonwebtoken')
const jwtValidation = require('./utils/jwt-validation')

const eventRouter = express.Router()

const { env: { TOKEN_SECRET, TOKEN_EXP } } = process

const jsonBodyParser = bodyParser.json()
const jwtValidator = jwtValidation(TOKEN_SECRET)

eventRouter.get('/events', jwtValidator, (req, res) => {

    return logic.listEvents()
        .then(() => {
            res.status(201)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})