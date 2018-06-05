'use strict'

require('dotenv').config()

const { mongoose, models: { User, Event, Order, Promoter } } = require('.');
const { expect, should } = require('chai');

const { env: { DB_URL } } = process;
const url = DB_URL
  

describe('Models test', () =>{

    const userZan =  {username: 'Zan', email: 'zan@zan.com', password: '123', newPassword: '456', name: 'Sandy', surname: 'Vargas', photo: 'photo', geolocation: [30,50]}; /*, interested: [{_id: 'eventId'}], orders: [{_id: 'orderId'}]*/
 
    before(() => mongoose.connect(url))

    beforeEach(() => Promise.all([User.remove(), Event.remove(), Order.remove(), Promoter.remove()]))
    
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
                    expect(user.username).to.equal(userZan.username)
                    expect(user.email).to.equal(userZan.email)
                    expect(user.password).to.equal(userZan.password)
                    expect(user.newPassword).to.equal(userZan.newPassword)
                    expect(user.name).to.equal(userZan.name)
                    expect(user.surname).to.equal(userZan.surname)
                    expect(user.photo).to.equal(userZan.photo)
                    expect(user.geolocation).to.be.an('array').that.includes(30)
                    expect(user.geolocation).to.be.an('array').that.includes(50)
                  //  expect(user.interested).to.equal(userZan.interested)
                  //  expect(user.orders).to.equal(userZan.orders)
                })
        })
    })

    after(done => mongoose.connection.db.dropDatabase(() => mongoose.connection.close(done) ))
})


//expect(user.geolocation).to.be.an('array').that.includes(30)
