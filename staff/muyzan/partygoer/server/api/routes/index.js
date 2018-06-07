'use strict'


const express = require('express')
const bodyParser = require('body-parser')
const logic = require('logic')

const jwt = require('jsonwebtoken')
const jwtValidation = require('./utils/jwt-validation')

const router = express.Router()

const { env: { TOKEN_SECRET, TOKEN_EXP } } = process


const jsonBodyParser = bodyParser.json()


const jwtValidator = jwtValidation(TOKEN_SECRET)


router.post('/register', jsonBodyParser, (req, res) => {
    const { body: { username, email, password, name, surname } } = req

    return logic.registerUser(username, email, password, name, surname)
        .then(() => {
            res.status(201)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.post('/auth', jsonBodyParser, (req, res) => {
    const { body: { username, password } } = req

    logic.authenticateUser(username, password)
        .then(id => {

            const token = jwt.sign({ id }, TOKEN_SECRET, { expiresIn: TOKEN_EXP })

            res.status(200);
            res.json({ status: 'OK', data: { id, token } })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.get('/users/:userId', jwtValidator, (req, res) => {
    const { params: { userId } } = req

    return logic.retrieveUser(userId)
        .then(user => {
            res.status(200)
            res.json({ status: 'OK', data: user })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.patch('/users/:userId', [jwtValidator, jsonBodyParser], (req, res) => {
    const { params: { userId }, body: { name, surname, email, password, newPassword, photo } } = req

    logic.updateUser(userId, name, surname, email, password, newPassword, photo)
        .then(() => {
            res.status(200)
            res.json({ status: 'OK' })
        })
        .catch(({ message }) => {
            res.status(400)
            res.json({ status: 'KO', error: message })
        })
})

router.delete('/users/:id', [jwtValidator, jsonBodyParser], (req, res) => {
    const { params: {userId}, body: { username, password }} = req

    logic.unregisterUser(userId, username, password)
    .then(()=>{
        res.status(200)
        res.json({ status: 'OK'})
    })
    .catch(({message}) =>{
        res.status(400)
        res.json({status: 'KO', error: message})
    })
})

module.exports = router;