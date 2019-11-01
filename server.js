const express = require('express');
const helmet = require('helmet');
const server = express();

const projectRouter = require('./data/projectRoute')

server.get('/', (req, res) => {
    res.send(`<h2>Let's get this show on the road!</h2>`)
});

server.use(helmet());
server.use(express.json());

server.use('/api/projects', projectRouter);
module.exports = server;