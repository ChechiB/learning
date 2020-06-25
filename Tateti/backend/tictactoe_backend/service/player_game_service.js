let repoPlayerGame = require('../repository/player_game_repository');
const playerGame = require('../model/PlayerGame');
const base_service = require('../service/base_service');
const player_game_repository = require('../repository/player_game_repository');

const savePlayerGame = async(player, idGame)=>{
    //Generate symbol
    playerGame.setPlayerGame(player.idPlayer, idGame, player.symbol)
    //Save PlayerGame
    let resultSet = await repoPlayerGame.create(playerGame.getPlayerGame())

    if(resultSet!==0){
        return {idPlayerGame: await base_service.setLastId(idGame)}
    }
    return {}

}

const getPlayerGameList = async(id)=>{
    return await player_game_repository.findAllByGame(id)
}

const generate_symbol = function(player1game, player2game){
    if(Math.random() <0.5){
        player1game.symbol = "X"
        player2game.symbol = "0"
    }else{
        player1game.symbol = "0"
        player2game.symbol = "X"
    }

    list = [player1game,player2game]
    return list;
}

const getKeys = async(idGame)=>{
    return await player_game_repository.findKeyByGame(idGame)
}

module.exports = {
    savePlayerGame,
    getPlayerGameList,
    generate_symbol,
    getKeys
}