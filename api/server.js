const express = require('express');

const authRouter = require('../auth/authRouter.js')

const server = express();



server.get('/', (req, res) => {
    res.send('Critter Sponsor API')
});

server.use('/auth', authRouter)

module.exports = server;