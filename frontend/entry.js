import React from 'react';
import { render } from 'react-dom';
import IndexRoute from 'react-router/lib/IndexRoute';
import hashHistory from 'react-router/lib/hashHistory';
import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

// Components
import Main from './components/Main';
import Intro from './components/Intro';
import OverallChart from './components/OverallChart';
import PrimaryChart from './components/PrimaryChart';
import SecondaryChart from './components/SecondaryChart';
import HeavyChart from './components/HeavyChart';

const router = (
  <Router history={hashHistory}>
    <Route path="/" component={Main}>
      <IndexRoute component={Intro} />
      <Route path="overall" component={OverallChart} />
      <Route path="primary" component={PrimaryChart} />
      <Route path="secondary" component={SecondaryChart} />
      <Route path="heavy" component={HeavyChart} />
    </Route>
  </Router>
);

document.addEventListener('DOMContentLoaded', () => {
  render(router, document.getElementById('root'));
});
