const playerChoiceArea = document.querySelector('#player-choice');
const pcChoiceArea = document.querySelector('#pc-choice');
const pointerBox = document.querySelector('#pointer');
const buttons = document.querySelector('#buttons');
const body = document.querySelector('body');
let playerScore = 0;
let pcScore = 0;

function getPlayerChoice(element) {
  if (element.target.classList.contains('rock')) {
    return 'rock';
  } else if (element.target.classList.contains('paper')) {
    return 'paper';
  } else if (element.target.classList.contains('scissors')) {
    return 'scissors';
  }
}

function getPCChoice() {
  let decision = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
  return decision;
}

function createOutcome(playerChoice, pcChoice) {
  if (
    (playerChoice === 'rock' && pcChoice === 'scissors') ||
    (playerChoice === 'paper' && pcChoice === 'rock') ||
    (playerChoice === 'scissors' && pcChoice === 'paper')
  ) {
    return 'Congratulations, you win!';
  } else if (
    (playerChoice === 'rock' && pcChoice === 'paper') ||
    (playerChoice === 'paper' && pcChoice === 'scissors') ||
    (playerChoice === 'scissors' && pcChoice === 'rock')
  ) {
    return 'Sorry, you lost.';
  } else if (
    (playerChoice === 'rock' && pcChoice === 'rock') ||
    (playerChoice === 'paper' && pcChoice === 'paper') ||
    (playerChoice === 'scissors' && pcChoice === 'scissors')
  ) {
    return 'Draw.';
  }
}

function displayChoices(playerChoice, pcChoice) {
  playerChoiceArea.classList.add(`${playerChoice}`);
  pcChoiceArea.classList.add(`${pcChoice}`);
}

function drawPlayerScore() {
  const playerScoreText = document.querySelector('#player-score');
  playerScoreText.textContent = '';
  playerScoreText.appendChild(
    document.createTextNode(`Player: ${playerScore}`)
  );
}

function drawPCScore() {
  const pcScoreText = document.querySelector('#pc-score');
  pcScoreText.textContent = '';
  pcScoreText.appendChild(document.createTextNode(`Computer: ${pcScore}`));
}

function createResetButton() {
  const resetButton = document.createElement('button');
  resetButton.classList.add('reset');
  resetButton.classList.add('shrink');
  return resetButton;
}

function resetBoard(element) {
  if (element.target.classList.contains('reset')) {
    playerChoiceArea.classList.remove('rock', 'paper', 'scissors');
    pcChoiceArea.classList.remove('rock', 'paper', 'scissors');
    pointerBox.classList.remove('left-arrow', 'right-arrow', 'cross');
    body.removeChild(document.querySelector('h2'));
  }
}

function drawPointer(outcome) {
  if (outcome === 'Congratulations, you win!') {
    pointerBox.classList.add('left-arrow');
  } else if (outcome === 'Sorry, you lost.') {
    pointerBox.classList.add('right-arrow');
  } else if (outcome === 'Draw.') {
    pointerBox.classList.add('cross');
  }
}

function addPoint(outcome) {
  if (outcome === 'Congratulations, you win!') {
    playerScore++;
  } else if (outcome === 'Sorry, you lost.') {
    pcScore++;
  }
}

function drawScores() {
  drawPlayerScore();
  drawPCScore();
}

function createOutcomeTextbox(outcome) {
  const outcomeText = document.createElement('h2');
  outcomeText.appendChild(document.createTextNode(outcome));
  outcomeText.appendChild(createResetButton());
  body.appendChild(outcomeText);
}

function drawOutcome(element) {
  if (
    playerChoiceArea.classList.contains('rock') ||
    playerChoiceArea.classList.contains('paper') ||
    playerChoiceArea.classList.contains('scissors')
  ) {
    return;
  }
  const playerChoice = getPlayerChoice(element);
  const pcChoice = getPCChoice();
  const outcome = createOutcome(playerChoice, pcChoice);
  if (playerChoice === undefined) {
    return;
  }
  displayChoices(playerChoice, pcChoice);
  addPoint(outcome);
  drawPointer(outcome);
  createOutcomeTextbox(outcome);
}

function handleClickEvent(element) {
  drawOutcome(element);
  drawScores();
}

drawScores();
buttons.addEventListener('click', handleClickEvent);
body.addEventListener('click', resetBoard);
