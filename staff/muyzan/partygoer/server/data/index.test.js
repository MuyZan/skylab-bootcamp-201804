'use strict'

require('dotenv').config()

const { mongoose, models: { User, Event, Order, Promoter, MusicStyle, EventType } } = require('.');
const { expect, should } = require('chai');

const { env: { DB_URL } } = process;
const url = DB_URL

describe('Models test', () => {

    
    const eventDay = new Date()

    const userZan =  {username: 'Zan', email: 'zan@zan.com', password: '123', newPassword: '456', name: 'Sandy', surname: 'Vargas', photo: 'photo', geolocation: [30,50]};
    const eventData = {name: 'Day of the Droids', date: eventDay, promoter: {_id: promoter1.id}, geolocation: [5, 10], eventType: 10, musicStyle: [21], image: 'flyer', description: 'Badalona event', ticketTypes: null, purchaseType: 0, capacity: 200, soldTickets: null }
 
    before(() => mongoose.connect(url))

    beforeEach(() => Promise.all([User.remove(), Event.remove(), Order.remove(), Promoter.remove()]))

    describe('create user', () => {
        it('should succeed on correc data', () => {

            const [user1] = pedingUsers;

            return user1.save()
                .then(user => {
                    expect(user).to.exist
                    expect(user._id).to.exist
                    expect(user).to.have.a.property('username')
                    expect(user).to.have.a.property('email')
                    expect(user).to.have.a.property('password')
                    expect(user).to.have.a.property('newPassword')
                    expect(user).to.have.a.property('name')
                    expect(user).to.have.a.property('surname')
                    expect(user).to.have.a.property('photo')
                    expect(user).to.have.a.property('geolocation')
                    expect(user).to.have.a.property('interested')
                    expect(user).to.have.a.property('orders')
                    expect(user.username).to.equal(userZan.username)
                    expect(user.email).to.equal(userZan.email)
                    expect(user.password).to.equal(userZan.password)
                    expect(user.newPassword).to.equal(userZan.newPassword)
                    expect(user.name).to.equal(userZan.name)
                    expect(user.surname).to.equal(userZan.surname)
                    expect(user.photo).to.equal(userZan.photo)
                    expect(user.geolocation).to.be.an('array').that.includes(30)
                    expect(user.geolocation).to.be.an('array').that.includes(50)

                })

        })
    })





    describe('create user', () => {

        it('should succeed on correct data', () => {

            const user = new User(userZan)

            return user.save()
                .then(user => {
                    expect(user).to.exist
                    expect(user._id).to.exist
                    expect(user).to.have.a.property('username')
                    expect(user).to.have.a.property('email')
                    expect(user).to.have.a.property('password')
                    expect(user).to.have.a.property('newPassword')
                    expect(user).to.have.a.property('name')
                    expect(user).to.have.a.property('surname')
                    expect(user).to.have.a.property('photo')
                    expect(user).to.have.a.property('geolocation')
                    expect(user).to.have.a.property('interested')
                    expect(user).to.have.a.property('orders')
                    expect(user.username).to.equal(userData1.username)
                    expect(user.email).to.equal(userData1.email)
                    expect(user.password).to.equal(userData1.password)
                    expect(user.newPassword).to.equal(userData1.newPassword)
                    expect(user.name).to.equal(userData1.name)
                    expect(user.surname).to.equal(userData1.surname)
                    expect(user.photo).to.equal(userData1.photo)
                    expect(user.geolocation).to.be.an('array').that.includes(30)
                    expect(user.geolocation).to.be.an('array').that.includes(50)
                })
        })
    })

   describe('create event', () => {

        it('should succeed on correct data', () => {

            const event = new Event(eventData)

            return event.save()
                .then(event => {
                    expect(event).to.exist
                    expect(event._id).to.exist

                    expect(event).to.have.a.property('name')
                    expect(event).to.have.a.property('date')
                    expect(event).to.have.a.property('promoter')
                    expect(event).to.have.a.property('geolocation')
                    expect(event).to.have.a.property('eventType')
                    expect(event).to.have.a.property('musicStyle')
                    expect(event).to.have.a.property('image')
                    expect(event).to.have.a.property('description')
                    expect(event).to.have.a.property('ticketTypes')
                    expect(event).to.have.a.property('purchaseType')
                    expect(event).to.have.a.property('capacity')
                    expect(event).to.have.a.property('soldTickets')

                    expect(event.name).to.equal(eventData.name)
                    expect(event.date).to.equal(eventData.date)
                    expect(event.promoter).to.exist
                    expect(event.geolocation).to.be.an('array').that.includes(5)
                    expect(event.geolocation).to.be.an('array').that.includes(10)
                    expect(event.eventType).to.equal(eventData.eventType)
                    expect(event.musicStyle).to.be.an('array').that.includes(21)
                    expect(event.image).to.equal(eventData.image)
                    expect(event.description).to.equal(eventData.description)
                    expect(event.ticketTypes).to.equal(eventData.ticketTypes)
                    expect(event.purchaseType).to.equal(eventData.purchaseType)
                    expect(event.capacity).to.equal(eventData.capacity)
                    expect(event.soldTickets).to.equal(eventData.soldTickets)

                })
        })
    })

    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done)))

})


