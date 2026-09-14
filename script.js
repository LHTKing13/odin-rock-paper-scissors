// imports
const playerScoreTxt = document.querySelector(".player-score");
const computerScoreTxt = document.querySelector(".computer-score");
const tieScoreTxt = document.querySelector(".tie-score");

const playerChoiceImg = document.querySelector(".player-choice-img img");
const computerChoiceImg = document.querySelector(".computer-choice-img img");

const playerChoiceTxt = document.querySelector(".player-choice-text");
const computerChoiceTxt = document.querySelector(".computer-choice-text");

const roundTxt = document.querySelector(".round-text");

const rockBtn = document.querySelector("#btn-rock");
const paperBtn = document.querySelector("#btn-paper");
const scissorsBtn = document.querySelector("#btn-scissors");

const totalRoundsTxt = document.querySelector(".total-rounds-num");
const remainingRoundsTxt = document.querySelector(".remaining-rounds-num");

const overlay = document.querySelector(".overlay");
const startScreen = document.querySelector(".start-screen-container");
const startBtn = document.querySelector(".start-btn");
const startInput = document.querySelector(".start-input");
const startScreenTitle = document.querySelector(".start-screen-title");

const soundBtn = document.querySelector(".sound-btn");
const themeBtn = document.querySelector(".theme-btn");

const root = document.documentElement;

// images
const rockImg = "./images/rock.png";
const paperImg = "./images/paper.png";
const scissorsImg = "./images/scissors.png";
const rockPaperScissorsImg = "./images/rock-paper-scissors.png";

const soundOnImg = "./images/sound-on.png";
const soundOffImg = "./images/sound-off.png";

const sunImg = "./images/sun.png";
const moonImg = "./images/moon.png";

// sounds
const clickSound = new Audio("./sounds/click.mp3");
const winSound = new Audio("./sounds/win.mp3");
const loseSound = new Audio("./sounds/lose.mp3");
const tieSound = new Audio("./sounds/tie.mp3");

// variabls
let playerScore = 0;
let computerScore = 0;
let tieScore = 0;

let totalRounds = 5;
let remainingRounds = 5;
let currentRound = 0;

let setPlaySound = true;
let setLightTheme = true;

// logic
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  tieScore = 0;

  totalRounds = 5;
  remainingRounds = 5;
  currentRound = 0;

  playerScoreTxt.textContent = "0";
  computerScoreTxt.textContent = "0";
  tieScoreTxt.textContent = "0";

  playerChoiceImg.src = rockPaperScissorsImg;
  computerChoiceImg.src = rockPaperScissorsImg;

  playerChoiceTxt.innerHTML = "-";
  computerChoiceTxt.innerHTML = "-";
  roundTxt.textContent = "-";
  roundTxt.classList.remove("round-text-win");
  roundTxt.classList.remove("round-text-lose");
  roundTxt.classList.add("round-text-tie");

  totalRoundsTxt.textContent = `${currentRound}/${totalRounds}`;
  remainingRoundsTxt.textContent = `${totalRounds}`;
}

function addEventListeners() {
  rockBtn.addEventListener("click", () => checkWinner("rock"));
  paperBtn.addEventListener("click", () => checkWinner("paper"));
  scissorsBtn.addEventListener("click", () => checkWinner("scissors"));

  startBtn.addEventListener("click", () => getNumberOfRounds());

  soundBtn.addEventListener("click", () => toggleSoundOnOff());
  themeBtn.addEventListener("click", () => toggleThemeLightDark());
}

function getNumberOfRounds() {
  const numberOfRounds = Math.ceil(+startInput.value);
  if (numberOfRounds <= 0) {
    startInput.value = "";
    startInput.style.borderColor = "red";
  } else {
    startInput.style.borderColor = "black";

    totalRounds = numberOfRounds;
    remainingRounds = numberOfRounds;

    startScreen.style.display = "none";
    overlay.style.display = "none";
    updateTotalRoundsTxt();
    updateRemainingRoundsTxt();
  }

  playSound(clickSound);
}

function getComputerChoice() {
  let computerChoice = Math.floor(Math.random() * 3 + 1);

  if (computerChoice === 1) {
    return "rock";
  }
  if (computerChoice === 2) {
    return "paper";
  }
  if (computerChoice === 3) {
    return "scissors";
  }
}

function checkWinner(playerChoice) {
  const computerChoice = getComputerChoice();

  let winner = "";

  if (playerChoice === computerChoice) {
    winner = "tie";
  }
  if (playerChoice === "rock" && computerChoice === "paper") {
    winner = "computer";
  }
  if (playerChoice === "rock" && computerChoice === "scissors") {
    winner = "player";
  }
  if (playerChoice === "paper" && computerChoice === "rock") {
    winner = "player";
  }
  if (playerChoice === "paper" && computerChoice === "scissors") {
    winner = "computer";
  }
  if (playerChoice === "scissors" && computerChoice === "rock") {
    winner = "computer";
  }
  if (playerChoice === "scissors" && computerChoice === "paper") {
    winner = "player";
  }

  updateScores(winner);
  updateRounds();
  updateUi(playerChoice, computerChoice, winner);
  checkIsGameEnd();
}

