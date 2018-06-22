'use strict'

require('dotenv').config()

const { env: { DB_URL } } = process;
const url = DB_URL;

const moment = require('moment')

const addSixHours = new Date(moment().add(6, 'h').format('L'))
const addNineHours = new Date(moment().add(9, 'h').format('L'))
const subSixHours = new Date(moment().subtract(6, 'h').format('L'))

const { mongoose, models: { Event, Promoter } } = require('../../.')
const scriptRunner = require('./../dataScripts/scriptRunner')

const { promoterData1, promoterData2, promoterData3 } = require('./promoterDummies.js')
const eventTypes = require('./../dataScripts/eventTypeScript')
const musicStyles = require('./../dataScripts/musicStyleScript')

/*
scriptRunner.dropCollection(Event)
scriptRunner.dropCollection(Promoter)

scriptRunner.saveData(eventTypes)
scriptRunner.saveData(musicStyles)*/

const [concert, musicalAtmosphere, festival, blockParty, electronicLive, karaoke, culturalEvent] = eventTypes
const [rock, hiphop, pop, latin, jazz, folk, breakbeat, drumandbass, dub, electro, dancehall, dubstep, hardcore, house, funky, techno, trance, acid, trap, other] = musicStyles

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

// [longitude, latitude] !!!
const eventData1 = {name: 'Day of the Droids', date: eventDay1, promoter: promoter1._id, location: { type: "Point", coordinates: [2.1980124000000387, 41.4004274 ]}, eventType: concert._id, musicStyle: trance._id, image: 'flyer1', description: 'ROC BORONAT 70', ticketTypes: [ticketTypeData1, ticketTypeData3], purchaseType: 4, capacity: 200}
const eventData2 = {name: 'Razzmatazz II', date: eventDay2, promoter: promoter2._id, location: { type: "Point", coordinates: [2.193671399999971, 41.3946117 ]}, eventType: musicalAtmosphere._id, musicStyle: rock._id, image: 'flyer2', description: 'LLULL 70', purchaseType: 3, capacity: 50 }
const eventData3 = {name: 'Rave en Palamos', date: eventDay3, promoter: promoter3._id, location: { type: "Point", coordinates: [2.198788199999967, 41.3980822 ]}, eventType: festival._id, musicStyle: techno._id, image: 'flyer3', description: 'CIUDAD DE GRANADA 40', ticketTypes:[ticketTypeData2], purchaseType: 1}

const eventsData = [eventData1, eventData2, eventData3];
const events = scriptRunner.createData(eventsData, Event);
const [event1, event2, event3] = events

scriptRunner.saveData(events);

/*
const event1Id = event1._id
const event2Id = event2._id
const event3Id = event3._id
const eventIds =[event1Id, event2Id, event3Id]
const event1TicketTypes = event1.ticketTypes
const event2TicketTypes = event2.ticketTypes
const event3TicketTypes = event3.ticketTypes*/

//module.exports.eventIds = eventIds;
//module.exports = {event1Id, event2Id, event3Id, event1TicketTypes, event2TicketTypes, event3TicketTypes, eventsData, ticketTypeData, promoters}
