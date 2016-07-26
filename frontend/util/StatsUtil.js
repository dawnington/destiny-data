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

function sumSuper(player) {
  let total = 0;
  PlayerConstants.SUPER.forEach(weapon => {
    total += player[weapon];
  });
  return total;
}

function totalKills(player) {
  return sumPrimary(player) + sumSecondary(player) + sumHeavy(player) + sumSuper(player) + player.weaponKillsGrenade + player.weaponKillsMelee;
}

function calculateKillPercentages(player) {
  const data = [];
  const total = totalKills(player);
  data.push({ axis: 'Primary', value: getPercentage(total, sumPrimary(player)) });
  data.push({ axis: 'Secondary', value: getPercentage(total, sumSecondary(player)) });
  data.push({ axis: 'Heavy', value: getPercentage(total, sumHeavy(player)) });
  data.push({ axis: 'Grenade', value: getPercentage(total, player.weaponKillsGrenade) });
  data.push({ axis: 'Melee', value: getPercentage(total, player.weaponKillsMelee) });
  data.push({ axis: 'Super', value: getPercentage(total, sumSuper(player)) });
  return data;
}

function calculatePrimary(player) {
  const data = [];
  const total = sumPrimary(player);
  data.push({ axis: 'Auto Rifle', value: getPercentage(total, player.weaponKillsAutoRifle) });
  data.push({ axis: 'Pulse Rifle', value: getPercentage(total, player.weaponKillsPulseRifle) });
  data.push({ axis: 'Scout Rifle', value: getPercentage(total, player.weaponKillsScoutRifle) });
  data.push({ axis: 'Hand Cannon', value: getPercentage(total, player.weaponKillsHandCannon) });
  return data;
}

function calculateSecondary(player) {
  const data = [];
  const total = sumSecondary(player);
  data.push({ axis: 'Fusion Rifle', value: getPercentage(total, player.weaponKillsFusionRifle) });
  data.push({ axis: 'Shotgun', value: getPercentage(total, player.weaponKillsShotgun) });
  data.push({ axis: 'Sniper Rifle', value: getPercentage(total, player.weaponKillsSniper) });
  data.push({ axis: 'Sidearm', value: getPercentage(total, player.weaponKillsSideArm) });
  return data;
}

function calculateHeavy(player) {
  const data = [];
  const total = sumHeavy(player);
  data.push({ axis: 'Rocket Launcher', value: getPercentage(total, player.weaponKillsRocketLauncher) });
  data.push({ axis: 'Machine Gun', value: getPercentage(total, player.weaponKillsMachinegun) });
  data.push({ axis: 'Sword', value: getPercentage(total, player.weaponKillsSword) });
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
  primaryStats(players) {
    const data = [];
    Object.keys(players).forEach(username => {
      data.push(calculatePrimary(players[username]));
    });
    return data;
  },
  secondaryStats(players) {
    const data = [];
    Object.keys(players).forEach(username => {
      data.push(calculateSecondary(players[username]));
    });
    return data;
  },
  heavyStats(players) {
    const data = [];
    Object.keys(players).forEach(username => {
      data.push(calculateHeavy(players[username]));
    });
    return data;
  },
};
