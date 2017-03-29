import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

// Components
import Main from './components/Main';

document.addEventListener('DOMContentLoaded', () => {
  render(<Main />, document.getElementById('root'));
});
