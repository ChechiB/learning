//let {ErrorHandler} = require('../helpers/errorHandler')
const gameModel = require('../model/Game');
const game_repository = require('../repository/game_repository');
const base_service = require('./base_service');
const player_service = require('./player_service');
const player_game_service = require('./player_game_service');
const new_get_service = require('./get_Campaign_service')

const initGame = async(obj,idCampaign) => {
    let gameDict = gameModel.getGame()
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

const saveMove = async(hash,cellPosition,obj)=>{ 
    let gameUpdate={}
    let newCampSer = require('./campaign_service');
    let resultCampaign = await newCampSer.getCampaign(hash);
    console.log("resultCampaign",resultCampaign)
    //Get game
    let idGame = resultCampaign.lastGameId 
    let gameDict = await game_repository.findById(idGame)
    gameDict.idGame = idGame
    console.log("gameDict",gameDict);
    if (gameDict.status === false){
        return {"msg": "Game Over"}
    }

    let playerGame = await player_game_service.getPlayerGame(obj.idPlayer,idGame)
    
    if((obj.idPlayer == gameDict.nextPlayer)&&(Object.keys(playerGame).length !== 0)) {
        let playerGameKeys = await player_game_service.getKeys(idGame)
        //Get id players
        let patt1 = /[0-9]+/g;
        let playerOne = {}
        let playerTwo = {}
        let players = []

        playerOne.idPlayer = playerGameKeys[0].toString().match(patt1)[0]
        playerTwo.idPlayer = playerGameKeys[1].toString().match(patt1)[0]

        players = [playerOne, playerTwo]

        if(gameDict[`cell${cellPosition}`] ===""){
            gameDict[`cell${cellPosition}`] = playerGame.symbol
            
            if(!isWinner(getCells(gameDict))){
                gameDict = obtainWhoIsPlaying(players, gameDict)
                console.log("gameUpdate",gameUpdate)
            }else{
                console.log("Winner")
                gameDict.status = false
            }

            let bla = await game_repository.create(gameDict)

            //Si hay ganador, sumar score, setear estado del juego a false
            //
        }else{
            console.log("Celda ocupada")
        }
    }else{
        console.log("Jugador incorrecto");
        
    }
    return 0;
}

const getCells = (game)=>{
    return [[game.cell0,
        game.cell1,
        game.cell2],
        [game.cell3,
        game.cell4,
        game.cell5],
        [game.cell6,
        game.cell7,
        game.cell8]]
}
const getGame = async(idGame)=>{
   let resultGame = await game_repository.findById(idGame)
   return resultGame
}

const getGameStatus = async(idGame)=>{
    let game = await game_repository.findById(idGame)
    let playerGameKeys = await player_game_service.getKeys(idGame)
    let playerGameList = await player_game_service.getPlayerGameList(idGame)    
    //Get players
    let patt1 = /[0-9]+/g;
    let playerOne = await player_service.getPlayerById(playerGameKeys[0].toString().match(patt1)[0])
    let playerTwo = await player_service.getPlayerById(playerGameKeys[1].toString().match(patt1)[0])

    playerOne.symbol = playerGameList[0].symbol
    playerTwo.symbol = playerGameList[1].symbol

    return {players:[playerOne, playerTwo], game}
}

const isWinner = (cells) =>{
    return checkWinner(cells);
} 

const setNextPlayer = async function(obj, idGame){
    let game = await game_repository.findById(idGame)
    game.idGame = idGame
    await game_repository.create(obtainWhoIsPlaying(obj,game))
}

const obtainWhoIsPlaying = function(obj,game){
    console.log("Who is playing","obj",obj,"game",game)
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


const checkWinner = (cells) =>{
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

const checkCoincidence = (cells) =>{
    for (let i = 0; i < cells.length; i++) {
        horizontalLine = []             
        horizontalLine = cells[i];  
        if (checkHorizontalLine(horizontalLine)){
            return true;
        }        
    }

}

const checkHorizontalLine = (horizontalLine)=>{   
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

const containsEmptyCell = (cells) =>{
    for (let i = 0; i < cells.length; i++) {
        for (let j = 0; j < cells[i].length; j++) {
            if(cells[i][j] ===""){
                return true;
            }            
        }        
    }   
    return false; 
}

const determineVerticalLines = (cells)=>{
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

const determineCrooslines = (cells) =>{
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
    setNextPlayer,
    getGame,
    getGameStatus,
}