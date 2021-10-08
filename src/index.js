// Depedencies
const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

// REST API
const RestApi = require('./RestApi');
RestApi(app);

app.listen(process.env.PORT || 5000, () => {
    console.log("APP STARTED LISTENING on: " + (process.env.PORT || 5000) + ".");
});