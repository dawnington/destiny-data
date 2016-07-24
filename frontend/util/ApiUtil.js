const startSpinner = function () {
  document.getElementById('spinner').style.display = 'block';
};

const stopSpinner = function () {
  document.getElementById('spinner').style.display = 'none';
};

const updateStatus = function (status, fail) {
  const statusText = document.getElementById('statusText');
  statusText.innerHTML = status;
  fail ? statusText.style.color = 'red' : statusText.style.color = '';
};

const charactersChecked = {};

const kills = {
  total: 0,
  primary: 0,
  secondary: 0,
  heavy: 0,
  grenade: 0,
  melee: 0,
  superKills: 0,
};

const weaponTypes = {
  AutoRifle: 'primary',
  PulseRifle: 'primary',
  ScoutRifle: 'primary',
  HandCannon: 'primary',
  SideArm: 'secondary',
  Shotgun: 'secondary',
  Sniper: 'secondary',
  Machinegun: 'heavy',
  RocketLauncher: 'heavy',
  Sword: 'heavy',
  Grenade: 'grenade',
  Melee: 'melee',
  Super: 'superKills',
};

const allChecked = function () {
  return Object.keys(charactersChecked).every(key => charactersChecked[key] === true);
};

// [//iPhone
// 						{axis:"Battery Life",value:0.22},
// 						{axis:"Brand",value:0.28},
// 						{axis:"Contract Cost",value:0.29},
// 						{axis:"Design And Quality",value:0.17},
// 						{axis:"Have Internet Connectivity",value:0.22},
// 						{axis:"Large Screen",value:0.02},
// 						{axis:"Price Of Device",value:0.21},
// 						{axis:"To Be A Smartphone",value:0.50}
// 					  ],[//Samsung

const compileData = function () {
  const data = [];
  const totalKills = kills.total;
  Object.keys(kills).forEach(key => {
    if (key !== 'total') {
      const percentage = (kills[key] / totalKills).toFixed(2);
      data.push({ axis: `${key}`, value: percentage });
    }
  });
  return [data];
};

const checkProgress = function () {
  if (allChecked()) {
    stopSpinner();
    updateStatus('');
    const data = compileData();
    RadarChart(data);
    console.log(kills);
  }
};

// const parseResp = function (resp) {
//   let json;
//   try {
//     json = JSON.parse(resp);
//   } catch (e) {
//     stopSpinner();
//     updateStatus('Error parsing results', true);
//   }
// };

const characterCallback = function (json, characterId) {
  const stats = json.Response.allPvP.allTime;
  if (json && stats) {
    console.log(stats);
    Object.keys(stats).forEach(key => {
      const keyCheck = new RegExp('^weaponKills');
      if (key === 'kills') {
        kills.total += stats[key].basic.value;
      } else if (keyCheck.test(key) && weaponTypes[key.slice(11)]) {
        const weapon = key.slice(11);
        kills[weaponTypes[weapon]] += stats[key].basic.value;
      }
    });
    charactersChecked[characterId] = true;
    checkProgress();
  }
};

const accountCallback = function (json) {
  const characters = json.Response.data.characters;
  const membershipId = json.Response.data.membershipId;
  const membershipType = json.Response.data.membershipType;
  if (json && characters) {
    characters.forEach(character => {
      const characterId = character.characterBase.characterId;
      charactersChecked[characterId] = false;
      const characterPath = `/Platform/Destiny/Stats/${membershipType}/${membershipId}/${characterId}/?modes=AllPvP&periodType=AllTime`;
      updateStatus('Fetching activity data...');
      httpGetAsync(characterPath, characterCallback, characterId);
    });
  } else {
    stopSpinner();
    updateStatus('Failed to fetch account data', true);
  }
};

const searchCallback = function (json) {
  if (json && json.Response.length !== 0) {
    const membershipId = json.Response[0].membershipId;
    const membershipType = json.Response[0].membershipType;
    const accountPath = `/Platform/Destiny/${membershipType}/Account/${membershipId}/Summary/`;
    updateStatus('Fetching account data');
    httpGetAsync(accountPath, accountCallback);
  } else {
    stopSpinner();
    updateStatus('User not found');
  }
};

