// Global variables

let introPage = 0;
let mainChara = 0;
let p1Name = "";
let p2Name = "Azure";
let board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];
let playerTurn = 1;
let NPC = true;
let p1Tokens = 3;
let p2Tokens = 3;

var test = 0;

// Show and hide windows
const toggle = (from, to) => {
  document.querySelector(from).classList.add("none");
  document.querySelector(to).classList.remove("none");
};

// Introduction with professor Ebon
const introText = () => {
  //Dialog
  let textArr = [
    "Welcome! You may call me Ebon, but, I am known as the Pokemon Professor of the Raova Region!",
    "You are about to join a world full of Pokemon and, of course, some good old Tic Tac Toe.",
    "But first! Tell me...",
    "Are you a boy or a girl?",
    "Very well! And...",
    "What was your name again?",
  ];

  //Hide professor and shows MCs
  if (introPage == 3) {
    document.querySelector(".overlayText").innerHTML = textArr[introPage];
    toggle("#ebon", "#charaSelect");
    return;
  }

  //Ask for player´s name
  if (introPage == 5) {
    document.querySelector(".overlayText").innerHTML = textArr[introPage];
    toggle("#ebon", "#setP1Name");
    return;
  }
  //Hides name input
  if (introPage == 8) {
    document.querySelector(
      ".overlayText"
    ).innerHTML = `Very well ${p1Name}, get ready to embark on this adventure!`;
    toggle("#setP1Name", "#introSection");
    introPage++;
    return;
  }
  //Takes player to the game
  if (introPage >= 9) {
    toggle("#introScreen", "#gameBoard");
    turn(playerTurn);
    return;
  }

  //Dialog cycle
  document.querySelector(".overlayText").innerHTML = textArr[introPage];
  introPage++;
};

//Character selection
const selecMC = (gender) => {
  mainChara = gender;
  introPage++;
  if (gender == 1) {
    toggle("#carmine", "#crimson");
    document.querySelector("#crimson .sprites").setAttribute("onclick", "");
    introText();
    return;
  } else {
    toggle("#crimson", "#carmine");
    document.querySelector("#carmine .sprites").setAttribute("onclick", "");
    document
      .querySelector("#p1Side .sprites img")
      .setAttribute("src", "img/sprites/carmine.png");
    introText();
    return;
  }
};

//Stores P1 and P2 names
const setName = () => {
  if (p1Name == "") {
    p1Name = (<HTMLInputElement>document.getElementById("playerName")).value;
    document.querySelector("#p1Name").innerHTML = `${p1Name}`;
    introPage++;
    introText();
  } else {
    p2Name = (<HTMLInputElement>document.getElementById("playerName")).value;
  }
};

//Game's main function
const play = (fil, col) => {
  console.log("Play gets fil", fil)
  console.log("Play gets col", col)
  console.log("Turno de ", playerTurn)

  //Variables to link array position with div position
  let resF = fil + 1;
  let resC = col + 1;

  if (checkWinner(board) == false) {
    // >>>>>>>>> No crees que deberia ser un do while?

    //Player 1's turn
    if (playerTurn == 1) {
      //Stores P1's tokens on the array
      if (p1Tokens > 0 && board[fil][col] == 0) {
        board[fil][col] = 1;
        console.log("Sets the img thingy ... -----> WATER");

        //Shows token on corresponding Div
        document.querySelector(`#board :nth-child(${resF}) :nth-child(${resC}) img`).setAttribute("src", "img/background/water.png");
        //Displays P1's tokens left
        document.querySelector(`#p2Side .tokenCount :nth-child(${p1Tokens})`).setAttribute("src", "img/background/emptyToken.png");
        p1Tokens = p1Tokens - 1;
        playerTurn = playerTurn * -1;
      } else if (p1Tokens == 0) {
        //If P1 is out of tokens, forces them to take one back
        if (board[fil][col] == 1) {
          board[fil][col] = 0;
          document.querySelector(`#board :nth-child(${resF}) :nth-child(${resC}) img`).setAttribute("src", "");
          p1Tokens = p1Tokens + 1;
          document.querySelector(`#p2Side .tokenCount :nth-child(${p1Tokens})`).setAttribute("src", "img/background/fullToken.png");
        }
      }

      //P2's Turn
    } else if (playerTurn == -1) {
      //Stores P2's tokens on the array
      if (p2Tokens > 0 && board[fil][col] == 0) {
        board[fil][col] = 2;

        //Changes the Token if the Computer is playing
        if (NPC == true) {
          console.log("Sets the img thingy ... -----> GRASS");
          document.querySelector(`#board :nth-child(${resF}) :nth-child(${resC}) img`).setAttribute("src", "img/background/grass.webp");
        } else {
          console.log("Sets the img thingy ... -----> FIRE");

          document.querySelector(`#board :nth-child(${resF}) :nth-child(${resC}) img`).setAttribute("src", "img/background/fire.png");
        }
        //Displays P2's tokens left
        document.querySelector(`#p1Side .tokenCount :nth-child(${p2Tokens})`).setAttribute("src", "img/background/emptyToken.png");
        p2Tokens = p2Tokens - 1;
        playerTurn = playerTurn * -1;
        //If computer's cell is used calls for a reroll(?
      } else if (p2Tokens > 0 && board[fil][col] !== 0 && NPC == true) {
        playNPC(board);

        //If P2 is out of tokens, forces them to take one back
      } else if (p2Tokens == 0) {
        if (board[fil][col] == 2) {
          board[fil][col] = 0;
          document.querySelector(`#board :nth-child(${resF}) :nth-child(${resC}) img`).setAttribute("src", "");
          p2Tokens = p2Tokens + 1;
          document.querySelector(`#p1Side .tokenCount :nth-child(${p2Tokens})`).setAttribute("src", "img/background/fullToken.png");
          //Calls for a reroll if playing the Computer
          if (NPC == true) {
            playNPC(board);
          }
        }
      }
    }
  }
  console.log(playerTurn, "turn");
  console.log(board);
  checkWinner(board);
  turn(playerTurn);
};

