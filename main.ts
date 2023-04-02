let board = [[0,0,0], [0,0,0], [0,0,0]]
let player = 1;
let NPC = true;

const turn = (player) =>{
    document.querySelector('#overlayText').innerHTML = ("Es el turno de " + player + "!")
}

const play = (fil, col)=>{
    let resF = fil+1;
    let resC = col+1

  if (player == 1){
    board[fil][col] = 1;
    console.log(board)
    player = player+1
    document.querySelector('#board :nth-child('+ resF + ') :nth-child(' + resC +') img').setAttribute('src',"img/background/water.png");
    
  } else if (player == 2){
    board[fil][col] = 2;
    console.log(board)
    player = player-1
    if (NPC == true){
        document.querySelector('#board :nth-child('+ resF + ') :nth-child(' + resC +') img').setAttribute('src',"img/background/grass.webp");
    } else document.querySelector('#board :nth-child('+ resF + ') :nth-child(' + resC +') img').setAttribute('src',"img/background/fire.png");
  } 
  turn(player)
}


// const comprobarPosicionGanadora = (tablero) => {
//     for (let i = 0; i < tablero.length; i++){
//         if(tablero[i][0] && tablero[i][0] === tablero[i][1] && tablero[i][0] === tablero[i][2]) return tablero[i][0]; // horizontales
//         if(tablero[0][i] && tablero[0][i] === tablero[1][i] && tablero[0][i] === tablero[2][i]) return tablero[0][i]; // verticales
//     }
//     if(tablero[0][0] && tablero[0][0] === tablero[1][1] && tablero[0][0] === tablero[2][2]) return tablero[0][0]; // diagonal
//     if(tablero[0][2] && tablero[0][2] === tablero[1][1] && tablero[0][2] === tablero[2][0]) return tablero[0][2]; // la otra diagonal
//     return null
// };