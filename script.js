const playerChoiceArea = document.querySelector('#player-choice');
const pcChoiceArea = document.querySelector('#pc-choice');
const pointerBox = document.querySelector('#pointer');
const buttons = document.querySelector('#buttons');
const body = document.querySelector('body');
const outcomeWrapper = document.getElementById('outComeWrapper');
let playerScore = 0;
let pcScore = 0;

function getPlayerChoice(element) {
  if (element.target.classList.contains('rock')) {
    return 'rock';
  }
  if (element.target.classList.contains('paper')) {
    return 'paper';
  }
  if (element.target.classList.contains('scissors')) {
    return 'scissors';
  }
}

function getPcChoice() {
  let decision = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
  return decision;
}

function createOutcome(playerChoice, pcChoice) {
  switch (playerChoice + pcChoice) {
    case 'rockscissors':
    case 'paperrock':
    case 'scissorspaper':
      playerScore++;
      return 'Congratulations, you win!';
    case 'rockpaper':
    case 'paperscissors':
    case 'scissorsrock':
      pcScore++;
      return 'Sorry, you lost.';
    case 'rockrock':
    case 'paperpaper':
    case 'scissorsscissors':
      return 'Draw.';
  }
}

function displayChoices(playerChoice, pcChoice) {
  playerChoiceArea.classList.add(`${playerChoice}`);
  pcChoiceArea.classList.add(`${pcChoice}`);
  outcomeWrapper.className = 'displayOutcome';
}

function drawPlayerScore() {
  const playerScoreText = document.querySelector('#player-score');
  if (playerScoreText.textContent !== '') {
    playerScoreText.textContent = '';
  }
  playerScoreText.appendChild(
    document.createTextNode(`Player: ${playerScore}`)
  );
}

function drawPCScore() {
  const pcScoreText = document.querySelector('#pc-score');
  if (pcScoreText.textContent !== '') {
    pcScoreText.textContent = '';
  }
  pcScoreText.appendChild(document.createTextNode(`Computer: ${pcScore}`));
}

function createResetButton() {
  const resetButton = document.createElement('button');
  resetButton.classList.add('reset');
  resetButton.classList.add('shrink');
  resetButton.textContent = 'Play again?';
  resetButton.addEventListener('click', resetBoard);
  return resetButton;
}

function resetBoard(element) {
  if (element.target.classList.contains('reset')) {
    playerChoiceArea.classList.remove('rock', 'paper', 'scissors');
    pcChoiceArea.classList.remove('rock', 'paper', 'scissors');
    pointerBox.classList.remove('left-arrow', 'right-arrow', 'cross');
    outcomeWrapper.innerHTML = '';
  }
}

function drawPointer(outcome) {
  if (outcome === 'Congratulations, you win!') {
    pointerBox.classList.add('left-arrow');
  }

  if (outcome === 'Sorry, you lost.') {
    pointerBox.classList.add('right-arrow');
  }

  if (outcome === 'Draw.') {
    pointerBox.classList.add('cross');
  }
}

function drawScores() {
  drawPlayerScore();
  drawPCScore();
}

function createOutcomeTextbox(outcome) {
  const outcomeText = document.createElement('h3');

  outcomeWrapper.appendChild(outcomeText);
  outcomeText.setAttribute('class', 'outComeText');
  const playAgainButtonWrapper = document.createElement('div');
  outcomeText.appendChild(document.createTextNode(outcome));
  outcomeText.appendChild(playAgainButtonWrapper);
  playAgainButtonWrapper.appendChild(createResetButton());
}

function drawOutcome(element) {
  const playerChoice = getPlayerChoice(element);
  const pcChoice = getPcChoice();
  const outcome = createOutcome(playerChoice, pcChoice);
  displayChoices(playerChoice, pcChoice);
  drawPointer(outcome);
  createOutcomeTextbox(outcome);
}

function renderResults(element) {
  drawOutcome(element);
  drawScores();
  drawPCScore();
}

drawScores();
buttons.addEventListener('click', renderResults);
