const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send('Critter Sponsor API')
});

module.exports = server;