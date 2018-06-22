'use strict'

/**
 * Music Style creator - script 
 * 
 * This script generates all possible music styles tags and exports them as objects ready for been saved  
 * and promise-resolved with the method saveData() from scriptRunner.js.
 * 
 */

const { mongoose, models: { MusicStyle } } = require('../../.')

const rock = new MusicStyle({type:'Rock'})
const hiphop = new MusicStyle({type:'Hip Hop'})
const pop = new MusicStyle({type:'Pop'})
const latin = new MusicStyle({type:'Latin'})
const jazz = new MusicStyle({type:'Jazz'})
const folk = new MusicStyle({type:'Folk'})
const breakbeat = new MusicStyle({type:'Breakbeat'})
const drumandbass = new MusicStyle({type:'Drum and bass'})
const dub = new MusicStyle({type:'Dub'})
const electro = new MusicStyle({type:'Electro'})
const dancehall = new MusicStyle({type:'Dancehall'})
const dubstep = new MusicStyle({type:'Dubstep'})
const hardcore = new MusicStyle({type:'Hardcore'})
const house = new MusicStyle({type:'House'})
const funky = new MusicStyle({type:'Funky'})
const techno = new MusicStyle({type:'Techno'})
const trance = new MusicStyle({type:'Trance'})
const acid = new MusicStyle({type:'Acid'})
const trap = new MusicStyle({type:'Trap'})
const other = new MusicStyle({type:'Other'})

const musicStyles = [rock, hiphop, pop, latin, jazz, folk, breakbeat, drumandbass, dub, electro, dancehall, dubstep, hardcore, house, funky, techno, trance, acid, trap, other]

module.exports = musicStyles