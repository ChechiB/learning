let game = {
    state: true,
    cell0: "",
    cell1: "",
    cell2: "",
    cell3: "",
    cell4: "",
    cell5: "",
    cell6: "",
    cell7: "",
    cell8: "",
}

let setGame = function(obj){
    game.state = obj.state
    game.cell0 = obj.cell0
    game.cell1 = obj.cell1
    game.cell2 = obj.cell2
    game.cell3 = obj.cell3
    game.cell4 = obj.cell4
    game.cell5 = obj.cell5
    game.cell6 = obj.cell6
    game.cell7 = obj.cell7
    game.cell8 = obj.cell8
}

let getGame = function(){
    return game
}

module.exports = {
    setGame,
    getGame
}
