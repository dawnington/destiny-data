import Dispatcher from '../dispatcher/Dispatcher';
import BungieAPIUtil from '../util/BungieAPIUtil';
import PlayerConstants from '../constants/PlayerConstants';

module.exports = {
  addPlayer(username, platform) {
    const player = {};
    const searchResult = BungieAPIUtil.searchForPlayer(username, platform);
    if (this.checkResults(searchResult)) {
      const characterResults = BungieAPIUtil.fetchCharacterIds(searchResult);
      const characterStats = BungieAPIUtil.fetchCharacterActivity(characterResults);
      player[username] = characterStats;
      player[username].characterCount = (JSON.parse(characterResults.responseText)).Response.data.characters.length;
      Dispatcher.dispatch({
        actionType: PlayerConstants.ADD_PLAYER,
        player,
      });
    } else {
      alert('Player not found.');
    }
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
