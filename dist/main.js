let introPage = 0;
let mainChara = 0;
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
    from.classList.add("none");
    to.classList.remove("none");
};
const introText = () => {
    let textArr = [
        'Welcome! You may call me Ebon, but, I am known as the Pokemon Professor of the Raova Region!',
        'You are about to join a world of Pokemon and some good old Tic Tac Toe',
        'But first! Tell me...',
        'Are you a boy or a girl?',
        'Very well! And... What was your name again?'
    ];
    if (introPage == 3) {
        document.querySelector(".overlayText").innerHTML = textArr[introPage];
        toggle(ebon, charaSelect);
        return;
    }
    document.querySelector(".overlayText").innerHTML = textArr[introPage];
    introPage = introPage + 1;
};
const selecMC = (gender) => {
    mainChara = gender;
    introPage = introPage + 1;
    if (gender == 1) {
        toggle(carmine, crimson);
    }
    else {
        toggle(crimson, carmine);
    }
    introText();
};
const play = (fil, col) => {
    let resF = fil + 1;
    let resC = col + 1;
    if (checkWinner(board) == false) {
        if (playerTurn == 1) {
            if (p1Tokens > 0) {
                board[fil][col] = 1;
                playerTurn = playerTurn * -1;
                document.querySelector("#board :nth-child(" + resF + ") :nth-child(" + resC + ") img").setAttribute("src", "img/background/water.png");
                p1Tokens = p1Tokens - 1;
            }
            else if (p1Tokens == 0) {
                if (board[fil][col] == 1) {
                    board[fil][col] = 0;
                    document.querySelector("#board :nth-child(" + resF + ") :nth-child(" + resC + ") img").setAttribute("src", "");
                    p1Tokens = p1Tokens + 1;
                }
            }
        }
        else if (playerTurn == -1) {
            if (p2Tokens > 0) {
                board[fil][col] = 2;
                playerTurn = playerTurn * -1;
                if (NPC == true) {
                    document.querySelector("#board :nth-child(" + resF + ") :nth-child(" + resC + ") img").setAttribute("src", "img/background/grass.webp");
                }
                else
                    document.querySelector("#board :nth-child(" + resF + ") :nth-child(" + resC + ") img").setAttribute("src", "img/background/fire.png");
                p2Tokens = p2Tokens - 1;
            }
            else if (p2Tokens == 0) {
                if (board[fil][col] == 2) {
                    board[fil][col] = 0;
                    document.querySelector("#board :nth-child(" + resF + ") :nth-child(" + resC + ") img").setAttribute("src", "");
                    p2Tokens = p2Tokens + 1;
                }
            }
        }
        checkWinner(board);
        turn(playerTurn);
    }
};
const checkWinner = (board) => {
    for (let i = 0; i < board.length; i++) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
            return true;
        }
        if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
            return true;
        }
    }
    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        return true;
    }
    if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
        return true;
    }
    else
        return false;
};
const turn = (player) => {
    if (checkWinner(board) == false) {
        document.querySelector(".overlayText").innerHTML = "It's " + player + "'s turn!";
        if (player == 1 && p1Tokens == 0) {
            document.querySelector(".overlayText").innerHTML =
                "It's " + player + "'s turn! But... You don't have any token left! Please select a Token to remove!";
        }
        if (player == -1 && p2Tokens == 0) {
            document.querySelector(".overlayText").innerHTML =
                "It's " + player + "'s turn! But... You don't have any token left! Please select a Token to remove!";
        }
    }
    else {
        player = player * -1;
        document.querySelector(".overlayText").innerHTML =
            "The winner is " + player + "!";
    }
};
//# sourceMappingURL=main.js.map