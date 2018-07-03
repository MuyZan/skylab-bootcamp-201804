'use strict';

var axios = require('axios');

var partygoerApi = {
    url: 'NO-URL',

    token: function token(_token) {
        if (_token) {
            this._token = _token;
            return;
        }
        return this._token;
    },


    /**
     * 
     */

    registerUser: function registerUser(username, email, password, name, surname) {
        var _this = this;

        return Promise.resolve().then(function () {
            return axios.post(_this.url + '/register', { username: username, email: email, password: password, name: name, surname: surname }).then(function (_ref) {
                var status = _ref.status,
                    data = _ref.data;

                if (status !== 200 || data.status != 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;

                    throw Error(message);
                } else throw err;
            });
        });
    },
    authenticateUser: function authenticateUser(username, password) {
        var _this2 = this;

        return Promise.resolve().then(function () {
            return axios.post(_this2.url + '/auth', { username: username, password: password }).then(function (_ref2) {
                var status = _ref2.status,
                    data = _ref2.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                var _data$data = data.data,
                    id = _data$data.id,
                    token = _data$data.token;


                _this2.token(token);

                return id;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    retrieveUser: function retrieveUser(userId) {
        var _this3 = this;

        return Promise.resolve().then(function () {
            return axios.get(_this3.url + '/users/' + userId, { headers: { authorization: 'Bearer ' + _this3.token() } }).then(function (_ref3) {
                var status = _ref3.status,
                    data = _ref3.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    updateUser: function updateUser(userId, username, name, surname, email, password, newPassword, photo) {
        var _this4 = this;

        return Promise.resolve().then(function () {
            return axios.patch(_this4.url + '/users/' + userId, { username: username, name: name, surname: surname, email: email, password: password, newPassword: newPassword, photo: photo }, { headers: { authorization: 'Bearer ' + _this4.token() } }).then(function (_ref4) {
                var status = _ref4.status,
                    data = _ref4.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    unregisterUser: function unregisterUser(userId, username, password) {
        var _this5 = this;

        return Promise.resolve().then(function () {
            return axios.delete(_this5.url + '/users/' + userId, { headers: { authorization: 'Bearer ' + _this5.token() }, data: { username: username, password: password } }).then(function (_ref5) {
                var status = _ref5.status,
                    data = _ref5.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    addEvent: function addEvent(userId, eventId) {
        var _this6 = this;

        return Promise.resolve().then(function () {

            return axios.put(_this6.url + '/users/' + userId + '/events/' + eventId, { headers: { authorization: 'Bearer ' + _this6.token() } }).then(function (_ref6) {
                var status = _ref6.status,
                    data = _ref6.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return true;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    listEvents: function listEvents() {
        var _this7 = this;

        return Promise.resolve().then(function () {

            return axios.get(_this7.url + '/events', { headers: { authorization: 'Bearer ' + _this7.token() } }).then(function (_ref7) {
                var status = _ref7.status,
                    data = _ref7.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    listEventTypes: function listEventTypes() {
        var _this8 = this;

        return Promise.resolve().then(function () {

            return axios.get(_this8.url + '/event-types', { headers: { authorization: 'Bearer ' + _this8.token() } }).then(function (_ref8) {
                var status = _ref8.status,
                    data = _ref8.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    retrieveEvent: function retrieveEvent(eventId) {
        var _this9 = this;

        return Promise.resolve().then(function () {
            return axios.get(_this9.url + '/event/' + eventId, { headers: { authorization: 'Bearer ' + _this9.token() } }).then(function (_ref9) {
                var status = _ref9.status,
                    data = _ref9.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    },
    listNearbyEvents: function listNearbyEvents(lng, lat) {
        var _this10 = this;

        return Promise.resolve().then(function () {
            return axios.post(_this10.url + '/nearby-events', { lng: lng, lat: lat }, { headers: { authorization: 'Bearer ' + _this10.token() } }).then(function (_ref10) {
                var status = _ref10.status,
                    data = _ref10.data;

                if (status !== 200 || data.status !== 'OK') throw Error('unexpected response status ' + status + ' (' + data.status + ')');

                return data.data;
            }).catch(function (err) {
                if (err.code === 'ECONNREFUSED') throw Error('could not reach server');

                if (err.response) {
                    var message = err.response.data.error;


                    throw Error(message);
                } else throw err;
            });
        });
    }
};

module.exports = partygoerApi;
