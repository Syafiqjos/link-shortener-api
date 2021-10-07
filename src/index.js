const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.listen(5000, () => {
    console.log("APP STARTED LISTENING.")
});