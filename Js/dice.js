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
    if (currentPlayerName == player1Name) {
        currentPlayerName = player2Name;
    }
    else {
        currentPlayerName = player1Name;
    }
    document.getElementById("current").innerText = currentPlayerName;
}
window.onload = function () {
    // Add warning if "no one has won, do you really want a new game?"
    let newGameBtn = document.getElementById("new_game");
    let score1 = parseInt(document.getElementById("score1").value);
    let score2 = parseInt(document.getElementById("score2").value);
    newGameBtn.onclick = newGameBtnClickCheck;
    // Assign other button click handlers
    document.getElementById("roll").onclick = rollDie;
    document.getElementById("hold").onclick = holdDie;
};
// called if new game button clicked to confirm new game if current game not done
function newGameBtnClickCheck() {
    let score1 = parseInt(document.getElementById("score1").value, 10);
    let score2 = parseInt(document.getElementById("score2").value, 10);
    if ((score1 !== 0 || score2 !== 0) && (score1 < 100 && score2 < 100)) {
        confirmNewGame(); // Use the confirmation function
    }
    else {
        createNewGame();
    }
}
function confirmNewGame() {
    let confirmation = confirm("No one has won yet, do you really want a new game?");
    if (confirmation) {
        createNewGame();
    }
}
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
        let dieInput = document.getElementById('die');
        dieInput.value = " "; // blank Die box
        let totalInput = document.getElementById('total');
        let currTotal = 0;
        totalInput.value = currTotal.toString(); // blank Total box
        // blank player 1 and player 2 scores
        let score1 = document.getElementById('score1');
        score1.value = "0";
        let score2 = document.getElementById('score2');
        score2.value = "0";
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
    let number = generateRandomValue(1, 6);
    //if the roll is 1
    //  change players
    //  set current total to 0
    if (number == 1) {
        changePlayers();
        currTotal = 0;
    }
    //if the roll is greater than 1
    //  add roll value to current total
    else {
        currTotal += number;
    }
    //set the die roll to value player rolled
    let dieInput = document.getElementById('die');
    dieInput.value = number.toString(); // Convert number to string
    //display current total on form
    let totalInput = document.getElementById('total');
    totalInput.value = currTotal.toString(); // Convert currTotal to string
}
function holdDie() {
    //get the current turn total
    let totalInput = document.getElementById('total');
    let currTotal = parseInt(totalInput.value, 10); // Convert to integer with base 10
    //determine who the current player is
    let currentPlayerName = document.getElementById("current").innerText;
    //add the current turn total to the player's total score
    let playerScore;
    if (currentPlayerName === document.getElementById("player1").value) {
        playerScore = "score1";
    }
    else {
        playerScore = "score2";
    }
    let currentPlayerScore = document.getElementById(playerScore);
    let currentScore = parseInt(currentPlayerScore.value, 10);
    currentScore += currTotal;
    currentPlayerScore.value = currentScore.toString(); // Convert number to string and write to player's total
    //reset the turn total to 0
    totalInput.value = "0";
    //reset the Die value to 0
    let dieInput = document.getElementById('die');
    dieInput.value = "0";
    // check to see if anyone has won yet
    anyoneWonYet();
    //change players
    changePlayers();
}
// this function checks if anyone has won.  It is called in holdDie()
function anyoneWonYet() {
    let score1 = parseInt(document.getElementById("score1").value, 10);
    let score2 = parseInt(document.getElementById("score2").value, 10);
    if (score1 > 99) {
        alert("Player 1 wins!");
        createNewGame();
    }
    else if (score2 > 99) {
        alert("Player 2 wins!");
        createNewGame();
    }
    else { }
}
