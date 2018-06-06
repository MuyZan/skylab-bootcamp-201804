'use strict'

require('dotenv').config()
const { env: { DB_URL } } = process;
const url = DB_URL;

const { mongoose, models: { Order } } = require('../.');
const scriptRunner = require('./../dataScripts/scriptRunner')

const { users } = require('./userDummies')

const [user1, user2, user3] = users




/*
const { pendingUsers } = require('./userDummies')
const { events } = require('./eventDummies')

console.log(events)

let user1Id;
let user2Id;
let user3Id;

Promise.all([
    scriptRunner.createData(pendingUsers)
]).then(res => {
    const [user1, user2, user3] = res
    user1Id = user1.id;
    user2Id = user2.id;
    user3Id = user3.id
})

const [event1, event2, event3] = events

const ticketType1 = event1.tickets[0].id
const ticketType2 = event1.tickets[1].id
const ticketType3 = event3.tickets[0].id

const orderDate1 = new Date()
const orderDate2 = new Date()
const orderDate3 = new Date()

const orderData1 = {events: eventId1, user: user1.id, date: orderDate1, paymentMethod: null, status: true, totalPrice:100, tickets:ticketType1};
const orderData2 = {events: eventId1, user: user2.id, date: orderDate2, paymentMethod: null, status: true, totalPrice:100, tickets:ticketType2};
const orderData3 = {events: eventId3, user: user3.id, date: orderDate3, paymentMethod: null, status: true, totalPrice:100, tickets:ticketType3};

const order1 = new Order(orderData1).save()
const order2 = new Order(orderData2).save()
const order3 = new Order(orderData3).save()

const pendingOrders = [order1, order2, order3]

const orders = scriptRunner.createData(pendingOrders)


module.exports = {orders, pendingOrders, orderData1 ,orderData2, orderData3}

*/