const { promisify } = require("util");
let {ErrorHandler} = require('../helpers/errorHandler')
const {hash} = require('../helpers/generalHelper')
const game = require('../model/Game')
const game_repository = require('../repository/game_repository')
const base_service = require('../service/base_service')
const player_service = require('../service/player_service')
const player_game_service = require('../service/player_game_service')

const initGame = async(obj,idCampaign) => {
    let gameDict = game.getGame()
    gameDict.idCampaign = idCampaign
    lastGameId = await base_service.getLastId('gameId')
    gameDict.idGame = parseInt(lastGameId)+1
    
    await game_repository.create(gameDict)
    let playerDict = await player_service.createPlayer(obj)
    await player_game_service.savePlayerGame(playerDict.idPlayer, gameDict.idGame)

    //Update ids counters
    await base_service.setLastId('gameId')

    return {idGame: gameDict.idGame}
}



function isWinner(cells){
    return checkWinner(cells);
} 

function obtainWhoIsPlaying(){
    if (playerOne.isPlaying === true){
        return playerOne;
    }else{
        return playerTwo;
    }
}


function checkWinner(cells){
    let coincidences= false;
    let emptyMatrix = false;

    vertical = determineVerticalLines(cells);
    cross = determineCrooslines(cells);

    //Verficar si la matriz tiene alguna ubicacion vacia -> Calculo para determinar el empate
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
   
   /* Impractico para determinar empate 
    for (let i = 0; i < horizontalLine.length-1; i++) {
        if(horizontalLine[i] == "" || horizontalLine[i+1] ==""){
            return false;
        }else{
            if(horizontalLine[i]!= horizontalLine[i+1]){
                return tmpNumC = 1;
            }else{
                tmpNumC += 1;
            }
        }  
        
    } */
    
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
    initGame
}