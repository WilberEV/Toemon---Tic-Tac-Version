let introPage = 0;
let mainChara = 0;
let p1Name = '';
let p2Name = 'Azure';
let board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let playerTurn = 1;
let NPC = false;
let p1Tokens = 3;
let p2Tokens = 3;

const toggle = (from, to) => {
  document.querySelector(from).classList.add("none");
  document.querySelector(to).classList.remove("none");
};

const introText = () =>{
  let textArr = [
    'Welcome! You may call me Ebon, but, I am known as the Pokemon Professor of the Raova Region!',
    'You are about to join a world full of Pokemon and, of course, some good old Tic Tac Toe.',
    'But first! Tell me...',
    'Are you a boy or a girl?',
    'Very well! And...',
    'What was your name again?'
  ]
  if (introPage == 3){
    document.querySelector(".overlayText").innerHTML = textArr[introPage];
    toggle('#ebon', '#charaSelect')
    return
  }
  if (introPage == 5){
    document.querySelector(".overlayText").innerHTML = textArr[introPage];
    toggle('#ebon','#setP1Name')
    return
  }
  if (introPage == 8){
    document.querySelector(".overlayText").innerHTML = `Very well ${p1Name}, get ready to embark on this adventure!`;
    toggle('#setP1Name','#introSection')
    introPage++
    return
  }
  if (introPage >= 9){
    toggle('#introScreen','#gameBoard')
    turn(playerTurn);
  }
  document.querySelector(".overlayText").innerHTML = textArr[introPage];
  introPage++
}

const selecMC = (gender) =>{
  mainChara = gender;
  introPage++
  if (gender == 1){
    toggle("#carmine", '#crimson')
    document.querySelector("#crimson .sprites").setAttribute("onclick", "")

  } else {
    toggle('#crimson', '#carmine')
    document.querySelector("#carmine .sprites").setAttribute("onclick", "")
    document.querySelector("#p1Side .sprites img").setAttribute("src", "img/sprites/carmine.png");
  }
  introText()
}

const setName = () =>{
   if(p1Name == ""){
    p1Name = (<HTMLInputElement>document.getElementById("playerName")).value;
    document.querySelector("#p1Name").innerHTML = `${p1Name}`
    introPage++
    introText()
   } else {
    p2Name = (<HTMLInputElement>document.getElementById("playerName")).value;
   }
}

const play = (fil, col) => {
  let resF = fil + 1;
  let resC = col + 1;

  if(checkWinner(board) == false){
    if (playerTurn == 1) {
      if (p1Tokens > 0) {
        board[fil][col] = 1;
        playerTurn = playerTurn * -1;
        document.querySelector(`#board :nth-child(${resF}) :nth-child(${resC}) img`).setAttribute("src", "img/background/water.png");
        document.querySelector(`#p2Side .tokenCount :nth-child(${p1Tokens})`).setAttribute("src", "img/background/emptyToken.png");
        p1Tokens = p1Tokens - 1;
      } else if (p1Tokens == 0) {
        if (board[fil][col] == 1) {
          board[fil][col] = 0;
          document.querySelector(`#board :nth-child(${resF}) :nth-child(${resC}) img`).setAttribute("src", "");
          p1Tokens = p1Tokens + 1;
          document.querySelector(`#p2Side .tokenCount :nth-child(${p1Tokens})`).setAttribute("src", "img/background/fullToken.png");
        }
      }
    } else if (playerTurn == -1) {
      if (p2Tokens > 0) {
        board[fil][col] = 2;
        playerTurn = playerTurn * -1;
        if (NPC == true) {
          document.querySelector(`#board :nth-child(${resF}) :nth-child(${resC}) img`).setAttribute("src", "img/background/grass.webp");
        } else
          document.querySelector(`#board :nth-child(${resF}) :nth-child(${resC}) img`).setAttribute("src", "img/background/fire.png");
          document.querySelector(`#p1Side .tokenCount :nth-child(${p2Tokens})`).setAttribute("src", "img/background/emptyToken.png");
        p2Tokens = p2Tokens - 1;
      } else if (p2Tokens == 0) {
        if (board[fil][col] == 2) {
          board[fil][col] = 0;
          document.querySelector(`#board :nth-child(${resF}) :nth-child(${resC}) img`).setAttribute("src", "");
          p2Tokens = p2Tokens + 1;
          document.querySelector(`#p1Side .tokenCount :nth-child(${p2Tokens})`).setAttribute("src", "img/background/fullToken.png");
        }
      }
    }
  checkWinner(board);
  turn(playerTurn);
  }
};


