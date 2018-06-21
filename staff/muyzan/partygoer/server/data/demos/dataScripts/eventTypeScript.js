'use strict'

/**
 * Event Type generator - Script 
 * 
 * This script generates all possible categories of the type "event" and exports them as objects ready for been saved  
 * and promise-resolved with the method saveData() from scriptRunner.js.
 * 
 */

const { mongoose, models: { EventType } } = require('../../.')

const concert = new EventType({ type: 'Concert' })
const musicalAtmosphere = new EventType({ type: 'Musical atmosphere' })
const festival = new EventType({ type: 'Festival' })
const blockParty = new EventType({ type: 'Block party' })
const electronicLive = new EventType({ type: 'Electronic Live' })
const karaoke = new EventType({ type: 'Karaoke' })
const culturalEvent = new EventType({ type: 'Cultural event' })

const eventTypes = [concert, musicalAtmosphere, festival, blockParty, electronicLive, karaoke, culturalEvent]

module.exports = eventTypes;













