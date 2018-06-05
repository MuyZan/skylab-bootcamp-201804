'use strict'

require('dotenv').config()

const { mongoose, models: { User, Event, Order, Promoter, EventType, MusicStyle } } = require('data')
const logic = require('.')
const { expect } = require('chai')

const {env: { DB_URL } } = process;
const url = DB_URL

describe('logic --- [Partygoer]', () =>{

    const userData = {};
    const dummyUserId = '123456781234567812345678';

    before(() => mongoose.connect(url))

    beforeEach(() => User.remove())

    describe('register user', () => {
        
    })


})
