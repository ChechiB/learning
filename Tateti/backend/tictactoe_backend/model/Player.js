player = {
    playerName: null,
    idPlayer : null
}

let setPlayer = function(playerName, idPlayer){
    player.playerName = playerName
    player.idPlayer = idPlayer
}


let getPlayer = function(){
    return player 
}

module.exports = {
    setPlayer,
    getPlayer
}