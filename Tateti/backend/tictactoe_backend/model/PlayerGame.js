playerGame = {
    idPlayer : null,
    idGame: null,
    symbol: null
}

let setPlayerGame = function(idPlayer,idGame, symbol){
    playerGame.idPlayer = idPlayer,
    playerGame.idGame = idGame
    playerGame.symbol = symbol
}

let getPlayerGame = function(){
    return playerGame
}

module.exports = {
    setPlayerGame,
    getPlayerGame
}