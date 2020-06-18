//Import campaign repository
const general_helper = require('../helpers/generalHelper')
const player_service = require('../service/player_service')
const player_game_service = require('../service/player_game_service')
const campaign = require('../model/Campaign')
const base_service = require('../service/base_service')
const campaign_repository = require('../repository/campaign_repository')

const initCampaign = async(obj)=>{
    //Generate Hash
   
    let hash = general_helper.generateHash(obj.playerName)
    
    //Create campaign
    lastcampaignId = await base_service.getLastId('campaignId')
    actualCampaignId = parseInt(lastcampaignId)+1
    campaign.initCampaign(actualCampaignId)

    //Save 
    let playerDict = await player_service.createPlayer(obj)
    await campaign_repository.save(campaign.getCampaign())
    await player_game_service.savePlayerGame(playerDict.idPlayer, actualCampaignId)
    await base_service.saveHash(hash, actualCampaignId)
    //Update ids counters
    await base_service.setLastId(lastcampaignId)

    return {hash: hash}
}


const joinCampaign = async(hash,obj) =>{
    //Search campaign
    let idCampaign = await base_service.getByHash(hash)
    let campaign = await campaign_repository.findById(idCampaign)
    console.log('campaign',campaign)

    //Create player 2
    let playerDict = await player_service.createPlayer(obj)
    await player_game_service.savePlayerGame(playerDict.idPlayer, campaign.idCampaign)
    await base_service.saveHash(hash, campaign.idCampaign)
    console.log('campaign.idCampaign',campaign.idCampaign)
    //Create board    
}



let calculateScore = function(){

}


module.exports = {
    initCampaign,
    joinCampaign
}

