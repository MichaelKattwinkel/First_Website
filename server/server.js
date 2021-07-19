const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

const port = 7000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

MongoClient.connect(db.url, { useUnifiedTopology: true }, (err, database) => {
  if (err) {
    return console.log(err);
  }
  const bwDatabase = database.db('BibleWebsite');
  require('./routes/index')(app, bwDatabase);
});

app.listen(port, () => { console.log(`Live on ${port}`); });
