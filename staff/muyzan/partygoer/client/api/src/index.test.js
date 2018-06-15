'use strict'

/*
TOKEN SETEADO LLAMANDO A partyGoerApi.token(token) (seteo)

los que son get partyGoerapi.token() <--- despues de autentificar. EN LOS QUE HAY TOKEN

*/


require('dotenv').config()

const { mongoose, models: { User, Promoter, Event, Order, EventType, MusicStyle} } = require('data')
const partygoerApi = require('./index')

const axios = require('axios')
const _ = require('lodash')
const { expect } = require('chai')
const sinon = require('sinon')

const jwt = require('jsonwebtoken')

const { env: { DB_URL, API_URL, TOKEN_SECRET } } = process

partygoerApi.url = API_URL


describe('api client --- [Partygoer]', () => {
    let userData1, userData2, userData3, promoter1, promoter2, promoter3
    const dummyUserId = '123456781234567812345678'
    const dummyPromoterId = '123456781234567812345678'
    const dummyEventId = '123456781234567812345678'

    before(() => mongoose.connect(DB_URL))

    beforeEach(()=>{

        let userData, ticketTypeData, dummyEventId, dummyPromoterId, dummyUserId, eventDay, eventData;

        userData = { username: "admin", email: "admin@admin.com", password: "123", name: "administrer", surname: "aja"}
        ticketTypeData = {quantity: 100, price: 10, description: 'gallinero'}
        eventDay = new Date();
        dummyPromoterId = '5b199763418e164519db6d0c'
        dummyUserId = '5b199f48d70f6243b73941aa'
        dummyEventId = '5b199763418e164519db6d13'
        dummyEventTypeId = '5b195563418e164519db6d13'
        dummyMusicStyleId = '77195563418e164519db6d13'
        eventData = {name: 'Day of the Droids', date: eventDay, promoter: dummyPromoterId, location: { type: "Point", coordinates: [2.1980124000000387, 41.4004274 ]}, eventType: dummyEventTypeId, musicStyle: dummyMusicStyleId, image: 'flyer1', description: 'Badalona event', ticketTypes: [ticketTypeData], purchaseType: 4, capacity: 200}

        return Promise.all([User.remove(), Event.deleteMany()])

    })


    describe('register user', () => {
        it('should succeed on correct data', ()=> {
            partygoerApi.registerUser('admin', 'admin@admin.com', '123', 'administer', 'aja')
            .then(res =>{
                expect(res).to.be.true
            })
        })

        it('should fail on already existing username', ()=>{
            User.create(userData)
            .then(() =>{
                const { username, email, password, name, surname} = userData

                return partygoerApi.registerUser(username, email, password, name, surname)
            })
            .catch(({ message }) => {
                expect({message}).to.equal(`user with ${userData.username} already exists`)
            })
        })   






    })



})


