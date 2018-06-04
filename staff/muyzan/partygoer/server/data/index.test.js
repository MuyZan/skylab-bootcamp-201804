'use strict'

require('dotenv').config()

const { mongoose, models: { User, Event, Order, Promoter } } = require('.');
const { expect, should } = require('chai');

const { env: { DB_URL } } = process;

const userdata =  {
    username: 'Zan',
    email: 'zan@zan.com',
    password: '123',
    name: 'Sandy',
    surname: 'Vargas',
    //photo: '',
    geolocation: [30, 10],
    //interested: [],
    //orders: []
}   




describe('Models -User-', () =>{
    
    before(() => mongoose.connect(DB_URL))

    beforeEach(() => Promise.all(User.remove()))

    describe('create user', () => {

        it('should succed', () => {

            const user = new User(userdata)

            return user.save()
                .then(user => {
                    expect(user).not.to.be.undefined;
                    expect(user).to.have.a.property('username')
                    expect(user).to.have.a.property('email')
                    expect(user).to.have.a.property('password')
                    expect(user).to.have.a.property('name')
                    expect(user).to.have.a.property('surname')
                    expect(user).to.have.a.property('geolocation')
                    expect(user).to.not.have.a.property('geolocation')
                    expect(user.name).to.equal('Sandy')
                    expect(user.password).to.be.an('String')
                    expect(user.geolocation).to.be.an('array').that.includes(30)

                })

        })
    })
})
