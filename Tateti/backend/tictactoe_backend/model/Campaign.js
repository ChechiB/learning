let campaign = {
    p1Score: null,
    p2Score: null,
    ties: null,
    nextPlayer: null,
    lastBoard: null,
    idCampaign: null
}

let initCampaign= function(idCampaign){
    campaign.p1Score = 0
    campaign.p2Score = 0
    campaign.ties = 0
    campaign.idCampaign = idCampaign    
}

let getCampaign = function(obj){
    return campaign
}

module.exports = {
    initCampaign,
    getCampaign
}