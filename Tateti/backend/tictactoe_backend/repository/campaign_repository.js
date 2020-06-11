let helperRedis = require('../helpers/helperRedis');
let redisClient = helperRedis.redisClient;

const { promisify } = require("util");
let {ErrorHandler} = require('../helpers/errorHandler')
const keysAsync = promisify(redisClient.keys).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);
const getAsync = promisify(redisClient.hgetall).bind(redisClient);
const existAsync = promisify(redisClient.exists).bind(redisClient);

const create = async(obj)=>{
    if(!(await existAsync(obj.idCampaing))){
        resulSet = await redisClient.hset(`campaign${obj.idCampaing}`, 'hash', obj.hash, 'p1_name', obj.p1_name, 'p2_name', obj.p2_name,
        'p1_symbol', obj.p1_symbol, 'p2_symbol', obj.p2_symbol, 'p1_score', obj.p1_score,'p2_score', obj.p2_score,
        'ties', obj.ties,'id_campaign', obj.id_campaign)
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