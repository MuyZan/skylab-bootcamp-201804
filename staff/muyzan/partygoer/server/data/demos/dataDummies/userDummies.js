'use strict'

const { mongoose, models: { User } } = require('../../.');

const userData1 =  {username: 'Zan', email: 'zan@zan.com', password: '123', newPassword: '456', name: 'Sandy', surname: 'Vargas', photo: 'photo', geolocation: [30,50]};
const userData2 =  {username: 'Ninja', email: 'alan@alan.com', password: '234', newPassword: '567', name: 'Alan', surname: 'Bover', photo: 'photo2', geolocation: [10,70]};
const userData3 =  {username: 'Pato', email: 'pato@pato.com', password: '567', newPassword: '123', name: 'Patito', surname: 'Feo', photo: 'photo3', geolocation: [60,100]};

module.exports = {userData1, userData2, userData3}