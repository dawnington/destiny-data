import Dispatcher from '../dispatcher/Dispatcher';
import ErrorConstants from '../constants/ErrorConstants';
import PlayerConstants from '../constants/PlayerConstants';
import StatsUtil from './StatsUtil';

let player = {};
let totalStats = {};
let username = '';
let characterCount = 0;
let charactersChecked = 0;

function bungieRequest(url, callback, variables) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const json = JSON.parse(xhr.responseText);
      callback(json, variables);
    } else if (xhr.readyState === 4) {
      console.log('Something went wrong');
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}

function addCharacterStats(json) {
  const stats = json.Response.allPvP.allTime;
  if (stats) { totalStats = StatsUtil.addStats(totalStats, stats); }
  charactersChecked += 1;
  if (charactersChecked === characterCount) {
    player[username] = totalStats;
    player[username].characterCount = characterCount;
    Dispatcher.dispatch({
      actionType: PlayerConstants.ADD_PLAYER,
      player,
    });
  }
}

function fetchCharacterActivity(json) {
  characterCount = json.Response.data.characters.length;
  const characters = json.Response.data.characters;
  const membershipId = json.Response.data.membershipId;
  const membershipType = json.Response.data.membershipType;
  if (json && characters) {
    characters.forEach(character => {
      const characterId = character.characterBase.characterId;
      const characterPath = `/Platform/Destiny/Stats/${membershipType}/${membershipId}/${characterId}/?modes=AllPvP&periodType=AllTime`;
      bungieRequest(characterPath, addCharacterStats);
    });
  }
}

function fetchCharacterIds(json) {
  if (json.Response.length === 0) {
    Dispatcher.dispatch({
      actionType: ErrorConstants.PLAYER_NOT_FOUND,
    });
  } else {
    const membershipId = json.Response[0].membershipId;
    const membershipType = json.Response[0].membershipType;
    const accountPath = `/Platform/Destiny/${membershipType}/Account/${membershipId}/Summary/`;
    bungieRequest(accountPath, fetchCharacterActivity);
  }
}

function resetData(gamertag) {
  player = {};
  totalStats = {};
  charactersChecked = 0;
  username = gamertag;
}

module.exports = {
  searchForPlayer(gamertag, platform) {
    resetData(gamertag);
    const searchPath = `/Platform/Destiny/SearchDestinyPlayer/${platform}/${username}`;
    bungieRequest(searchPath, fetchCharacterIds);
  },
};
