let campaign = {
    p1Score: "",
    p2Score: "",
    ties: "",
    nextPlayer: "",
    lastGameId: "",
    idCampaign: ""
}

let initCampaign= function(idCampaign,lastGameId){
    campaign.p1Score = 0
    campaign.p2Score = 0
    campaign.ties = 0
    campaign.idCampaign = idCampaign   
    campaign.lastGameId = lastGameId 
}

let getCampaign = function(obj){
    return campaign
}

module.exports = {
    initCampaign,
    getCampaign
}