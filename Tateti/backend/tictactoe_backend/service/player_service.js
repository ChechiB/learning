let repoPlayer = require('../repository/player_repository');
let base_service = require('../service/base_service')
let player = require('../model/Player')

const createPlayer = async(obj)=>{
    lastPlayerId = await base_service.getLastId('playerId')
    console.log('lastPlayerId',lastPlayerId)
    actualPlayerID = parseInt(lastPlayerId)+1
    console.log('actualPlayerID',actualPlayerID)
    player.setPlayer(obj.playerName, actualPlayerID)
    
    repoPlayer.create(player.getPlayer())
    await base_service.setLastId('playerId')

    return player.getPlayer()
}

module.exports = {
    createPlayer
}