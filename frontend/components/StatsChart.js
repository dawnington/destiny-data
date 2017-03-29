import React from 'react';
import PlayerStore from '../stores/PlayerStore';
import ChartUtil from '../util/ChartUtil';

const StatsChart = React.createClass({
  getInitialState() {
    return { filter: 'overall' };
  },
  componentDidMount() {
    this.storeListener = PlayerStore.addListener(this._onChange);
    window.addEventListener('resize', this.componentDidUpdate.bind(this));
    this.renderChart(PlayerStore.all());
  },
  componentDidUpdate() {
    this.renderChart(PlayerStore.all());
  },
  componentWillUnmount() {
    this.storeListener.remove();
    window.removeEventListener('resize', this.updateDimensions);
  },
  _onChange() {
    this.setState({ filter: PlayerStore.filter() });
  },
  renderChart(players) {
    switch (this.state.filter) {
      case 'overall':
        ChartUtil.showOverall(players);
        break;
      case 'primary':
        ChartUtil.showPrimary(players);
        break;
      case 'secondary':
        ChartUtil.showSecondary(players);
        break;
      case 'heavy':
        ChartUtil.showHeavy(players);
        break;
      default:
        break;
    }
  },
  render() {
    return (
      <div>
        <div className="chart"></div>
      </div>
    );
  },
});

export default StatsChart;
