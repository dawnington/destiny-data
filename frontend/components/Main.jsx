import React from 'react';
import Chart from './Chart';
import Legend from './Legend';

const Main = React.createClass({
  getInitialState() {
    return { path: window.location.pathname };
  },
  render() {
    return (
      <div className="main">
        <div className="content">
          <Chart />
          <Legend {...this.props} />
        </div>
        <div id="statusText"></div>
      </div>
    );
  },
});

export default Main;
