import React from 'react';
import { Link } from 'react-router';

const ChartOptions = React.createClass({
  render() {
    return (
      <div className="chart-options-group">
        <Link
          to="overall"
          className="chart-option overall"
          activeClassName="overall-active"
        >Overall</Link>
        <Link
          to="primary"
          className="chart-option primary"
          activeClassName="primary-active"
        >Primary</Link>
        <Link
          to="secondary"
          className="chart-option secondary"
          activeClassName="secondary-active"
        >Secondary</Link>
        <Link
          to="heavy"
          className="chart-option heavy"
          activeClassName="heavy-active"
        >Heavy</Link>
      </div>
    );
  },
});

export default ChartOptions;
