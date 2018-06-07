'use strict'

require('dotenv').config()

const { env: { DB_URL } } = process;
const url = DB_URL;

const moment = require('moment')

const addSixHours = new Date(moment().add(6, 'h').format('L'))
const addNineHours = new Date(moment().add(9, 'h').format('L'))
const subSixHours = new Date(moment().subtract(6, 'h').format('L'))

const { mongoose, models: { Event, Promoter } } = require('../.')
const scriptRunner = require('./../dataScripts/scriptRunner')

const { promoterData1, promoterData2, promoterData3 } = require('./promoterDummies.js')
const eventTypes = require('./../dataScripts/eventTypeScript')
const musicStyles = require('./../dataScripts/musicStyleScript')

scriptRunner.dropCollection(Event)
scriptRunner.dropCollection(Promoter)

scriptRunner.saveData(eventTypes)
scriptRunner.saveData(musicStyles)

const [concert, festival, culturalEvent] = eventTypes
const [rock, techno, trance] = musicStyles

const promotersData = [promoterData1, promoterData2, promoterData3]
const promoters = scriptRunner.createData(promotersData, Promoter)
scriptRunner.saveData(promoters)

const [promoter1, promoter2, promoter3] = promoters

/*
const eventDay1 = new Date()
const eventDay2 = new Date()
const eventDay3 = new Date()*/

const eventDay1 = addSixHours
const eventDay2 = addNineHours
const eventDay3 = subSixHours

//type of tickets 

const ticketTypeData1 = {quantity: 100, price: 10, description: 'gallinero'}
const ticketTypeData2 = {quantity: 50, price: 20, description: 'platea'}
const ticketTypeData3 = {quantity: 100, price: 30, description: 'entrada sin consumición'}

const ticketTypeData = [ticketTypeData1, ticketTypeData2, ticketTypeData3]

const eventData1 = {name: 'Day of the Droids', date: eventDay1, promoter: promoter1._id, geolocation: [5, 10], eventType: festival._id, musicStyle: trance._id, image: 'flyer1', description: 'Badalona event', ticketTypes: [ticketTypeData1, ticketTypeData3], purchaseType: 4, capacity: 200}
const eventData2 = {name: 'Razzmatazz II', date: eventDay2, promoter: promoter2._id, geolocation: [56, 510], eventType: concert._id, musicStyle: rock._id, image: 'flyer2', description: 'party hard, sleep easy', purchaseType: 3, capacity: 50 }
const eventData3 = {name: 'Rave en Palamos', date: eventDay3, promoter: promoter3._id, geolocation: [45, 8], eventType: culturalEvent._id, musicStyle: techno._id, image: 'flyer3', description: 'que si quiero o que si tengo', ticketTypes:[ticketTypeData2], purchaseType: 1}

const eventsData = [eventData1, eventData2, eventData3];
const events = scriptRunner.createData(eventsData, Event);
const [event1, event2, event3] = events
const event1Id = event1._id
const event2Id = event2._id
const event3Id = event3._id
const eventIds =[event1Id, event2Id, event3Id]
const event1TicketTypes = event1.ticketTypes
const event2TicketTypes = event2.ticketTypes
const event3TicketTypes = event3.ticketTypes

scriptRunner.saveData(events);


exports = eventIds;

//module.exports.eventIds = eventIds;



//module.exports = {event1Id, event2Id, event3Id, event1TicketTypes, event2TicketTypes, event3TicketTypes, eventsData, ticketTypeData, promoters}
