'use strict'

require('dotenv').config()
const { env: { DB_URL } } = process;
const url = DB_URL;

const { mongoose, models: { Event, Promoter } } = require('../.')
const scriptRunner = require('./../dataScripts/scriptRunner')

scriptRunner.dropCollection(Event)
scriptRunner.dropCollection(Promoter)


const { promoterData1, promoterData2, promoterData3 } = require('./promoterDummies.js')
const eventTypes = require('./../dataScripts/eventTypeScript')
const musicStyles = require('./../dataScripts/musicStyleScript')

scriptRunner.saveData(eventTypes)
scriptRunner.saveData(musicStyles)

const [concert, festival, culturalEvent] = eventTypes
const [rock, techno, trance] = musicStyles

const promotersData = [promoterData1, promoterData2, promoterData3]
const promoters = scriptRunner.createData(promotersData, Promoter)
scriptRunner.saveData(promoters)

const [promoter1, promoter2, promoter3] = promoters

const eventDay1 = new Date()
const eventDay2 = new Date()
const eventDay3 = new Date()

//type of tickets 

const ticketTypeData1 = {quantity: 100, price: 10, description: 'gallinero'}
const ticketTypeData2 = {quantity: 50, price: 20, description: 'platea'}
const ticketTypeData3 = {quantity: 100, price: 30, description: 'entrada sin consumición'}

const ticketTypeData = [ticketTypeData1, ticketTypeData2, ticketTypeData3]

const eventData1 = {name: 'Day of the Droids', date: eventDay1, promoter: promoter1._id, geolocation: [5, 10], eventType: festival._id, musicStyle: trance._id, image: 'flyer1', description: 'Badalona event', ticketTypes: [ticketTypeData1, ticketTypeData3], purchaseType: 4, capacity: 200, soldTickets: null }
const eventData2 = {name: 'Razzmatazz II', date: eventDay2, promoter: promoter2._id, geolocation: [56, 510], eventType: concert._id, musicStyle: rock._id, image: 'flyer2', description: 'party hard, sleep easy', ticketTypes: null, purchaseType: 3, capacity: 50, soldTickets: null }
const eventData3 = {name: 'Rave en Palamos', date: eventDay3, promoter: promoter3._id, geolocation: [45, 8], eventType: culturalEvent._id, musicStyle: techno._id, image: 'flyer3', description: 'que si quiero o que si tengo', ticketTypes:[ticketTypeData2], purchaseType: 1, capacity: null, soldTickets: null }

const eventsData = [eventData1, eventData2, eventData3];
const events = scriptRunner.createData(eventsData, Event);
scriptRunner.saveData(events);


module.exports = {events, eventsData, ticketTypeData}
