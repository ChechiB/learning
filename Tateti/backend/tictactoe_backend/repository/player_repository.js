let helperRedis = require('../helpers/helperRedis');
let redisClient = helperRedis.redisClient;

const { promisify } = require("util");
let {ErrorHandler} = require('../helpers/errorHandler')
const keysAsync = promisify(redisClient.keys).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);
const getAsync = promisify(redisClient.hgetall).bind(redisClient);
const existAsync = promisify(redisClient.exists).bind(redisClient);


const create = async(obj)=>{
    if(!(await existAsync(obj.idPlayer))){
        resulSet = await redisClient.hset(`player${obj.idPlayer}`, 'playerName', obj.playerName)
    }    
    return resulSet;
}

const update = async() =>{

}

const del = async() =>{

}

const get = async() =>{

}

module.exports = {
    create
}