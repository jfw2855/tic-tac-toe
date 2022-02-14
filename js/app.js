// variables 
let currentPlayer = "x";
let winnerFound = false;
let winner = "";
let count = 0;
let playerTwo = "player";
let playerXScore = 0;
let playerOscore = 0;
let ties = 0;
let space1 = document.getElementById("btn1");
let space2 = document.getElementById("btn2");
let space3 = document.getElementById("btn3");
let space4 = document.getElementById("btn4");
let space5 = document.getElementById("btn5");
let space6 = document.getElementById("btn6");
let space7 = document.getElementById("btn7");
let space8 = document.getElementById("btn8");
let space9 = document.getElementById("btn9");
const spaces = document.querySelectorAll(".btn");
const restartBtn = document.getElementById("restart");
let message = document.querySelector("h2");


// Adds an eventlistener to all spaces
function startGame () {
    spaces.forEach(item => {
        item.addEventListener("click", markSpace)
        });
}

startGame();

// Adds a marker to space based on current player, returns if space is already marked
function markSpace (e) {
    if (e.target.innerHTML!=="") return;
    e.target.innerHTML=currentPlayer;
    count++;


// Invokes checkWinner() to see if there is a winner, if not, switches players & displays next player
    if (currentPlayer==="x") {
        e.target.classList.add("X_CLASS");
        checkWinner();
        if (winnerFound===true) return;
        currentPlayer="o";
        message.innerHTML="Player O: Please make your selection";

        //Inokes computerPlay if computer player is selected
        if (playerTwo==="computer") {
            // waits 0.8s before invoking computerPlay()
            setTimeout(computerPlay,800);
        }
    }

    else if (currentPlayer==="o"&&playerTwo==="player") {
        e.target.classList.add("O_CLASS");
        checkWinner();
        if (winnerFound===true) return;
        currentPlayer="x";
        message.innerHTML="Player X: Please make your selection";

    }
}

// Fxn to determine if a player has won or if there is a tie 

function checkWinner () {
    // Winning combos
    let firstRow = [space1.innerHTML,space2.innerHTML,space3.innerHTML];
    let secondRow = [space4.innerHTML,space5.innerHTML,space6.innerHTML];
    let thirdRow = [space7.innerHTML,space8.innerHTML,space9.innerHTML];
    let firstCol= [space1.innerHTML,space4.innerHTML,space7.innerHTML]; 
    let secondCol = [space2.innerHTML,space5.innerHTML,space8.innerHTML];
    let thirdCol = [space3.innerHTML,space6.innerHTML,space9.innerHTML];
    let firstDig = [space1.innerHTML,space5.innerHTML,space9.innerHTML];
    let secondDig = [space3.innerHTML,space5.innerHTML,space7.innerHTML];
    let winnerCombos = [firstRow,secondRow,thirdRow,firstCol,secondCol,thirdCol,firstDig,secondDig];

    // Checks if there is a winning combo
    for (let i=0;i<winnerCombos.length;i++) {
        if (winnerCombos[i].join("")==="xxx"||winnerCombos[i].join("")==="ooo") {
            message.innerHTML=`${currentPlayer.toUpperCase()} is the winner!`;
            winner = currentPlayer;
            winnerFound = true;
            scoreBoard(winner);
            endGame();
            break;
        }

    }
    // Checks if there is a tie
    if (count>=9&&winnerFound===false) {
        message.innerHTML="It's a tie!";
        winnerFound=true;
        scoreBoard(winner);
    }

}


// Removes eventlisteners once the game is over
function endGame () {
    spaces.forEach(item => {
        item.removeEventListener("click", markSpace)
    })
}

// Restart button resets gameboard
restartBtn.addEventListener("click", function () {
    winnerFound = false;
    winner="";
    currentPlayer = "x";
    endGame();
    count = 0;
    message.innerHTML="Let's play Tic Tac Toe! Player X, make your first move!";
    spaces.forEach(item => {
        item.innerHTML="";
        item.removeAttribute("class");
        item.classList.add("btn");
    });
    startGame();
})

//Updates the scoreboard if there is a winner or tie
function scoreBoard (winner) {
    if (winner==="x") {
        playerXScore++;
        document.getElementById("xScore").innerHTML=playerXScore;
    }
    else if (winner==="o") {
        playerOscore++;
        document.getElementById("oScore").innerHTML=playerOscore;
    }

    else {
        ties++;
        document.getElementById("ties").innerHTML=ties;
    }

}


// Computer will randomly make a choice based on remaining empty spaces
function computerPlay () {
    let arr = [space1,space2,space3,space4,space5,space6,space7,space8,space9];
    let compArr = []; 
    for (let i=0; i<arr.length;i++) {
        if (arr[i].innerHTML==="") {
            compArr.push(arr[i]);
        }
    }
    let computerPick = compArr[Math.floor(Math.random()*compArr.length)];
    computerPick.innerHTML="o";
    computerPick.classList.add("O_CLASS");
    checkWinner();
    if (winnerFound===true) return;
    currentPlayer="x";
    message.innerHTML="Player X: Please make your selection";
}



// Hides either computer/player O button once one is clicked
document.getElementById("player").addEventListener("click", function () {
    playerTwo = "player";
    document.getElementById("player").style.visibility="hidden";
    document.getElementById("computer").style.visibility="visible";
})
document.getElementById("computer").addEventListener("click", function () {
    playerTwo = "computer";
    document.getElementById("computer").style.visibility="hidden";
    document.getElementById("player").style.visibility="visible";

})

