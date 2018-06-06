'use strict'

const { mongoose, models: { Order } } = require('../.');

const users = require('./userDummies')
const events = require('./eventDummies')

const userId1 = users[0].id;
const userId2 = users[1].id;
const userId3 = users[2].id;

const eventId1 = events[0].id;
const eventId2 = events[1].id;
const eventId3 = events[2].id;

const orderData1 = {};
const orderData2 = {};
const orderData3 = {};

const order1 = new Order(orderData1);
const order2 = new Order(orderData2);
const order3 = new Order(orderData3);

module.exports = [order1, order2, order3, orderData1 ,orderData2, orderData3]

