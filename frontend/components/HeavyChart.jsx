import React from 'react';
import PlayerStore from '../stores/PlayerStore';
import ChartUtil from '../util/ChartUtil';

const HeavyChart = React.createClass({
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
    ChartUtil.showHeavy(players);
  },
  render() {
    return (
      <div>
        <div className="chart"></div>
      </div>
    );
  },
});

export default HeavyChart;
