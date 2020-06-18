let helperRedis = require('../helpers/helperRedis');
let redisClient = helperRedis.redisClient;

const { promisify } = require("util");
let {ErrorHandler} = require('../helpers/errorHandler')
const keysAsync = promisify(redisClient.keys).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);
const getAllAsync = promisify(redisClient.hgetall).bind(redisClient);
const existAsync = promisify(redisClient.exists).bind(redisClient);

const save = async(obj)=>{    
    let resulSet = await redisClient.hset(`campaign${obj.idCampaign}`, 'p1Score', obj.p1Score,
       'p2Score', obj.p2Score, 'ties', obj.ties)    
    return resulSet;
}

const update = async() =>{

}

const del = async() =>{

}

const findById = async(id) =>{
    let resulset = await getAllAsync(`campaign${id}`)

    return {campaign: resulset};
}

const findAll = async() =>{

}

module.exports = {
    save,
    findById
}