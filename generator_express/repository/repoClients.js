let helperRedis = require('../repository/helperDB');
let redisClient = helperRedis.redisClient;

const { promisify } = require("util");
const keysAsync = promisify(redisClient.keys).bind(redisClient);
const delAsync = promisify(redisClient.del).bind(redisClient);
const getAsync = promisify(redisClient.hgetall).bind(redisClient);
const existAsync = promisify(redisClient.exists).bind(redisClient);


const saveClient = async(obj)=>{
    let resulSet = 0;
    /*if client doesn't exist, save it*/
    if (validateJson(obj)){
        throw new ErrorHandler(400,"Wrong Json structure")
    }

    if(!(await existAsync(obj.idClient))){
        resulSet = await redisClient.hset(`client${obj.idClient}`, 'name', obj.name, 'lastname', obj.lastname, 'idClient', obj.idClient)
    }    
    return resulSet;
}

const getClient = async (idClient) => {
    if(isNaN(idClient)) return false;
   
    let resulSet =  await getAsync(`client${idClient}`)
    if (!resulSet.length) return [];

    return {client: resulSet};
}

const deleteClient = async (idClient)=>{
    let resulSet = 0;

    if(!(await existAsync(obj.idClient))){
        redisClient.multi(await delAsync(`client${idClient}`),await delAsync(`client${idClient}contract${idContract}`)
    }
    
    
    return resulSet;
}

/*return a integer*/
const updateClient = async (idClient, obj) =>{ 
//No va el ID
    validateJson(obj)
    let resulSet = await client.hset(`client${idClient}`, obj)   
    return resulSet;
}

/*To search all clients "client*constract*" */
const getClients = async () => {
    let resulSet = await keysAsync("client*");
    if(!resulSet.length) return [];

    let clientsList = [];

    for (let index = 0; index < resulSet.length; index++) {
        const element = resulSet[index];
        
        if(!element.includes("contract")){
            clientsList.push(
                await getAsync(`${element}`)   
            );
            console.log("clientList", clientsList)
        }
    }

    return {clients: clientsList};
}

const getContract = async (idClient, idContract)=>{
    let resulSet = await keysAsync(`client${idClient}contract${idContract}`)
    if(!resulSet.length) return [];

    let client = await getAsync(`client${idClient}`);
    client["contract"] = await getAsync(`client${idClient}contract${idContract}`)
    
    return {
        client: client
    };
}

const getClientContracts = async(idClient)=>{
    let resulSet = await keysAsync(`client${idClient}contract*`)
    if(!resulSet.length) return [];

    let contractsList= [];
    for (let index = 0; index < resulSet.length; index++) {
        const element = resulSet[index];
        contractsList.push(
            await getAsync(`${element}`)             
        );
    }   
    
    let client = await getAsync(`client${idClient}`);
    client["contracts"] = contractsList;

    return {
        client: await getAsync(`client${idClient}`),
    };
}

const getContracts = async () => {
    let resulSet = await keysAsync("client*contract*");
    if(!resulSet.length) return [];
    
    let contractsList = [];

    for (let index = 0; index < resulSet.length; index++) {
        const element = resulSet[index];

        contractsList.push(
            await getAsync(`${element}`)   
        );    
    }

    return contractsList;
}

const saveContract = async (idClient,obj) =>{
    let existtmp = 0;
    let resulSet = await keysAsync(`client${idClient}contract${obj.idContract}`);
    if(!resulSet.length) return [];
    
    if(!(await existAsync(idClient))){
        existtmp = redisClient.hset(`client${idClient}contract${obj.idContract}`, 'idContract', obj.idContract, 'description', obj.description)
    }

    return existtmp;
}

const updateContract = (idClient,idContract,obj)=>{}

const deleteContract = 

const validateJson = (obj)=>{
    let clientKeys = ['name','lastname','idClient']
    let keysDict = Object.keys(obj)

    if (clientKeys.length !== keysDict.length){
        return 0;
    }

    for (let index = 0; index < clientKeys.length; index++) {
        if(keysDict[i] !== clientKeys[i] || !keysDict[i].length){
            return 0;
        }
        
    }
}


module.exports = {
    getClients,
    saveClient,
    getClient,
    getContracts,
    deleteClient,
    updateClient,
    getClientContracts,
    getContract,
    saveContract
}