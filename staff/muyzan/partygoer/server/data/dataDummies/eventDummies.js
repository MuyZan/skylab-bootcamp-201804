'use strict'

require('dotenv').config()
const { env: { DB_URL } } = process;
const url = DB_URL;

const { mongoose, models: { Event, Promoter } } = require('../.')
const scriptRunner = require('./../dataScripts/scriptRunner')

const {promoterData1, promoterData2, promoterData3 } = require('./promoterDummies.js')
const eventTypes = require('./../dataScripts/eventTypeScript')
const musicStyles = require('./../dataScripts/musicStyleScript')

//const [promoter1, promoter2, promoter3] = promoters
const [concert, festival, culturalEvent] = eventTypes
const [rock, techno, trance] = musicStyles

const promotersData = [promoterData1, promoterData2, promoterData3]

const promotersIds = scriptRunner.createAndSaveData(promotersData, Promoter)
console.log(promotersIds)
Promise.all(promotersIds).then(res => console.log(res))

//console.log(promoterIds)




/*

//Promise.all(pendingPromoters).then(res => console.log(res))
//Promoter.find().then(promoters => console.log(promoters))

/*
const promoters = []
mongoose.connect(url)
    .then(() => {
        console.log(`connected to ${url}`)
        Promise.all(pendingPromoters)
            .then(res => {
                res.forEach(promoter => promoters.push(promoter._id))
            })
            .then(() => {
                return promoters
            })         
    })
    .then(() => {

    })
    .then(()=> {
        mongoose.connection.close()
    })

    .catch(console.error)






/*
Promise.all([
    scriptRunner.createData(pendingPromoters), 
 
).then((res)=>{
    console.log(res)
    const [promoters, eventTypes, musicStyles] = res
    const [promoter1, promoter2, promoter3] = promoters;
    promoterId1 = promoter1.id;
    promoterId2 = promoter2.id;
    promoterId3 = promoter3.id;
    const [concert, festival, culturalEvent] = eventTypes;
    concertId = concert.id;
    festivalId = festival.id;
    culturalEventId = culturalEvent.id;
    const [rock, techno, trance] = musicStyles;
    rockId = rock.id;
    technoId = techno.id;
    tranceId = trance.id;
})

console.log(promoterId1)

const eventDay1 = new Date()
const eventDay2 = new Date()
const eventDay3 = new Date()

 type of tickets 

const ticketTypeData1 = {quantity: 100, price: 10, description: 'gallinero'}
const ticketTypeData2 = {quantity: 50, price: 20, description: 'platea'}
const ticketTypeData3 = {quantity: 100, price: 30, description: 'entrada sin consumición'}


const eventData1 = {name: 'Day of the Droids', date: eventDay1, promoter: promoterId1, geolocation: [5, 10], eventType: festivalId, musicStyle: tranceId, image: 'flyer1', description: 'Badalona event', ticketTypes: [ticketTypeData1, ticketTypeData3], purchaseType: 4, capacity: 200, soldTickets: null }
const eventData2 = {name: 'Razzmatazz II', date: eventDay2, promoter: promoterId2, geolocation: [56, 510], eventType: concertId, musicStyle: rockId, image: 'flyer2', description: 'party hard, sleep easy', ticketTypes: null, purchaseType: 3, capacity: 50, soldTickets: null }
const eventData3 = {name: 'Rave en Palamos', date: eventDay3, promoter: promoterId3, geolocation: [45, 8], eventType: culturalEventId, musicStyle: technoId, image: 'flyer3', description: 'que si quiero o que si tengo', ticketTypes:[ticketTypeData2], purchaseType: 1, capacity: null, soldTickets: null }

const event1 = new Event(eventData1).save();
const event2 = new Event(eventData2).save();
const event3 = new Event(eventData3).save();

const pendingEvents = [event1, event2, event3]

const events = scriptRunner.createData(pendingEvents)

console.log(events)

module.exports = {events, pendingEvents, eventData1, eventData2, eventData3, ticketTypeData1, ticketTypeData2, ticketTypeData3}

*/