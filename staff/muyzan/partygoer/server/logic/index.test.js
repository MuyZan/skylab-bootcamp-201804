'use strict'

require('dotenv').config()

const { mongoose, models: { User, Event, Order, Promoter, EventType, MusicStyle } } = require('data')
const logic = require('.')
const { expect } = require('chai')

const { env: { DB_URL, MAX_DISTANCE_NEARBY_SEARCH } } = process;

logic.maxDistance = parseInt(MAX_DISTANCE_NEARBY_SEARCH)

const url = DB_URL

describe('logic --- [Partygoer]', () => {

    const userData = {};
    const dummyUserId = '123456781234567812345678';

    before(() => mongoose.connect(url))

    beforeEach(() => {

        let userData, ticketTypeData, dummyEventId, dummyPromoterId, dummyUserId, eventDay, eventData;

        userData = { username: "admin", email: "admin@admin.com", password: "123", name: "administrer", surname: "aja" }
        ticketTypeData = { quantity: 100, price: 10, description: 'gallinero' }
        eventDay = new Date();
        dummyPromoterId = '5b199763418e164519db6d0c'
        dummyUserId = '5b199f48d70f6243b73941aa'
        dummyEventId = '5b199763418e164519db6d13'
        dummyEventTypeId = '5b195563418e164519db6d13'
        dummyMusicStyleId = '77195563418e164519db6d13'
        eventData = { name: 'Day of the Droids', date: eventDay, promoter: dummyPromoterId, location: { type: "Point", coordinates: [2.1980124000000387, 41.4004274] }, eventType: dummyEventTypeId, musicStyle: dummyMusicStyleId, image: 'flyer1', description: 'Badalona event', ticketTypes: [ticketTypeData], purchaseType: 4, capacity: 200 }

        return Promise.all([User.remove().Event.deleteMany()])

    })

    describe('register user', () => {
        it('should succeed on correct data', () => {
            logic.registerUser('admin', 'admin@admin.com', '123', 'administer', 'aja')
                .then(res => {
                    expect(res).to.exist
                })
        })

        it('should fail on already existing username', () => {
            User.create(userData)
                .then(() => {
                    const { username, email, password, name, surname } = userData

                    return logic.registerUser(username, email, password, name, surname)
                })
                .catch(({ message }) => {
                    expect({ message }).to.equal(`user with ${userData.username} already exists`)
                })
        })

        it('should fail on already existing email', () => {
            User.create(userData)
                .then(() => {
                    const { username, email, password, name, surname } = userData

                    return logic.registerUser(username, email, password, name, surname)
                })
                .catch(({ message }) => {
                    expect({ message }).to.equal(`user with ${userData.email} already exists`)
                })
        })

        it('should fail on no username', () => {
            logic.registerUser()
                .catch(({ message }) => expect(message).to.equal('username is not a string'))
        })

        it('should fail on empty username', () => {
            logic.registerUser('')
                .catch(({ message }) => expect(message).to.equal('username is not a string'))
        })


    })

    describe('should add a event to user selected ones', () => {
        it('should succed on correct data', () => {
            return Promise.all([
                new User(userData).save(),
            ])
                .then(user => {
                    expect(user).to.exist
                    expect(user.length).to.equal(1)

                    return Promise.all([
                        new Event(eventData).save()
                    ])
                })
        })
    })
})
