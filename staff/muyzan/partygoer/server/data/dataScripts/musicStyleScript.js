'use strict'

/**
 * Music Style generator - Script 
 * 
 * This script generates all possible music styles tags and exports them as pending 
 * promises that will be resolved in the scriptRunner.js.
 * 
 */

const { mongoose, models: { MusicStyle } } = require('../.')

const rock = new MusicStyle({type:'Rock'}).save();
const hiphop = new MusicStyle({type:'Hip Hop'}).save();
const pop = new MusicStyle({type:'Pop'}).save();
const latin = new MusicStyle({type:'Latin'}).save();
const jazz = new MusicStyle({type:'Jazz'}).save();
const folk = new MusicStyle({type:'Folk'}).save();
const breakbeat = new MusicStyle({type:'Breakbeat'}).save();
const drumandbass = new MusicStyle({type:'Drum and bass'}).save();
const dub = new MusicStyle({type:'Dub'}).save();
const electro = new MusicStyle({type:'Electro'}).save();
const dancehall = new MusicStyle({type:'Dancehall'}).save();
const dubstep = new MusicStyle({type:'Dubstep'}).save();
const hardcore = new MusicStyle({type:'Hardcore'}).save();
const house = new MusicStyle({type:'House'}).save();
const funky = new MusicStyle({type:'Funky'}).save();
const techno = new MusicStyle({type:'Techno'}).save();
const trance = new MusicStyle({type:'Trance'}).save();
const acid = new MusicStyle({type:'Acid'}).save();
const trap = new MusicStyle({type:'Trap'}).save();
const other = new MusicStyle({type:'Other'}).save();

module.exports = [rock, hiphop, pop, latin, jazz, folk, breakbeat, drumandbass, dub, electro, dancehall, dubstep, hardcore, house, funky, techno, trance, acid, trap, other]

