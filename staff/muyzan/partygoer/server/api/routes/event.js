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

eventRouter.post('/nearby-events', jsonBodyParser, jwtValidator, (req, res) => {
    const { body: {lng, lat} } = req
    return logic.listNearbyEvents(lng, lat)
        .then(nearbyEvents => {
            res.status(200)
            res.json({ status: 'OK', data: nearbyEvents })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
 })

eventRouter.get('/event-types', jwtValidator, (req, res) => {
    return logic.listEventTypes()
        .then(eventTypes => {
            res.status(200)
            res.json({ status: 'OK', data: eventTypes })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
 })

eventRouter.get('/events', jwtValidator, (req, res) => {
    return logic.listEvents()
        .then(events => {
            res.status(200)
            res.json({ status: 'OK', data: events })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
 })

 eventRouter.get('/event/:eventId', jwtValidator, (req, res) => {
    const { params: { eventId } } = req
    return logic.retrieveEvent(eventId)
        .then(event => {
            res.status(200)
            res.json({ status: 'OK', data: event })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
 })

module.exports = eventRouter;