const checkWinner = (board):boolean => {
  for (let i = 0; i < board.length; i++) {
    if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]){
      return true;
    }
    if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]){
    return true;
    }
  }
  if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]){
    return true;
  }
  if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]){
    return true;
  } else return false;
};

const playNPC = (board) => {

  if (p2Tokens == 3){
    let X = Math.round((Math.random() * 10)/3)
    let Y = Math.round((Math.random() * 10)/3)
    if (board[X][Y] == 0) {
      board[X][Y] = 2;
    } else {
      playNPC(board);
    }
  } else if(p2Tokens < 3) {
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] === board[i][1] || board[i][1] === board[i][2] || board[i][0] === board[i][2]){
        if (board[i][0] == 0){
          board[i][0] = 2;
        } else if (board[i][1] == 0){
          board[i][1] = 2;
        } else if (board[i][2] == 0){
          board[i][0] = 2;
        }
      } else if (board[0][i] === board[1][i] || board[1][i] === board[2][i] || board[0][i] === board[2][i]){
        if (board[0][i] == 0){
          board[0][i] = 2;
        } else if (board[1][i] == 0){
          board[1][i] = 2;
        } else if (board[2][i] == 0){
          board[2][i] = 2;
        }
      } else if (board[0][0] === board[1][1] || board[1][1] === board[2][2] || board[0][0] === board[2][2]){
        if (board[0][0] == 0){
          board[0][0] = 2;
        } else if (board[1][1] == 0){
          board[1][1] = 2;
        } else if (board[2][2] == 0){
          board[2][2] = 2;
        }
      } else if (board[0][2] === board[1][1] || board[1][1] === board[2][0] || board[0][2] === board[2][0]){
        if (board[0][2] == 0){
          board[0][2] = 2;
        } else if (board[1][1] == 0){
          board[1][1] = 2;
        } else if (board[2][0] == 0){
          board[2][0] = 2;
        }
      }
    }
  }
  turn(playerTurn);
};

const turn = (player) => {
  if(checkWinner(board) == false){   
    if (player == 1) {
      document.querySelector("#gameBoard .overlayText").innerHTML = `It's  ${p1Name}'s turn!`;
    }
    if (player == -1) {
      document.querySelector("#gameBoard .overlayText").innerHTML = `It's  ${p2Name}'s turn!`;
      if(NPC == true){
        playNPC(board);
      }
    }
    if (player == 1 && p1Tokens == 0) {
      document.querySelector("#gameBoard .overlayText").innerHTML =
      `It's ${p1Name}'s turn! But... They don't have any token left! Please select a Token to remove!`;
    }
    if (player == -1 && p2Tokens == 0) {
      document.querySelector("#gameBoard .overlayText").innerHTML =
      `It's ${p2Name}'s turn! But... They don't have any token left! Please select a Token to remove!`;
      if(NPC == true){
        playNPC(board);
      }
    }
  } else {
    player = player * -1;
    if (player == 1){
      document.querySelector("#gameBoard .overlayText").innerHTML = `The winner is ${p1Name}!`;
    }
    if (player == -1) {
      document.querySelector("#gameBoard .overlayText").innerHTML = `The winner is ${p2Name}!`;
    }
  } 
};
