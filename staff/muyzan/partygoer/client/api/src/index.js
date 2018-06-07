'use strict'

const axios = require('axios')

const partygoerApi = {
    url: 'NO-WHERE',
    token: 'NO-TOKEN',

    /**
     * 
     */

     registerUser(username, email, password, name, surname){
         return Promise.resolve()
         .then(()=>{
             return axios.post(`${this.url}/register`, {username, email, password, name, surname})
             .then(({status, data}) =>{
                 if(status !== 201 || data.status != 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                 return true
             })
             .catch(err => {
                 if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                 if(err.response){
                     const { response: {data: {error: message}}} = err
                     throw Error(message)
                 }else throw err
             })
         })
     },
}