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

function initGame(nameP1, nameP2){
    //Inicializar jugadores
    initPlayers(nameP1,nameP2);
    
    return players;
}

function initPlayers(nameP1, nameP2){
    if(Math.random() <0.5){
        playerOne = new Player(nameP1,"X",true);
        playerTwo = new Player(nameP2, "O",false)
        console.log("player 1 comienza")
    }else{
        playerOne = new Player(nameP1,"O",false);
        playerTwo = new Player(nameP2, "X",true)
        console.log("player 2 comienza")
    }

    players = [playerOne,playerTwo];

    return players;
}

function obtainWinner(cells){
    console.log(determineHorizontal(cells));
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

function transpose(cells){           
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

//Extraer la fila donde se encuentra la celda seleccionada y validar si es igual al resto de los elementos
//de la fila
function determineHorizontal(cells){
    coincidences = true;
    console.log("cells: ", cells)
    let coincidence = false;

    for (let i = 0; i < cells.length; i++) {
        horizontalLine = []
        for (let j = 0; j < cells[i].length; j++) {
            horizontalLine[i] = cells[i].innerText;               
            if (checkHorizontalLine(horizontalLine)){
                console.log("Ganador")
                return true;
            }   
        }
        
    }

    return coincidences;
}

function checkHorizontalLine(horizontalLine){
    let tmp = false;
    for (let i = 0; i < horizontalLine.length-1; i++) {
        if(horizontalLine[i] != ""){
            if(horizontalLine[i]!= horizontalLine[i+1]){
                console.log("En no ganador")
                tmp = false;
            }    
        }
    }
    return tmp;
}

function checkCrosslineRight(cells){

}

function checkCrosslineLeft(cells){

}

function determineCroosline(cells){
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