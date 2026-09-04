function getComputerChoice() {
  let computerChoice = Math.floor(Math.random() * 3 + 1);

  if (computerChoice === 1) {
    return "rock";
  } else if (computerChoice === 2) {
    return "paper";
  } else {
    return "scissors";
  }
}

function getHumanChoice() {
  let humanChoice = prompt("To chose Rock: 1 - r - rock\nTo chose Paper: 2 - p - paper\nTo chose Scissors: 3 - s - scissors\nEnter your choice: ").toLowerCase();

  if (humanChoice === "1" || humanChoice === "r" || humanChoice === "rock") {
    return "rock";
  } else if (humanChoice === "2" || humanChoice === "p" || humanChoice === "paper") {
    return "paper";
  } else if (humanChoice === "3" || humanChoice === "s" || humanChoice === "scissors") {
    return "scissors";
  } else {
    return alert("Please enter a valid input next time");
  }
}

function playGame(numberOfRounds) {
  let computerScore = 0;
  let humanScore = 0;
  let tieScore = 0;

  function playRound() {
    let computerChoice = getComputerChoice();
    let humanChoice = getHumanChoice();

    if (humanChoice === "rock" && computerChoice === "paper") {
      console.log("“You lose! Paper beats Rock”.");
      alertRoundResult("computer");
      return (computerScore += 1);
    } else if (humanChoice === "rock" && computerChoice === "scissors") {
      console.log("“You win! Rock beats Scissors”.");
      alertRoundResult("human");
      return (humanScore += 1);
    } else if (humanChoice === "paper" && computerChoice === "scissors") {
      console.log("“You lose! Scissors beats Paper”.");
      alertRoundResult("computer");
      return (computerScore += 1);
    } else if (humanChoice === "paper" && computerChoice === "rock") {
      console.log("“You win! Paper beats Rock”.");
      alertRoundResult("human");
      return (humanScore += 1);
    } else if (humanChoice === "scissors" && computerChoice === "rock") {
      console.log("“You lose! Rock beats Scissors”.");
      alertRoundResult("computer");
      return (computerScore += 1);
    } else if (humanChoice === "scissors" && computerChoice === "paper") {
      console.log("“You win! Scissors beats Paper”.");
      alertRoundResult("human");
      return (humanScore += 1);
    } else {
      console.log("“Tie! No one beats the other”.");
      alertRoundResult();
      return (tieScore += 1);
    }
  }

  function alertRoundResult(alertMessage) {
    if (alertMessage === "human") {
      return alert("Human wins this round");
    } else if (alertMessage == "computer") {
      return alert("Computer wins this round");
    } else {
      return alert("This round is a tie");
    }
  }

  for (i = 0; i < numberOfRounds; i++) {
    if (i === 0) {
      console.log(`------- ${numberOfRounds} Rounds to go! -------`);
    }
    console.log(`Round: ${i + 1} ----------------------`);
    playRound();
    console.log(`Human: ${humanScore} | Computer: ${computerScore} | Tie: ${tieScore}`);
    console.log("-------------------------------");
  }

  if (humanScore > computerScore) {
    console.log("Human wins!");
  } else if (humanScore < computerScore) {
    console.log("Computer wins!");
  } else {
    console.log("Tie! No one wins");
  }
}

let numberOfRounds = prompt("Enter number of rounds you wish to play\n(5 Is the default)");
playGame(Number(numberOfRounds) || 5);
