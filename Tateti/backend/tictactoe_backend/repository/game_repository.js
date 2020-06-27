let helperRedis = require('../helpers/helperRedis');
let redisClient = helperRedis.redisClient;

const { promisify } = require("util");
let {ErrorHandler} = require('../helpers/errorHandler')
const keysAsync = promisify(redisClient.keys).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);
const getAsync = promisify(redisClient.hgetall).bind(redisClient);
const existAsync = promisify(redisClient.exists).bind(redisClient);
const {hash} = require('../helpers/generalHelper')


const create = async(obj)=>{
    console.log("obj",obj)
    return await redisClient.hset(`game${obj.idGame}`, 'status', obj.status,'nextPlayer',obj.nextPlayer,
        'cell0', obj.cell0,
        'cell1', obj.cell1,
        'cell2', obj.cell2,
        'cell3', obj.cell3,
        'cell4', obj.cell4,
        'cell5', obj.cell5,
        'cell6', obj.cell6,
        'cell7', obj.cell7,
        'cell8', obj.cell8)   
}

const findById = async(idGame) =>{
    return await getAsync(`game${idGame}`)
}

const findKey = async(idGame)=>{
    return await keysAsync(`game${idGame}`)
}

module.exports = {
    create,
    findById,
    findKey
}