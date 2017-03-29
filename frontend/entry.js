import React from 'react';
import { render } from 'react-dom';
import hashHistory from 'react-router/lib/hashHistory';
import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

// Components
import Main from './components/Main';

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={Main} />
  </Router>
);

document.addEventListener('DOMContentLoaded', () => {
  render(router, document.getElementById('root'));
});
