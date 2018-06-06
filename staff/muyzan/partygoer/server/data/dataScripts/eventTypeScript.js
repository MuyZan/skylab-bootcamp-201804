'use strict'

/**
 * Event Type generator - Script 
 * 
 * This script generates all possible categories of the type "event" and exports them as pending 
 * promises that will be resolved in the scriptRunner.js.
 * 
 */

const { mongoose, models: { EventType } } = require('../.')

const concert = new EventType({ type: 'Concert' }).save();
const musicalAtmosphere = new EventType({ type: 'Musical atmosphere' }).save();
const festival = new EventType({ type: 'Festival' }).save();
const blockParty = new EventType({ type: 'Block party' }).save();
const electronicLive = new EventType({ type: 'Electronic Live' }).save();
const karaoke = new EventType({ type: 'Karaoke' }).save();
const culturalEvent = new EventType({ type: 'Cultural event' }).save();

module.exports = [concert, musicalAtmosphere, festival, blockParty, electronicLive, karaoke, culturalEvent];













