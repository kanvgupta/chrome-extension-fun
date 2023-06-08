import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Newtab from '../Newtab/Newtab';

import Popup from './Popup';
import './index.css';

ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" component={Popup} />
            <Route exact path="/Newtab" component={Newtab} />
        </Switch>
    </Router>,
    document.getElementById('app-container')
);
