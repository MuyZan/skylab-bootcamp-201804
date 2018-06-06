'use strict'

const { mongoose, models: { Event } } = require('../.')

const promoters = require('./promoterDummies.js')
const eventTypes = require('./../dataScripts/eventTypeScript')
const musicStyles = require('./../dataScripts/musicStyleScript')

const [promoter1, promoter2, promoter3] = promoters;
const [concert, festival, culturalEvent] = eventTypes;
const [rock, techno, trance] = musicStyles;

const eventDay1 = new Date()
const eventDay2 = new Date()
const eventDay3 = new Date()


const eventData1 = {name: 'Day of the Droids', date: eventDay1, promoter: {_id: promoter1.id}, geolocation: [5, 10], eventType: festival.id, musicStyle: trance.id, image: 'flyer1', description: 'Badalona event', ticketTypes: {quantity: 100, price: 30, description: 'entrada sin consumición'}, purchaseType: 4, capacity: 200, soldTickets: null }
const eventData2 = {name: 'Razzmatazz II', date: eventDay2, promoter: {_id: promoter2.id}, geolocation: [56, 510], eventType: concert.id, musicStyle: rock.id, image: 'flyer2', description: 'party hard, sleep easy', ticketTypes: null, purchaseType: 3, capacity: 50, soldTickets: null }
const eventData3 = {name: 'Rave en Palamos', date: eventDay3, promoter: {_id: promoter3.id}, geolocation: [45, 8], eventType: culturalEvent.id, musicStyle: trance.id, image: 'flyer3', description: 'que si quiero o que si tengo', ticketTypes: null, purchaseType: 1, capacity: null, soldTickets: null }

const event1 = new Event(eventData1)
const event2 = new Event(eventData2)
const event3 = new Event(eventData3)

module.exports = [event1, event2. event3, eventData1, eventData2, eventData3]

console.log(rock)
