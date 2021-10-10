// Depedencies
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const redis = require('redis');

// EXPRESS
const app = express();
app.use(bodyParser.json());

// DOTENV
dotenv.config();

// DATABASE
const dbUri = process.env.DATABASE_URI;
mongoose.connect(dbUri).catch(err => { console.log(err); });

// CACHE
const cacheUri = process.env.REDIS_URI;
const cache = redis.createClient(cacheUri);

cache.on('error', function(error) {
    console.log('redis connection failed on: ' + cacheUri);
});

// REST API
const RestApi = require('./RestApi');
RestApi(app);

app.listen(process.env.PORT || 5000, () => {
    console.log("APP STARTED LISTENING on: " + (process.env.PORT || 5000) + ".");
});

cache.quit();