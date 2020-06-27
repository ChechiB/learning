let helperRedis = require('../helpers/helperRedis');
let redisClient = helperRedis.redisClient;
let base_service = require('../service/base_service')

const { promisify } = require("util");
let {ErrorHandler} = require('../helpers/errorHandler')
const keysAsync = promisify(redisClient.keys).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);
const getAsync = promisify(redisClient.hgetall).bind(redisClient);
const existAsync = promisify(redisClient.exists).bind(redisClient);


const create = async(obj)=>{
    return await redisClient.hset(`player${obj.idPlayer}game${obj.idGame}`, 'symbol', obj.symbol)
}

const findAllByGame = async(idGame)=>{
    let resulSet = await keysAsync(`player*game${idGame}`)
    if(!resulSet.length) return [];

    let playerGameList = [];

    for (let index = 0; index < resulSet.length; index++) {
        const element = resulSet[index];

        playerGameList.push(
            await getAsync(`${element}`)   
        );    
    }
    return playerGameList;
}

const findKeyByGame = async(idGame)=>{
    return await keysAsync(`player*game${idGame}`)
}

const findById = async(idPlayer,idGame)=>{
    return await getAsync(`player${idPlayer}game${idGame}`)
}

module.exports = {
    create,
    findAllByGame,
    findKeyByGame,
    findById
}