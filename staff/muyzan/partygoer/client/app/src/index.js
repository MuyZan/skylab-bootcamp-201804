import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import partygoerApi from 'api'

partygoerApi.token = function (token) {
    if(token) {
        sessionStorage.setItem('token', token)
    return
}
return sessionStorage.getItem('token')
}

ReactDOM.render(
<HashRouter>
<App />
</HashRouter>, document.getElementById('root'));
registerServiceWorker();
