import Dispatcher from '../dispatcher/Dispatcher';
import BungieAPIUtil from '../util/BungieAPIUtil';
import PlayerConstants from '../constants/PlayerConstants';

module.exports = {
  addPlayer(username, platform) {
    BungieAPIUtil.searchForPlayer(username, platform);
  },
  removePlayer(username) {
    Dispatcher.dispatch({
      actionType: PlayerConstants.REMOVE_PLAYER,
      username,
    });
  },
  clearPlayers() {
    Dispatcher.dispatch({
      actionType: PlayerConstants.CLEAR_PLAYERS,
    });
  },
  checkResults(resp) {
    const json = JSON.parse(resp.responseText);
    return (json.Response.length > 0);
  },
};
