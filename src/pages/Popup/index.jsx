import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Popup from './Popup';
import './index.css';

ReactDOM.render(
    <Router>
        <Popup />
    </Router>,
    document.getElementById('app-container')
);
