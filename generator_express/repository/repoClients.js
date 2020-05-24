let helperRedis = require('../repository/helperDB');
let redisClient = helperRedis.redisClient;

const { promisify } = require("util");
const hGetAsync = promisify(redisClient.hget).bind(redisClient);
const keysAsync = promisify(redisClient.keys).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);
const getAsync = promisify(redisClient.hgetall).bind(redisClient);
const existAsync = promisify(redisClient.exists).bind(redisClient);

const saveClient = async(idClient, obj)=>{
    let resulSet = 0;
    /*if client doesn't exist, save it*/
    if(!(await existAsync)){
        resulSet = redisClient.hset(`client${idClient}`, 'name', obj.name, 'lastname', obj.lastname, 'idClient', obj.idClient)
    }    
    return resulSet;
}

const getClient = async (idClient) => {
    if(isNaN(idClient)) return false;
    console.log("idClient", idClient)
    let resulSet =  await getAsync(`client${idClient}`)
    
    return resulSet;
}

const deleteClient = async (idCLient)=>{
    let resulSet = await delAsync(idCLient)
    return resulSet;
}

/*return a integer*/
const putClient = (idClient, obj) =>{ 
    client.hset(`client${idClient}`, 'name', obj.name, 'lastname', obj.lastname)   
}

/*To search "client*constract*" */
const getClients = async () => {
    let resulSet = await keysAsync("client*");
    if(!resulSet.length) return [];

    let clients = [];

    for (let index = 0; index < resulSet.length; index++) {
        const element = resulSet[index];
        
        if(!element.includes("contract")){
            clients.push(
                await getAsync(`${element}`)   
            );
        }
    }

    return clients;
}

const getContracts = async (idClient) => {
    let resulSet = await keysAsync("client*contract*");
    if(!resulSet.length) return [];

    let contractsList = [];

    for (let index = 0; index < resulSet.length; index++) {
        const element = resulSet[index];
        
        contractsList.push({
            title: await hGetAsync( `${element}`, 'title'),
            description: await hGetAsync( `${element}`, 'description'),
            idContract: await hGetAsync( `${element}`, 'idContract')
        });
    
    }

    return contractsList;
}

module.exports = {
    getClients,
    saveClient,
    getClient,
    getContracts,
    deleteClient,
    putClient
}