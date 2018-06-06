'use strict'

require('dotenv').config()

const { mongoose } = require('./../.')
const { env: { PORT, DB_URL } } = process;
const url = DB_URL;

/**
 * Import all pending promises from data Scripts (fixed data that app needs) or data dummies for testing/demostration
 */

const pendingEventTypes = require('./eventTypeScript')
const pendingMusicStyles = require('./musicStyleScript')

/**
 * Save the docs from eventTypes and musicStyles. 
 * If collections are deleted and created again, 
 * references in other docs to the category and tag id's will still working.
 */

const eventTypes = [];
const musicStyles = [];



const scriptRunner = {

    createData(promises) {
        mongoose.connect(url)
            .then((connection) => {
                console.log(`connected to ${url}`)
                return Promise.all(promises)
                    .then(res => {
                        console.log(res)
                    })
                    .then(() =>{
                        mongoose.connection.close()
                    })
            })
            .catch(console.error)
    },

    createEventTypes(promises){
        mongoose.connect(url)
        .then((connection) => {
            console.log(`connected to ${url}`)
            return Promise.all(promises)
                .then(res => {
                    console.log(res)
                    res.forEach(event => eventTypes.push(event))
                })
                .then(() =>{
                    mongoose.connection.close()
                })
        })
        .catch(console.error)
    },

    createMusicStyles(promises){
        mongoose.connect(url)
        .then((connection) => {
            console.log(`connected to ${url}`)
            return Promise.all(promises)
                .then(res => {
                    console.log(res)
                    res.forEach(style => musicStyles.push(style))
                })
                .then(() =>{
                    mongoose.connection.close()
                })
        })
        .catch(console.error)
    },



    

    eraseDataBase(){
        mongoose.connect(url)
            .then((connection) =>{
                mongoose.connection.db.dropDatabase(() => mongoose.connection.close())
            })
            .catch(console.error)
    },

    eraseCollection(collection){
        mongoose.connect(url)
            .then((connection) =>{
                collection.remove(() => mongoose.connection.close())
            })
            .catch(console.error)
    }
}


module.exports = scriptRunner, eventTypes, musicStyles;












