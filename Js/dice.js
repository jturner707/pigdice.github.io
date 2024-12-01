"use strict";
//return random number between 1 and 6 inclusive
function generateRandomValue(minValue, maxValue) {
    var random = Math.random();
    return Math.floor(random * 6) + 1;
}
function changePlayers() {
    let currentPlayerName = document.getElementById("current").innerText;
    let player1Name = document.getElementById("player1").value;
    let player2Name = document.getElementById("player2").value;
    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
}
window.onload = function () {
    let newGameBtn = document.getElementById("new_game");
    newGameBtn.onclick = createNewGame;
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
function createNewGame() {
    //set player 1 and player 2 scores to 0
    let player1Score = 0;
    let player2Score = 0;
    //verify each player has a name
    //if both players don't have a name display error
    //if both players do have a name start the game!
    if (validatePlayerName()) {
        document.getElementById("turn").classList.add("open");
        document.getElementById("total").value = "0";
        //lock in player names and then change players
        document.getElementById("player1").setAttribute("disabled", "disabled");
        document.getElementById("player2").setAttribute("disabled", "disabled");
        changePlayers();
    }
}
function validatePlayerName() {
    let nameIsValid = true;
    let player1Name = document.getElementById("player1").value;
    let player2Name = document.getElementById("player2").value;
    let errorMessage1 = document.getElementById('player1-error');
    let errorMessage2 = document.getElementById('player2-error');
    if (player1Name.length <= 1) {
        errorMessage1.textContent = "Player 1 name must be more than one character.";
        nameIsValid = false;
    }
    else {
        errorMessage1.textContent = ""; // Clear the error message if valid
    }
    if (player2Name.length <= 1) {
        errorMessage2.textContent = "Player 2 name must be more than one character.";
        nameIsValid = false;
    }
    else {
        errorMessage2.textContent = ""; // Clear the error message if valid
    }
    return nameIsValid;
}
function rollDie() {
    let currTotal = parseInt(document.getElementById("total").value);
    //roll the die and get a random value 1 - 6 (use generateRandomValue function)
    //if the roll is 1
    //  change players
    //  set current total to 0
    //if the roll is greater than 1
    //  add roll value to current total
    //set the die roll to value player rolled
    //display current total on form
}
function holdDie() {
    //get the current turn total
    //determine who the current player is
    //add the current turn total to the player's total score
    //reset the turn total to 0
    //change players
    changePlayers();
}
