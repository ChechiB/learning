//Import campaign repository
const repo_campaign = require('../repository/campaign_repository')
const general_helper = require('../helpers/generalHelper')

let generate_hash = function(board_name){
   return hgeneral_helper.hash(board_name)
}

let create_player = function(){

}

let generate_symbol = function(){

}

let calculate_score = function(){

}

const joinCampaign = async() => {

}


function initPlayers(nameP1, nameP2){
    if(Math.random() <0.5){
        playerOne = new Player(nameP1,"X",true);
        playerTwo = new Player(nameP2, "O",false);
        console.log("player 1 comienza")
    }else{
        playerOne = new Player(nameP1,"O",false);
        playerTwo = new Player(nameP2, "X",true)
        console.log("player 2 comienza")
    }

    players = [playerOne,playerTwo];

    return players;
}

function updatePlayersStatus(){
    if(playerOne.isPlaying === true){
        playerOne.isPlaying = false;
        playerTwo.isPlaying = true;
    }else{
        playerOne.isPlaying = true;
        playerTwo.isPlaying = false;
    }
}