'use strict'

const { mongoose, models: { Promoter } } = require('../../.');

const promoterData1 =  {username: 'Razzmatazz', email: 'razz@razz.com', password: '123', newPassword: '456', name: 'Señor', surname: 'Razzmatazz', photo: 'photo', events: null};
const promoterData2 =  {username: 'Sonar', email: 'sonar@sonar.com', password: '234', newPassword: '567', name: 'Señora', surname: 'Sonar', photo: 'photo2', events: null};
const promoterData3 =  {username: 'DayoftheDroids', email: 'day@day.com', password: '567', newPassword: '123', name: 'Señorito', surname: 'Day', photo: 'photo3', events: null};

module.exports = {promoterData1, promoterData2, promoterData3}