const base_service = require('./base_service')
const campaign_repository = require('../repository/campaign_repository')


const getCampaign = async(hash)=>{
    //Search campaign
    console.log("getCampaign","hash",hash);
    
    let idCampaign = await base_service.getByHash(hash)
    //Search the game associated with the campaign
    let resultCampaign = await campaign_repository.findById(idCampaign)
    
    return resultCampaign
}

module.exports = {
    getCampaign
}

