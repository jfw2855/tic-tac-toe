// variables I need to make: current player, gameboard spaces
let currentPlayer = "x";
let winnerFound = false;
let count = 0;
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
    console.log(count)

// Invokes checkWinner() to see if there is a winner, if not, switches players & displays next player
    if (currentPlayer==="x") {
        e.target.classList.add("X_CLASS");
        checkWinner();
        if (winnerFound===true) return;
        currentPlayer="o";
        message.innerHTML="Player O: Please make your selection";
    }
    else {
        e.target.classList.add("O_CLASS");
        checkWinner();
        if (winnerFound===true) return;
        currentPlayer="x";
        message.innerHTML="Player X: Please make your selection";

    }
}

// Fxn to determine if a player has won or if there is a tie 

function checkWinner () {
    let space1 = document.getElementById("btn1").innerHTML;
    let space2 = document.getElementById("btn2").innerHTML;
    let space3 = document.getElementById("btn3").innerHTML;
    let space4 = document.getElementById("btn4").innerHTML;
    let space5 = document.getElementById("btn5").innerHTML;
    let space6 = document.getElementById("btn6").innerHTML;
    let space7 = document.getElementById("btn7").innerHTML;
    let space8 = document.getElementById("btn8").innerHTML;
    let space9 = document.getElementById("btn9").innerHTML;
    let firstRow = [space1,space2,space3];
    let secondRow = [space4,space5,space6];
    let thirdRow = [space7,space8,space9];
    let firstCol= [space1,space4,space7];
    let secondCol = [space2,space5,space8];
    let thirdCol = [space3,space6,space9];
    let firstDig = [space1,space5,space9];
    let secondDig = [space3,space5,space7];
    let winnerCombos = [firstRow,secondRow,thirdRow,firstCol,secondCol,thirdCol,firstDig,secondDig];

    winnerCombos.forEach(item => {
        
        if (item.join("")==="xxx"||item.join("")==="ooo") {
            message.innerHTML=`${currentPlayer.toUpperCase()} is the winner!`;
            console.log("winner reached - ",item)
            winnerFound = true;
            endGame();
        }
        else if (count >= 9) {
            console.log("its a tie reached")
            message.innerHTML="It's a tie!";
            winnerFound=true;
        }
    })

}
    // display message

// once game is over, don't allow board to be edited (remove event listeners?)
function endGame () {
    spaces.forEach(item => {
        item.removeEventListener("click", markSpace)
    })
}

// event listener to reset gameboard 
restartBtn.addEventListener("click", function () {
    winnerFound = false;
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

