let repoPlayer = require('../repository/player_repository');
let base_service = require('../service/base_service')
let player = require('../model/Player')

const createPlayer = async(obj)=>{
    lastPlayerId = await base_service.getLastId('playerId')
    actualPlayerID = parseInt(lastPlayerId)+1
    player.setPlayer(obj.playerName, actualPlayerID)
    
    let result = await repoPlayer.create(player.getPlayer())    

    if(result !== 0){
        return {idPlayer:await base_service.setLastId('playerId')}
    }
    return {}
}

const getPlayerById = async(idPlayer)=>{
    return await repoPlayer.findById(idPlayer)
}


module.exports = {
    createPlayer,
    getPlayerById
}