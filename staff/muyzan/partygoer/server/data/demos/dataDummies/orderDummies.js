'use strict'

require('dotenv').config()

const moment = require('moment')

const { env: { DB_URL } } = process;
const url = DB_URL;

const { mongoose, models: { Order, User } } = require('../../.');
const scriptRunner = require('./../dataScripts/scriptRunner')

scriptRunner.dropCollection(User)
scriptRunner.dropCollection(Order)

const { userData1, userData2, userData3 } = require('./userDummies')
//const {event1Id, event2Id, event3Id, event1TicketTypes, event2TicketTypes, event3TicketTypes} = require('./eventDummies')
const event1Id = require('./eventDummies')

//import eventIds from ('./eventDummies')

/*
const users = scriptRunner.createData(usersData, User)
scriptRunner.saveData(users)

const [user1, user2, user3] = users*/

/*
const ticketType1 = event1.tickets[0].id
const ticketType2 = event1.tickets[1].id
const ticketType3 = event3.tickets[0].id

const orderDate1 = new Date()
const orderDate2 = new Date()
const orderDate3 = new Date()

const orderData1 = {events: event1_id, user: user1._id, date: orderDate1, paymentMethod: null, status: true, totalPrice:100, tickets:ticketType1};
const orderData2 = {events: event1_id, user: user2._id, date: orderDate2, paymentMethod: null, status: true, totalPrice:100, tickets:ticketType2};
const orderData3 = {events: event3_id, user: user3._id, date: orderDate3, paymentMethod: null, status: true, totalPrice:100, tickets:ticketType3};

const ordersData = [orderData1, orderData2, orderData3]
const orders = scriptRunner.createData(ordersData, Order);
scriptRunner.saveData(orders)

module.exports = {orders, ordersData, users}
*/
