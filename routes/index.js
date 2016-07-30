const express = require('express');
const router = express.Router();
const request = require('request');
const fs = require('fs');

router.get('/', function (req, res) {
  res.render('index');
});

// Courtesy of https://github.com/DestinyTrialsReport/DestinyTrialsReport/blob/05c113f8d39dee2a02461902f0c9e1c287cad3aa/server.js#L37
router.get('/Platform/*?', function (req, res) {
  res.setTimeout(25000);
  var options = {
    url: 'https://www.bungie.net/' + req.originalUrl,
    headers: { 'X-API-Key': process.env.BUNGIE_API_KEY },
  };
  try {
    request(options, function (error, response, body) {
      if (!error) {
        console.log(body);
        res.send(body);
      } else {
        res.send(error);
      }
    });
  } catch (e) {}
});

module.exports = router;
