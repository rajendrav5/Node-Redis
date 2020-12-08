const redis = require('redis');
// eslint-disable-next-line no-undef
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);
client.on("connect", () => {
    console.log(`Redis client establisehd succesfully ${client}`)
});
client.on("error", (err) => {
    console.log(`Redis client failed with an error ${err}`);
});
client.on('monitor', () => {
    console.log("Monitoring cache from redis");
});

module.exports = client;