function updateScores(winner) {
  if (winner === "player") {
    playerScore += 1;
    playSound(winSound);
  }
  if (winner === "computer") {
    computerScore += 1;
    playSound(loseSound);
  }
  if (winner === "tie") {
    tieScore += 1;
    playSound(tieSound);
  }
}

function updateRounds() {
  currentRound += 1;
  remainingRounds -= 1;
}

function checkIsGameEnd() {
  // redo the logic
  if (currentRound === totalRounds) {
    setTimeout(() => {
      overlay.style.display = "block";
      startScreen.style.display = "flex";
      startInput.value = "";
      if (playerScore > computerScore) {
        startScreenTitle.style.color = "green";
        startScreenTitle.textContent = "You Win!";
        startBtn.textContent = "Play again";
      } else if (playerScore < computerScore) {
        startScreenTitle.style.color = "red";
        startScreenTitle.textContent = "You Lose!";
        startBtn.textContent = "Play again";
      } else {
        startScreenTitle.style.color = root.classList.contains("light") ? "black" : "#F4F4F4";
        startScreenTitle.textContent = "It's a Tie!";
        startBtn.textContent = "Play again";
      }
      resetGame();
    }, 500);
  }
}

// ui stuff
function updateUi(playerChoice, computerChoice, winner) {
  updatePlayerChoiceTxt(playerChoice);
  updateComputerChoiceTxt(computerChoice);

  updatePlayerChoiceImg(playerChoice);
  updateComputerChoiceImg(computerChoice);

  updateTotalRoundsTxt();
  updateRemainingRoundsTxt();

  updateRoundTxt(winner);

  if (winner === "player") {
    updatePlayerScoreTxt();
  }
  if (winner === "computer") {
    updateComputerScoreTxt();
  }
  if (winner === "tie") {
    updateTieScoreTxt();
  }
}

function updatePlayerChoiceTxt(playerChoice) {
  return (playerChoiceTxt.textContent = playerChoice);
}

function updateComputerChoiceTxt(computerChoice) {
  return (computerChoiceTxt.textContent = computerChoice);
}

function updatePlayerChoiceImg(playerChoice) {
  if (playerChoice === "rock") {
    return (playerChoiceImg.src = rockImg);
  }
  if (playerChoice === "paper") {
    return (playerChoiceImg.src = paperImg);
  }
  if (playerChoice === "scissors") {
    return (playerChoiceImg.src = scissorsImg);
  }
}

function updateComputerChoiceImg(computerChoice) {
  if (computerChoice === "rock") {
    return (computerChoiceImg.src = rockImg);
  }
  if (computerChoice === "paper") {
    return (computerChoiceImg.src = paperImg);
  }
  if (computerChoice === "scissors") {
    return (computerChoiceImg.src = scissorsImg);
  }
}

function updateTotalRoundsTxt() {
  return (totalRoundsTxt.textContent = `${currentRound}/${totalRounds}`);
}

function updateRemainingRoundsTxt() {
  return (remainingRoundsTxt.textContent = `${remainingRounds}`);
}

function updatePlayerScoreTxt() {
  return (playerScoreTxt.textContent = playerScore);
}

function updateComputerScoreTxt() {
  return (computerScoreTxt.textContent = computerScore);
}

function updateTieScoreTxt() {
  return (tieScoreTxt.textContent = tieScore);
}

function updateRoundTxt(winner) {
  if (winner === "player") {
    roundTxt.classList.add("round-text-win");
    roundTxt.classList.remove("round-text-tie");
    roundTxt.classList.remove("round-text-lose");

    roundTxt.textContent = "You win!";
  }
  if (winner === "computer") {
    roundTxt.classList.add("round-text-lose");
    roundTxt.classList.remove("round-text-win");
    roundTxt.classList.remove("round-text-tie");

    roundTxt.textContent = "You lose!";
  }
  if (winner === "tie") {
    roundTxt.classList.add("round-text-tie");
    roundTxt.classList.remove("round-text-lose");
    roundTxt.classList.remove("round-text-win");

    roundTxt.textContent = "Tie!";
  }
}

//  soundStuff
function playSound(soundName) {
  if (setPlaySound) {
    soundName.play();
  }
}

function toggleSoundOnOff() {
  setPlaySound = !setPlaySound;
  playSound(clickSound);
  if (setPlaySound) {
    soundBtn.src = soundOnImg;
  } else {
    soundBtn.src = soundOffImg;
  }
}

// theme stuff
function toggleThemeLightDark() {
  playSound(clickSound);

  const isDark = root.classList.contains("dark");

  if (isDark) {
    root.classList.remove("dark");
    root.classList.add("light");

    themeBtn.src = moonImg;

    document.querySelectorAll("img").forEach((img) => {
      img.classList.remove("dark-img");
    });
  } else {
    root.classList.remove("light");
    root.classList.add("dark");

    themeBtn.src = sunImg;

    document.querySelectorAll("img").forEach((img) => {
      img.classList.add("dark-img");
    });
  }
}

function getFirstLoadTheme() {
  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (isDark) {
    root.classList.add("dark");
    themeBtn.src = sunImg;

    document.querySelectorAll("img").forEach((img) => {
      img.classList.add("dark-img");
    });
  } else {
    root.classList.add("light");
    themeBtn.src = moonImg;
  }
}

// call this on script load
resetGame();
addEventListeners();
getFirstLoadTheme();
