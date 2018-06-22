'use strict'

require('dotenv').config()
const { mongoose, models: { User, Event, Order, Promoter, MusicStyle, EventType } } = require('./../../.')
const { env: { DB_URL } } = process;
const url = DB_URL;

/** Import here the peding promises if it is necessary to resolve them.*/


/**
 * @constant scriptRunner 
 * 
 *- Contains methods that need a concrete enviroment:
 * 
 * @example require('dotenv').config()
 * 
 * const { mongoose } = require('<mongoose path>')
 * 
 * // .env at the same level of target file.
 * const { env: { DB_URL } } = process; 
 * 
 * const url = DB_URL; 
 */
const scriptRunner = {

    createData(data, modelName){
        const dataObjects = []
        for (let i = 0; i < data.length; i++) {
            dataObjects[i] = new modelName(data[i])
        }
        return dataObjects
    },

    saveData(dataObjects){
        return mongoose.connect(url)
        .then((connection) => {
           console.log(`connected to ${url} creating ${dataObjects}`)
            const promises = []
            for (let i = 0; i < dataObjects.length; i++) {
                promises[i] = dataObjects[i].save()
                .then((res)=>console.log(res))
                .catch((err)=>console.log(err))
            }
            return Promise.all(promises)
            .then(() => mongoose.connection.close())        
        })

        .catch(console.error)
    },

    /**
    * @function createAndSaveData(array, Model) - This function receives an array of the (-minimum of-) necessary
    * data for required fields from model-Schema and a Model type and creates an array of pending promises of 
    * created and saved data on database.
    * Then resolve this pending promises and return and array of ids.
    * 
    * 
    * ¡¡¡TO FIX!!!! Return ids!
    */

    createAndSaveData(data, modelName) {
         return mongoose.connect(url)
            .then((connection) => {
                console.log(`connected to ${url}`)
                const promises = []
                for (let i = 0; i < data.length; i++) {
                    promises[i] = new modelName(data[i]).save()
                    .then((res)=>console.log(res))
                    .catch((err)=>console.log(err))
                   
                }
                return Promise.all(promises)
                    .then((res) => {
                       const ids = []
                        res.forEach(element => {
                            ids.push(element._id)
                        })
                        return ids
                    })
                    .then(() => mongoose.connection.close())
            })
            .catch(console.error)
    },


    /**
    * @function eraseDataBase() - Drop all data base.
    */

    eraseDataBase() {
        mongoose.connect(url)
            .then((connection) => {
                mongoose.connection.db.dropDatabase(() => mongoose.connection.close())
            })
            .catch(console.error)
    },

    /**
    * @function dropCollection(model) - Drop a concrete collection.
    */

    dropCollection(model) {
        mongoose.connect(url)
            .then((connection) => model.collection.drop())
            .then(() => mongoose.connection.close())
            .catch(console.log)
    }

}

module.exports = scriptRunner;