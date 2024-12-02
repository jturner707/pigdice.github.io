

//return random number between 1 and 6 inclusive
function generateRandomValue(minValue:number, maxValue:number):number{
    var random = Math.random();
    return Math.floor(random * 6) + 1;
}


function changePlayers():void{
    let currentPlayerName = (<HTMLElement>document.getElementById("current")).innerText;
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;

    //swap from player to player by comparing current name to player names
    //set currentPlayerName to the next player
    if (currentPlayerName == player1Name) {
        currentPlayerName = player2Name;
    }
    else {
        currentPlayerName = player1Name;
    }
    (document.getElementById("current") as HTMLElement).innerText = currentPlayerName;
}

window.onload = function() {
    // Add warning if "no one has won, do you really want a new game?"
    let newGameBtn = document.getElementById("new_game") as HTMLButtonElement;
    let score1 = parseInt((<HTMLInputElement>document.getElementById("score1")).value);
    let score2 = parseInt((<HTMLInputElement>document.getElementById("score2")).value);
    newGameBtn.onclick = newGameBtnClickCheck;

    // Assign other button click handlers
    (document.getElementById("roll") as HTMLButtonElement).onclick = rollDie;
    (document.getElementById("hold") as HTMLButtonElement).onclick = holdDie;
}

// called if new game button clicked to confirm new game if current game not done
function newGameBtnClickCheck() {
    let score1 = parseInt((document.getElementById("score1") as HTMLInputElement).value, 10);
    let score2 = parseInt((document.getElementById("score2") as HTMLInputElement).value, 10);

    if ((score1 !== 0 || score2 !== 0) && (score1 < 100 && score2 < 100)) {
        confirmNewGame(); // Use the confirmation function
    } else {
        createNewGame();
    }
}

function confirmNewGame(): void {
    let confirmation = confirm("No one has won yet, do you really want a new game?");
    if (confirmation) {
        createNewGame();
    }
}


function createNewGame(){
    //set player 1 and player 2 scores to 0
    let player1Score = 0;
    let player2Score = 0;
    //verify each player has a name
    //if both players don't have a name display error
    //if both players do have a name start the game!
    if (validatePlayerName()) {
    (<HTMLElement>document.getElementById("turn")).classList.add("open");
    (<HTMLInputElement>document.getElementById("total")).value = "0";
    //lock in player names and then change players
    (<HTMLInputElement>document.getElementById("player1")).setAttribute("disabled", "disabled");
    (<HTMLInputElement>document.getElementById("player2")).setAttribute("disabled", "disabled");
    changePlayers();
    let dieInput = document.getElementById('die') as HTMLInputElement;
    dieInput.value = " "; // blank Die box
    let totalInput = document.getElementById('total') as HTMLInputElement;
    let currTotal = 0;
    totalInput.value = currTotal.toString(); // blank Total box
    // blank player 1 and player 2 scores
    let score1 = document.getElementById('score1') as HTMLInputElement;
    score1.value = "0";
    let score2 = document.getElementById('score2') as HTMLInputElement;
    score2.value = "0";
    }
}

function validatePlayerName(): boolean {
    let nameIsValid:boolean = true;
    let player1Name = (<HTMLInputElement>document.getElementById("player1")).value;
    let player2Name = (<HTMLInputElement>document.getElementById("player2")).value;
    let errorMessage1 = document.getElementById('player1-error') as HTMLSpanElement;
    let errorMessage2 = document.getElementById('player2-error') as HTMLSpanElement;
    if (player1Name.length <= 1) {
        errorMessage1.textContent = "Player 1 name must be more than one character.";
        nameIsValid = false;
    } else {
        errorMessage1.textContent = ""; // Clear the error message if valid
    }
    if (player2Name.length <= 1) {
        errorMessage2.textContent = "Player 2 name must be more than one character.";
        nameIsValid = false;
    } else {
        errorMessage2.textContent = ""; // Clear the error message if valid
    }
    return nameIsValid;
}


function rollDie():void{
    let currTotal = parseInt((<HTMLInputElement>document.getElementById("total")).value);
    
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
    let dieInput = document.getElementById('die') as HTMLInputElement;
    dieInput.value = number.toString(); // Convert number to string
    //display current total on form
    let totalInput = document.getElementById('total') as HTMLInputElement;
    totalInput.value = currTotal.toString(); // Convert currTotal to string
}

function holdDie():void{
    //get the current turn total
    let totalInput = document.getElementById('total') as HTMLInputElement;
    let currTotal: number  = parseInt(totalInput.value, 10); // Convert to integer with base 10
    //determine who the current player is
    let currentPlayerName = (document.getElementById("current") as HTMLElement).innerText;
    //add the current turn total to the player's total score
    let playerScore: string;
    if (currentPlayerName === (document.getElementById("player1") as HTMLInputElement).value) {
        playerScore = "score1";
    }
    else {
        playerScore = "score2";
    }
    let currentPlayerScore = document.getElementById(playerScore) as HTMLInputElement;
    let currentScore = parseInt(currentPlayerScore.value, 10);
    currentScore += currTotal;
    currentPlayerScore.value = currentScore.toString(); // Convert number to string and write to player's total
    //reset the turn total to 0
    totalInput.value = "0";
    //reset the Die value to 0
    let dieInput = document.getElementById('die') as HTMLInputElement;
    dieInput.value = "0";
    // check to see if anyone has won yet
    anyoneWonYet();
    //change players
    changePlayers();
}

// this function checks if anyone has won.  It is called in holdDie()
function anyoneWonYet(): void {
    let score1 = parseInt((document.getElementById("score1") as HTMLInputElement).value, 10);
    let score2 = parseInt((document.getElementById("score2") as HTMLInputElement).value, 10);

    if (score1 > 99) {
        addConfetti();
        setTimeout(() => alert("Player 1 wins!"), 3000);
        createNewGame();
    }
    else if (score2 > 99) {
        addConfetti();
        setTimeout(() => alert("Player 2 wins!"), 3000);
        createNewGame();
    } 
    else {}
}

// confetti function to use the library
function addConfetti(): void {
    console.log("addConfetti called"); // Verify function call
    const canvas = document.querySelector('#confetti') as HTMLCanvasElement;
    const jsConfetti = new JSConfetti({ canvas });
    jsConfetti.addConfetti();
}



