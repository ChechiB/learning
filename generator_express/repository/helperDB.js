let redis = require('redis');
let redisClient = redis.createClient();

redisClient.on('connect', function() {
    console.log('Redis client connected');
});

redisClient.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

redisClient.set('redis-up-and-running',"REDIS-OK", redis.print)

redisClient.get('redis-up-and-running', function (error, result) {
    if (error) {
        console.log(error);
        throw error;
    }
    console.log('Redis status: ' + result);
});

module.exports = {
    redisClient
}