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

const httpGetAsync = function (url, callback, variables) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // eventually JSON.parse results up here
      callback(xhr.responseText, variables);
    } else if (xhr.readyState === 4) {
      stopSpinner();
      updateStatus('Something went wrong', true);
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
};

const characterCallback = function (resp, variables) {
  console.log('character callback started')
  let json;
  try {
    json = JSON.parse(resp);
  } catch (e) {
    console.log(e);
    stopSpinner();
    updateStatus('Error parsing character results', true);
  }
  const activities = json.Response.data.activites;
  if (json && activities) {
    console.log(activities);
  }
};

const accountCallback = function (resp) {
  console.log('account callback started')
  let json;
  try {
    json = JSON.parse(resp);
  } catch (e) {
    console.log(e);
    stopSpinner();
    updateStatus('Error parsing account results', true);
  }
  const characters = json.Response.data.characters;
  const membershipId = json.Response.data.membershipId;
  const membershipType = json.Response.data.membershipType;
  if (json && characters) {
    characters.forEach(character => {
      const characterId = character.characterBase.characterId;
      charactersChecked[characterId] = false;
      const characterPath = `/Platform/Destiny/Stats/${membershipType}/${membershipId}/${characterId}/?mode=AllPvP&periodType=AllTime`;
      const variables = {
        'basePath': characterPath,
        'page': 0,
        'characterId': characterId,
      };
      updateStatus('Fetching activity data...');
      httpGetAsync(characterPath, characterCallback, variables);
    });
  } else {
    stopSpinner();
    updateStatus('Failed to fetch account data', true);
  }
};

const searchCallback = function (resp) {
  console.log('Search callback started');
  let json;
  try {
    json = JSON.parse(resp);
  } catch (e) {
    console.log(e);
    stopSpinner();
    updateStatus('Errors parsing search results for user');
  }
  const membershipId = json.Response[0].membershipId;
  const membershipType = json.Response[0].membershipType;
  if (json && membershipId) {
    const accountPath = `/Platform/Destiny/${membershipType}/Account/${membershipId}/Summary/`;
    updateStatus('Fetching account data');
    httpGetAsync(accountPath, accountCallback);
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

initialSearch();
