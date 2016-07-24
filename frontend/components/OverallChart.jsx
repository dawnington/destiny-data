import React from 'react';
import PlayerStore from '../stores/PlayerStore';
import ChartUtil from '../util/ChartUtil';

const OverallChart = React.createClass({
  componentDidMount() {
    this.storeListener = PlayerStore.addListener(this._onChange);
    this.renderChart(PlayerStore.all());
  },
  componentWillUnmount() {
    this.storeListener.remove();
  },
  _onChange() {
    this.renderChart(PlayerStore.all());
  },
  renderChart(players) {
    ChartUtil.showOverall(players);
  },
  render() {
    return (
      <div>
        <div className="chart"></div>
      </div>
    );
  },
});

export default OverallChart;
