import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import api from 'api'
import logic from './logic'

api.token = sessionStorage.getItem('token')
logic.userId = sessionStorage.getItem('userId')

ReactDOM.render(<BrowserRouter>
    <App />
</BrowserRouter>,
    document.getElementById('root'));
registerServiceWorker();