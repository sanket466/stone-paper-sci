let userScore = 0;
let compScore = 0;
let maxScore = 5; // Default to best of 5

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
  playSound("draw");
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
    playSound("win");
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
    playSound("lose");
  }

  // Check if someone has won the game
  if (userScore >= maxScore) {
    msg.innerText = "You won the game! Congratulations!";
    msg.style.backgroundColor = "gold";
    playSound("win");
    resetScores();
  } else if (compScore >= maxScore) {
    msg.innerText = "Computer won the game! Better luck next time!";
    msg.style.backgroundColor = "silver";
    playSound("lose");
    resetScores();
  }
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};



// Add event listeners for choices
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

// Reset game functionality
const resetGame = () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
  msg.innerText = "Play your move";
  msg.style.backgroundColor = "#081b31";
};

// Add event listener for reset button
const resetBtn = document.querySelector("#reset-btn");
resetBtn.addEventListener("click", resetGame);

// Game length option functionality
const gameLengthSelector = document.querySelector("#game-length");
gameLengthSelector.addEventListener("change", (event) => {
  maxScore = parseInt(event.target.value);
  resetGame(); // Reset the game when the length changes
});
