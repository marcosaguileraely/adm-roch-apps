import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import LogRocket from 'logrocket';

import store from './store/store'
import App from './App';
import Login from './components/Login/Login';

import './index.css';
import 'antd/dist/antd.css';

// LogRocket.init('bihsjn/rcis-rochester');

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)
