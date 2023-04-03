let board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let player = 1;
let NPC = false;
let p1Tokens = 3;
let p2Tokens = 3;

const turn = (player) => {
  document.querySelector("#overlayText").innerHTML = "It's " + player + "'s turn!";
  if (player == 1 && p1Tokens == 0) {
    document.querySelector("#overlayText").innerHTML =
    "It's " + player +"'s turn! But... You don't have any token left! Please select a Token to remove!";
  }
  if (player == 2 && p2Tokens == 0) {
    document.querySelector("#overlayText").innerHTML =
    "It's " + player +"'s turn! But... You don't have any token left! Please select a Token to remove!";
  }
};

const play = (fil, col) => {
  let resF = fil + 1;
  let resC = col + 1;

  if (player == 1) {
    if (p1Tokens > 0) {
      board[fil][col] = 1;
      player = player + 1;
      document.querySelector("#board :nth-child(" + resF + ") :nth-child(" + resC + ") img").setAttribute("src", "img/background/water.png");
      p1Tokens = p1Tokens - 1;
    } else if (p1Tokens == 0) {
      if (board[fil][col] == 1) {
        document.querySelector("#board :nth-child(" + resF + ") :nth-child(" + resC + ") img").setAttribute("src", "");
        p1Tokens = p1Tokens + 1;
      }

    }
  } else if (player == 2) {
    if (p2Tokens > 0) {
      board[fil][col] = 2;
      player = player - 1;
      if (NPC == true) {
        document.querySelector("#board :nth-child(" + resF + ") :nth-child(" + resC + ") img").setAttribute("src", "img/background/grass.webp");
      } else
        document.querySelector("#board :nth-child(" + resF + ") :nth-child(" + resC + ") img").setAttribute("src", "img/background/fire.png");
      p2Tokens = p2Tokens - 1;
    } else if (p2Tokens == 0) {
      if (board[fil][col] == 2) {
        document.querySelector("#board :nth-child(" + resF + ") :nth-child(" + resC + ") img").setAttribute("src", "");
        p2Tokens = p2Tokens + 1;
      }
    }
  }
  console.log(player)
  turn(player);
  winner(board);
};


const winner = (board) => {
  for (let i = 0; i < board.length; i++) {
    if (
      board[i][0] &&
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2]
    )
      console.log(board[i][0], "es el ganador");
    if (
      board[0][i] &&
      board[0][i] === board[1][i] &&
      board[0][i] === board[2][i]
    )
      console.log(board[i][0], "es el ganador");
  }
  if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2])
    console.log(board[0][0], "es el ganador");
  if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0])
    console.log(board[0][2], "es el ganador");
  return null;
};
