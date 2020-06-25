//Import campaign repository
const general_helper = require('../helpers/generalHelper')
const player_service = require('../service/player_service')
const player_game_service = require('../service/player_game_service')
const campaign = require('../model/Campaign')
const base_service = require('../service/base_service')
const campaign_repository = require('../repository/campaign_repository')
const game_service = require('../service/game_service')

const initCampaign = async(obj)=>{
    //Generate Hash   
    let hash = general_helper.generateHash(obj.playerName)  
    //Create campaign
    lastcampaignId = await base_service.getLastId('campaignId')
    actualCampaignId = parseInt(lastcampaignId)+1
    let lstId = await game_service.initGame(obj, actualCampaignId)
    campaign.initCampaign(actualCampaignId, lstId.idGame)

    //Save 
    await campaign_repository.save(campaign.getCampaign())    
    await base_service.saveHash(hash, actualCampaignId)    
    //Update ids counters
    await base_service.setLastId('campaignId')

    return {lastcampaignId,
        hash: hash}
}

//Validar si el jugador pertenece a la campaña a ala que intenta ingresar
const joinCampaign = async(hash,obj) =>{
    let resultCampaign = await getCampaign(hash)
    let lastGameId = resultCampaign.lastGameId    
    let playerOne = {}
    //Check amount of players
    let playerGameList = await player_game_service.getKeys(lastGameId)
        if(playerGameList.length >2){
        console.log("No se permiten mas de dos jugadores")
    }else{
        //Set symbol
        let patt1 = /[0-9]+/g;
        playerOne.idPlayer = playerGameList[0].toString().match(patt1)[0];
        let playerTwo = await player_service.createPlayer(obj)
        let players = player_game_service.generate_symbol(playerOne, playerTwo)
        let playerGameTwoId = await player_game_service.savePlayerGame(playerTwo, lastGameId)
        //Update playerGame 
        await player_game_service.savePlayerGame(players[0],lastGameId)
        await game_service.setNextPlayer(players,lastGameId)
        return {idCampaign: resultCampaign.idCampaign,
            hash: hash}
    }
}

const getCampaign = async(hash)=>{
    //Search campaign
    let idCampaign = await base_service.getByHash(hash)
    //Search the game associated with the campaign
    let resultCampaign = await campaign_repository.findById(idCampaign)
    
    return resultCampaign
}

let calculateScore = function(){

}


module.exports = {
    initCampaign,
    joinCampaign,
    getCampaign
}

