require('dotenv').config();
const path = require('path');
const express = require('express');

// require your server and launch it
const server = require('./api/server');

const port = process.env.PORT;

server.use(express.static(path.join(__dirname, 'client/build')));

server.use('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
})

server.listen( port, () => {
  console.log(`Server running on port ${port}`);
});
