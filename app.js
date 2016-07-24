const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const favicon = require('serve-favicon');

const app = express();

app.set('port', (process.env.PORT || 3000));

app.set('view engine', 'jade');

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(favicon(__dirname + 'public/images/traveler.png'));
app.use('/', routes);

app.use(function (req, res, next) {
  res.status(404).send('Sorry can\'t find that!');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(app.get('port'), function () {
  console.log('Destiny Data is running on port', app.get('port'));
});
