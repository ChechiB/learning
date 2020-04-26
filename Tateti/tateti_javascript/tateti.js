/* 
    1. pedir los nombres
    2. iniciar juego 
        - validar que los campos nombres tengan valor
        - mostrar la tabla que esta oculta

        - random determinar quien es circulo y quien x
        - random determinar quien empieza
        - Mostrar a quien le toca y que es
*/
class Player{

    constructor(name,symbol,isPlaying){
        this.name = name;
        this.symbol = symbol;
        this.isPlaying = isPlaying;
    }
}

let playerOne = null;
let playerTwo = null;

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

function isWinner(cells){
    return checkWinner(cells);
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