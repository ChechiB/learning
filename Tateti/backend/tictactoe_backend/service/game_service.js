let {ErrorHandler} = require('../helpers/errorHandler')
const game = require('../model/Game');
const game_repository = require('../repository/game_repository');
const base_service = require('../service/base_service');
const player_service = require('../service/player_service');
const player_game_service = require('../service/player_game_service');
const campaign_service = require('../service/campaign_service');


const initGame = async(obj,idCampaign) => {
    let gameDict = game.getGame()
    gameDict.idCampaign = idCampaign
    lastGameId = await base_service.getLastId('gameId')
    gameDict.idGame = parseInt(lastGameId)+1
    
    await game_repository.create(gameDict)
    let playerDict = await player_service.createPlayer(obj)
    playerDict.symbol = ""
    await player_game_service.savePlayerGame(playerDict, gameDict.idGame)

    //Update ids counters
    await base_service.setLastId('gameId')

    return {idGame: gameDict.idGame}
}

const saveMove = async (hash,cellValue,obj)=>{
    console.log("hash",hash,"cellValue",cellValue,"obj",obj);

   let resultCampaign = campaign_service.getCampaign
   
    //Get game
    let lastGameId = resultCampaign.lastGameId
    let game = await game_repository.findById(lastGameId)
    let playerGame = await player_game_service.getPlayerGame(obj.idPlayer,lastGameId)

    if(playerGame){
        let cell = "cell" + cellValue 
        if(game.cell !==""){
            game.cell == playerGame.symbol
            isWinner(game.getCells())
            //Si hay ganador, sumar score
        }
    }

}

function isWinner(cells){
    return checkWinner(cells);
} 

const setNextPlayer = async function(obj, idGame){
    let game = await game_repository.findById(idGame)
    await game_repository.create(obtainWhoIsPlaying(obj,game))
}

const obtainWhoIsPlaying = function(obj,game){
    if (game.nextPlayer === ""){
        if(Math.random() <0.5){
            game.nextPlayer = obj[0].idPlayer
        }else{
            game.nextPlayer = obj[1].idPlayer
        }
    }else if (game.nextPlayer === obj[0].idPlayer){
        game.nextPlayer = obj[1].idPlayer
    }else{
        game.nextPlayer = obj[0].idPlayer
    }

    return game;
}


function checkWinner(cells){
    console.log("Cells",cells)
    let coincidences= false;
    let emptyMatrix = false;

    vertical = determineVerticalLines(cells);
    cross = determineCrooslines(cells);

    //To check tie
    if(containsEmptyCell(cells)){
        emptyMatrix = true;
    }

    if (checkCoincidence(cells)||checkCoincidence(vertical)||checkCoincidence(cross)){
        coincidences = true;
    }

    if(coincidences === true){
        console.log("Winner")
        return true;
    }else if(coincidences === false && emptyMatrix===false){
        console.log("match")
        return false;
    }
    
}

function checkCoincidence(cells){
    for (let i = 0; i < cells.length; i++) {
        horizontalLine = []             
        horizontalLine = cells[i];  
        if (checkHorizontalLine(horizontalLine)){
            return true;
        }        
    }

}
function checkHorizontalLine(horizontalLine){
   
   if(horizontalLine[0] == ""){
       return false;
   } 

   for (let i = 1; i < horizontalLine.length; i++) {
       if(horizontalLine[0]!== horizontalLine[i]){
           return false;
       }
       
   }
      
    return true;
}

function containsEmptyCell(cells){
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            if(cells[i][j] ===""){
                return true;
            }            
        }        
    }   
    return false; 
}

function determineVerticalLines(cells){           
    let verticalLines = []
    for (let i = 0; i < cells.length; i++) {
        determineVerticalLine = []
        for (let j = 0; j < cells[i].length; j++) {
            determineVerticalLine.push(cells[j][i])
        }
        verticalLines.push(determineVerticalLine)
    }
    return verticalLines;
}

function determineCrooslines(cells){
    let principalD = []
    let secondaryD = []

    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            if(i === j){
                principalD.push(cells[i][j]);
            }
            if(i+j === cells.length-1){
                secondaryD.push(cells[i][j]);
            }            
        }        
    }

    crossline = new Array(principalD,secondaryD)
    return crossline;
}

module.exports = {
    initGame,
    saveMove,
    setNextPlayer
}