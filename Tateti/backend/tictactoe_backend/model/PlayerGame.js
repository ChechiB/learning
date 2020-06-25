playerGame = {
    idPlayer : "",
    idGame: "",
    symbol: ""
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