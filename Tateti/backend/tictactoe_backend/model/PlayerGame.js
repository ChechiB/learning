playerGame = {
    idPlayer : null,
    idCampaign: null,
    symbol: null
}

let setPlayerGame = function(idPlayer,idCampaign, symbol){
    playerGame.idPlayer = idPlayer,
    playerGame.idCampaign = idCampaign
    playerGame.symbol = symbol
}

let getPlayerGame = function(){
    return playerGame
}

module.exports = {
    setPlayerGame,
    getPlayerGame
}