const initialSearch = function () {
  const path = window.location.pathname.slice(1);
  const pathArray = path.split('/');
  const username = decodeURI(pathArray[1]).trim();
  const searchPath = `/Platform/Destiny/SearchDestinyPlayer/${pathArray[0]}/${username}`;
  if (pathArray[0] === 2) {
    document.getElementById('platformSwitch').checked = true;
  }
  const consoles = { 1: 'Xbox', 2: 'Playstation' };
  const platform = consoles[pathArray[0]];

  startSpinner();
  updateStatus(`Searching for ${username} on ${platform}...`);
  httpGetAsync(searchPath, searchCallback);
};

// initialSearch();
function printThings(thing) {
  console.log(thing);
  console.log(`characterCount: ${characterCount}`);
  console.log('stats:');
  console.log(userStats);
}

var characterCount = 0;
var processedCharacters = 0;
var userStats = {
  kills: 0,
  weaponKillsAutoRifle: 0,
  weaponKillsPulseRifle: 0,
  weaponKillsScoutRifle: 0,
  weaponKillsHandCannon: 0,
  weaponKillsSideArm: 0,
  weaponKillsFusionRifle: 0,
  weaponKillsShotgun: 0,
  weaponKillsSniper: 0,
  weaponKillsMachinegun: 0,
  weaponKillsRocketLauncher: 0,
  weaponKillsSword: 0,
  weaponKillsSuper: 0,
  weaponKillsGrenade: 0,
  weaponKillsMelee: 0,
};

function resetCounters() {
  characterCount = 0;
  processedCharacters = 0;
  userStats = {};
}

const httpGetAsync = function (url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const json = JSON.parse(xhr.responseText);
      return callback(json);
    } else if (xhr.readyState === 4) {
      console.log('Something went wrong');
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
  return xhr;
};

function fetchCharacterActivity(json) {
  characterCount = json.Response.data.characters.length;
  const characters = json.Response.data.characters;
  const membershipId = json.Response.data.membershipId;
  const membershipType = json.Response.data.membershipType;
  if (json && characters) {
    characters.forEach(character => {
      const characterId = character.characterBase.characterId;
      const characterPath = `/Platform/Destiny/Stats/${membershipType}/${membershipId}/${characterId}/?modes=AllPvP&periodType=AllTime`;
      httpGetAsync(characterPath, addCharacterStats);
    });
  }
}

// function fetchCharacterIds(json) {
//   const membershipId = json.Response[0].membershipId;
//   const membershipType = json.Response[0].membershipType;
//   const accountPath = `/Platform/Destiny/${membershipType}/Account/${membershipId}/Summary/`;
//   return httpGetAsync(accountPath, fetchCharacterActivity);
// }

module.exports = {
  fetchCharacterActivity(json) {
    characterCount = json.Response.data.characters.length;
    const characters = json.Response.data.characters;
    const membershipId = json.Response.data.membershipId;
    const membershipType = json.Response.data.membershipType;
    if (json && characters) {
      characters.forEach(character => {
        const characterId = character.characterBase.characterId;
        const characterPath = `/Platform/Destiny/Stats/${membershipType}/${membershipId}/${characterId}/?modes=AllPvP&periodType=AllTime`;
        httpGetAsync(characterPath);
      });
    }
  },

  fetchCharacterIds(json) {
    const membershipId = json.Response[0].membershipId;
    const membershipType = json.Response[0].membershipType;
    const accountPath = `/Platform/Destiny/${membershipType}/Account/${membershipId}/Summary/`;
    return httpGetAsync(accountPath, fetchCharacterActivity);
  },
  returnThing(thing) {
    return thing;
  },
  fetchUserStats(username, platform) {
    resetCounters();
    userStats.username = username;
    const searchPath = `/Platform/Destiny/SearchDestinyPlayer/${platform}/${username}`;
    const result = httpGetAsync(searchPath);

  },
};
