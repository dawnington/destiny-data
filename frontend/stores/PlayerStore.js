import Dispatcher from '../dispatcher/Dispatcher';
import { Store } from 'flux/utils';
import PlayerConstants from '../constants/PlayerConstants';

let _players = {};
let currentFilter = 'overall';

const PlayerStore = new Store(Dispatcher);

function clearPlayers() {
  _players = {};
  PlayerStore.__emitChange();
}

function addPlayer(player) {
  Object.assign(_players, player);
  PlayerStore.__emitChange();
}

function removePlayer(username) {
  delete _players[username];
  PlayerStore.__emitChange();
}

function changeFilter(filter) {
  currentFilter = filter;
  PlayerStore.__emitChange();
}

PlayerStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case PlayerConstants.CLEAR_PLAYERS:
      clearPlayers();
      break;
    case PlayerConstants.ADD_PLAYER:
      addPlayer(payload.player);
      break;
    case PlayerConstants.REMOVE_PLAYER:
      removePlayer(payload.username);
      break;
    case 'CHANGE_FILTER':
      changeFilter(payload.filter);
      break;
    default:
      break;
  }
};

PlayerStore.all = function () {
  return _players;
};

PlayerStore.count = function () {
  return (Object.keys(_players)).length;
};

PlayerStore.filter = function () {
  return currentFilter;
};

export default PlayerStore;
