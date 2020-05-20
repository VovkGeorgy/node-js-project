
const httpModule = require('http');
const routes = require('./routes');

const server = httpModule.createServer(routes.requestHandler);

server.listen(3000, 'localhost');