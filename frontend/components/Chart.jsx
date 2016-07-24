import React from 'react';
import RadarChart from '../util/RadarChart';
import PlayerStore from '../stores/PlayerStore';
import StatsUtil from '../util/StatsUtil';

const Chart = React.createClass({
  getInitialState() {
    return { hasData: false };
  },
  componentDidMount() {
    this.storeListener = PlayerStore.addListener(this._onChange);
    document.getElementById('spinner').style.display = 'none';
  },
  componentWillUnmount() {
    this.storeListener.remove();
  },
  _onChange() {
    if (PlayerStore.count() > 0) {
      this.setState({ hasData: true });
    } else {
      this.setState({ hasData: false });
    }
    this.renderChart(PlayerStore.all());
  },
  showIntro() {
    if (this.state.hasData) {
      return <div></div>;
    }
    return (
      <div className="intro">
        <h1>Welcome to Destiny Data!</h1>
        <p>
          This is a simple site I made to display PvP stats, inspired by this <a href="https://www.reddit.com/r/CruciblePlaybook/comments/4rp01r/ideal_breakdown_of_kill_types/">Reddit thread</a>.
        </p>
        <p>Use the search bar to find and compare up to three users.</p>
        <p>I'll be working on more features (such as breaking down subcategories), so check back soon!</p>
        <p>You can fork the repo <a href="https://github.com/dawnington/destiny-data">here</a>. Thanks for stopping by! (ﾉ^ヮ^)ﾉ*:・ﾟ✧</p>
      </div>
    );
  },
  renderChart(players) {
    if (PlayerStore.count() > 0) {
      const data = StatsUtil.formatStats(players);
      RadarChart.drawChart('.chart', data);
    } else {
      RadarChart.removeChart('.chart');
    }
  },
  render() {
    return (
      <div className="chart">
        {this.showIntro()}
        <div className="loader-icon" id="spinner"></div>
      </div>
    );
  },
});

export default Chart;
