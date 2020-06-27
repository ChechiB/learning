let repoPlayer = require('../repository/player_repository');
let base_service = require('../service/base_service')
let playerModel = require('../model/Player')

const createPlayer = async(obj)=>{
    lastPlayerId = await base_service.getLastId('playerId')
    actualPlayerID = parseInt(lastPlayerId)+1
    playerModel.setPlayer(obj.playerName, actualPlayerID)
    
    let result = await repoPlayer.create(playerModel.getPlayer())    

    if(result !== 0){
        return {idPlayer:await base_service.setLastId('playerId')}
    }
    return {}
}

const getPlayerById = async(idPlayer)=>{
    let resultSet =  await repoPlayer.findById(idPlayer)
    resultSet.idPlayer = idPlayer
    return resultSet
}


module.exports = {
    createPlayer,
    getPlayerById
}