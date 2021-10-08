// Depedencies
const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// EXPRESS
const app = express();

// DOTENV
dotenv.config();

// DATABASE
const dbUri = process.env.DATABASE_URI;
mongoose.connect(dbUri).catch(err => { console.log(err); });

// REST API
const RestApi = require('./RestApi');
RestApi(app);

app.listen(process.env.PORT || 5000, () => {
    console.log("APP STARTED LISTENING on: " + (process.env.PORT || 5000) + ".");
});