import StatsUtil from './StatsUtil';

module.exports = {
  bungieRequest(url) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // const json = JSON.parse(xhr.responseText);
        // console.log(json);
      } else if (xhr.readyState === 4) {
        console.log('Something went wrong');
      }
    };
    xhr.open('GET', url, false);
    xhr.send();
    return xhr;
  },
  searchForPlayer(username, platform) {
    const searchPath = `/Platform/Destiny/SearchDestinyPlayer/${platform}/${username}`;
    return this.bungieRequest(searchPath);
  },
  fetchCharacterIds(xhr) {
    const json = JSON.parse(xhr.responseText);
    const membershipId = json.Response[0].membershipId;
    const membershipType = json.Response[0].membershipType;
    const accountPath = `/Platform/Destiny/${membershipType}/Account/${membershipId}/Summary/`;
    return this.bungieRequest(accountPath);
  },
  fetchCharacterActivity(xhr) {
    const json = JSON.parse(xhr.responseText);
    const characters = json.Response.data.characters;
    const membershipId = json.Response.data.membershipId;
    const membershipType = json.Response.data.membershipType;
    let totalStats = {};
    if (json && characters) {
      characters.forEach(character => {
        const characterId = character.characterBase.characterId;
        const characterPath = `/Platform/Destiny/Stats/${membershipType}/${membershipId}/${characterId}/?modes=AllPvP&periodType=AllTime`;
        const result = this.bungieRequest(characterPath);
        const stats = (JSON.parse(result.responseText)).Response.allPvP.allTime;
        totalStats = StatsUtil.addStats(totalStats, stats);
      });
    }
    return totalStats;
  },
};
