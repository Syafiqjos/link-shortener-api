// Depedencies
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// REST API
const RestApi = require('./RestApi');
RestApi(app);

app.listen(5000, () => {
    console.log("APP STARTED LISTENING.")
});