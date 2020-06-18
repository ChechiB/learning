let repoPlayerGame = require('../repository/player_game_repository');
const playerGame = require('../model/PlayerGame')
const base_service = require('../service/base_service');
const player_game_repository = require('../repository/player_game_repository');

const savePlayerGame = async(idPlayer, idCampaign)=>{
    //Generate symbol
    let symbol = generate_symbol()

    //Create intermediate 
    lastPGId = await base_service.getLastId('playerGameId')
    actualPGId = parseInt(lastPGId)+1
    playerGame.setPlayerGame(idPlayer, idCampaign, symbol)

    //Save PlayerGame
    repoPlayerGame.create(playerGame.getPlayerGame())

    await base_service.setLastId(lastPGId)
}

const getPlayerGameList = async(id)=>{
    return await player_game_repository.findAllByGame(id)
}

const generate_symbol = function(){
    if(Math.random() <0.5){
        return "X"
    }
    return "0"
}

module.exports = {
    savePlayerGame,
    getPlayerGameList,
    
}