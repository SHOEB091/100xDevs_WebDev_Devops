const Redis = require("ioredis");

// creating redis instance 
const client = new Redis();

module.exports = client;