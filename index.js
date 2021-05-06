require('dotenv').config();

// require your server and launch it
const server = require('./api/server');

const port = process.env.PORT;

server.listen( port, () => {
  console.log(`Server running on port ${port}`);
});