//Checks the board for any 3 equal cells
const checkWinner = (board): boolean => {
  for (let i = 0; i < board.length; i++) {
    if (
      board[i][0] &&
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2]
    ) {
      return true;
    }
    if (
      board[0][i] &&
      board[0][i] === board[1][i] &&
      board[0][i] === board[2][i]
    ) {
      return true;
    }
  }
  if (
    board[0][0] &&
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
  ) {
    return true;
  }
  if (
    board[0][2] &&
    board[0][2] === board[1][1] &&
    board[0][2] === board[2][0]
  ) {
    return true;
  } else return false;
};




//Computer's behavior
const playNPC = (board) => {
  setTimeout(() => {
    //First turn places a random token
    if (p2Tokens == 3 && playerTurn == -1) {
      let X = Math.round(Math.random() * 2);
      console.log(X);
      let Y = Math.round(Math.random() * 2);
      console.log(Y);
      play(X, Y);
      return;

      //Checks the board for any 2 equal cells, places on the 3rd free cell
    } else if (0 < p2Tokens && p2Tokens < 3) {

      for (let i = 0; i < board.length; i++) {
        while (playerTurn == -1) {
          if (      //board tiene 2 iguales en horizontal
            (board[i][0] !== 0 && board[i][1] !== 0) ||
            (board[i][0] !== 0 && board[i][2] !== 0) ||
            (board[i][1] !== 0 && board[i][2] !== 0)
          ) {
            for (let j = 0; j < board.length; j++) {
              for (let k = 0; k < board.length; k++) {
                if (board[j][k] == 0) {
                  play(j, k);
                  return
                }
              }
            }
          return
          }
      
          else if (     //board tiene 2 iguales en vertical
            (board[0][i] !== 0 && board[1][i] !== 0) ||
            (board[0][i] !== 0 && board[2][i] !== 0) ||
            (board[1][i] !== 0 && board[2][i] !== 0)
          ) {
            for (let j = 0; j < board.length; j++) {
              for (let k = 0; k < board.length; k++) {
                if (board[k][j] == 0) {
                  play(k, j);
                  return
                }
              }
            }
          return
          } 
      
          else if (
            (board[0][0] !== 0 && board[1][1] !== 0) ||
            (board[0][0] !== 0 && board[2][2] !== 0) ||
            (board[1][1] !== 0 && board[2][2] !== 0)
          ) {
              let Z = 0
              while (Z < 3){
                if (board[Z][Z] == 0){
                  play(Z,Z);
                  return
                }
                Z++
              }
            return
          }
      
      
          else if (
            (board[0][2] !== 0 && board[1][1] !== 0) ||
            (board[0][2] !== 0 && board[2][0] !== 0) ||
            (board[1][1] !== 0 && board[2][0] !== 0)
          ) {
            if (board[0][2] == 0) {
              play(0, 2);
              return;
            } else if (board[1][1] == 0) {
              play(1, 1);
              return;
            } else if (board[2][0] == 0) {
              play(2, 0);
              return;
            } 
            return;
          }
      
          else {
            for (let j = 0; j < board.length; j++) {
              for (let k = 0; k < board.length; k++) {
                if (board[j][k] == 0) {
                  play(j, k);
                }
              }
            }
          }
        }
      }

    } else if (p2Tokens == 0) {
      let X = Math.round(Math.random() * 2);
      console.log(X);
      let Y = Math.round(Math.random() * 2);
      console.log(Y);
      play(X, Y);
      return;
    }
  }, 2000);
};

//Displays who's turns it is
const turn = (player) => {
  if (checkWinner(board) == false) {
    // no hay ganador aun

    if (player == 1) {
      document.querySelector(
        "#gameBoard .overlayText"
      ).innerHTML = `It's  ${p1Name}'s turn!`;
      return;
    }
    if (player == -1) {
      document.querySelector(
        "#gameBoard .overlayText"
      ).innerHTML = `It's  ${p2Name}'s turn!`;

      //If playing agaist the PC, calls for the Computer's play
      if (NPC == true) {
        playNPC(board);
      }
      return;
    }
    if (player == 1 && p1Tokens == 0) {
      document.querySelector(
        "#gameBoard .overlayText"
      ).innerHTML = `It's ${p1Name}'s turn! But... They don't have any token left! Please select a Token to remove!`;
      return;
    }
    if (player == -1 && p2Tokens == 0) {
      document.querySelector(
        "#gameBoard .overlayText"
      ).innerHTML = `It's ${p2Name}'s turn! But... They don't have any token left! Please select a Token to remove!`;
      return;
    }
    return //////// 
  } else {
    console.log("WINNER TRUE")
    player = player * -1;
    if (player == 1) {
      document.querySelector(
        "#gameBoard .overlayText"
      ).innerHTML = `The winner is ${p1Name}!`;
      return;
    }
    if (player == -1) {
      document.querySelector(
        "#gameBoard .overlayText"
      ).innerHTML = `The winner is ${p2Name}!`;
      return;
    }
  }
};