let game = {
    state: state,
    cell0: cell0,
    cell1: cell1,
    cell2: cell2,
    cell3: cell3,
    cell4: cell4,
    cell5: cell5,
    cell6: cell6,
    cell7: cell7,
    cell8: cell8,
}

let set_game = function(obj){
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

let get_game = function(){
    return this.game
}
