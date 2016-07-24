import PlayerConstants from '../constants/PlayerConstants';

function getPercentage(total, sub) {
  return (sub / total).toFixed(2);
}

function sumPrimary(player) {
  let total = 0;
  PlayerConstants.PRIMARY.forEach(weapon => {
    total += player[weapon];
  });
  return total;
}

function sumSecondary(player) {
  let total = 0;
  PlayerConstants.SECONDARY.forEach(weapon => {
    total += player[weapon];
  });
  return total;
}

function sumHeavy(player) {
  let total = 0;
  PlayerConstants.HEAVY.forEach(weapon => {
    total += player[weapon];
  });
  return total;
}

function calculateKillPercentages(player) {
  const data = [];
  const total = player.kills;
  data.push({ axis: 'Primary', value: getPercentage(total, sumPrimary(player)) });
  data.push({ axis: 'Secondary', value: getPercentage(total, sumSecondary(player)) });
  data.push({ axis: 'Heavy', value: getPercentage(total, sumHeavy(player)) });
  data.push({ axis: 'Grenade', value: getPercentage(total, player.weaponKillsGrenade) });
  data.push({ axis: 'Melee', value: getPercentage(total, player.weaponKillsMelee) });
  data.push({ axis: 'Super', value: getPercentage(total, player.weaponKillsSuper) });
  return data;
}

module.exports = {
  addStats(totalStats, stats) {
    const newStats = {};
    Object.keys(stats).forEach(key => {
      if (totalStats[key]) {
        newStats[key] = totalStats[key] + stats[key].basic.value;
      } else {
        newStats[key] = stats[key].basic.value;
      }
    });
    return newStats;
  },
  formatStats(players) {
    const data = [];
    Object.keys(players).forEach(username => {
      data.push(calculateKillPercentages(players[username]));
    });
    return data;
  },
};
