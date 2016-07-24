import RadarChart from './RadarChart';
import StatsUtil from './StatsUtil';
import PlayerStore from '../stores/PlayerStore';

module.exports = {
  showOverall(players) {
    if (PlayerStore.count() > 0) {
      const data = StatsUtil.formatStats(players);
      RadarChart.drawChart('.chart', data);
    } else {
      RadarChart.removeChart('.chart');
    }
  },
  showPrimary(players) {
    if (PlayerStore.count() > 0) {
      const data = StatsUtil.primaryStats(players);
      RadarChart.drawChart('.chart', data);
    } else {
      RadarChart.removeChart('.chart');
    }
  },
  showSecondary(players) {
    if (PlayerStore.count() > 0) {
      const data = StatsUtil.secondaryStats(players);
      RadarChart.drawChart('.chart', data);
    } else {
      RadarChart.removeChart('.chart');
    }
  },
  showHeavy(players) {
    if (PlayerStore.count() > 0) {
      const data = StatsUtil.heavyStats(players);
      RadarChart.drawChart('.chart', data);
    } else {
      RadarChart.removeChart('.chart');
    }
  },
};
