
// getting the data from the local storage about the past games
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

// listening to the click event to play the game using the buttons
document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

// lestening to the keydown event to play the game using the keyboard
document.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  }
});


function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  // calculate result
  if (playerMove === computerMove){
    result = "It's a draw";
  }else if(
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')
  ){
    result = "you win";
  }else{
    result = "you lose";
  }
  console.log(result);
  // update the score and store it using localStorage.setItem
  if (result === "you win") {
    score.wins += 1;
  } else if( result === "you lose"){
    score.losses += 1;
  }else{
    score.ties += 1;
  }
  console.log(score);
  // show the new score and the updated images using "document.querySelector"
  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();
  updateResult(result);
  showMove(playerMove, computerMove);
}

// showing the result after the game 
function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function updateResult(result){
  document.querySelector('.js-result')
    .innerHTML = `${result}`;
}

function showMove(playerMove, computerMove){
  document.querySelector('.js-moves')
    .innerHTML = `You <img src= "images/${playerMove}-emoji.png" class="player-move-icon"> <img src= "images/${computerMove}-emoji.png" class="computer-move-icon"> computer`
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}