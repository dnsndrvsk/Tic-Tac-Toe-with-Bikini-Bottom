'use strict';

var AutoTurnSave,
    turn = 1,
    turnsCounter = 0,
    isAutoTurnFinished = true,
    tds = document.querySelectorAll('td'),
    infoBox = document.querySelector('.game-info'),
    restartBtn = document.querySelector('.game-restart'),
    nextBtn = document.querySelector('.game-next'),
    reloadBtn = document.querySelector('.game-scratch'),
    improveBtn = document.querySelector('.game-improve'), 
    playersNames = [],
    playersColors = [],
    playerPhrases = {},
    currentLevel = 1,
    previousLevel = currentLevel,
    isDiffChosen = false,
    character,
    fixedCharName,
    gameLives,
    time,
    music = new Audio();

/************************************
*************EVENT SOUNDS************
************************************/
var clickSound = new Audio('sounds/click.mp3'),
    winSound = new Audio('sounds/applause.mp3'),
    loseSound = new Audio('sounds/sympathy.mp3'),
    matchedSound = new Audio('sounds/matched.mp3'),
    btnPressSound = new Audio('sounds/btn_press.mp3'),
    endGameSound = new Audio('sounds/end_game.mp3'),
    drawSound = new Audio('sounds/draw.mp3');
/************************************
*************EVENT SOUNDS************
************************************/

// Our data will be placed here.
var loadedCharsData;

/**
 * Loads our data and then
 * saves it in varibale "loadedCharsData".
 */
function getCharsData() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'data/charData.json');
  
  xhr.onload = function(e) {
    var rawData = e.target.response;
    var loadedData = JSON.parse(rawData);
    
    if (xhr.readyState === 4) {
      dataHandler.updateCharsData(loadedData);
      loadedCharsData = loadedData;
      
      helper.changePlayerName();
      helper.updateLvlInfo();

      character.changeMood('wait');
      character.say('wait');
    }
  };
  
  xhr.send();
}

/**
 * Reloads current level.
 */
function restartTheGame() {
  btnPressSound.play();
  
  character.changeMood('wait');
  character.say('wait');
  character.continue();
  
  turnsCounter = 0;
  
  helper.resetCircles(handleClick);
  helper.whichTurn();
  
  if (turn === 2) {
    character.handleTurn();
  }
  
  restartBtn.classList.remove('show');
  restartBtn.classList.add('hide');
}


/**
 * Load next level.
 */
function loadNextLevel() {
  btnPressSound.play();
  
  dataHandler.updateCharsData(loadedCharsData);
  
  helper.chooseCharacter();
  helper.updateLvlInfo();
  helper.changeLvlBg();
  helper.changePlayerName();
  
  character.changeMood('wait');
  character.say('wait');
  
  turnsCounter = 0;
  
  helper.resetCircles(handleClick);
  helper.whichTurn();
  
  if (turn === 2) {
    character.handleTurn();
  }
  
  previousLevel = currentLevel;
  
  helper.playMusic();
  
  nextBtn.classList.remove('show');
  nextBtn.classList.add('hide');
}


/**
 * Reload entire game.
 * Shows button "reloadBtn".
 */
function reloadTheGame() {
  btnPressSound.play();
  isDiffChosen = false;
  helper.playMusic();
  currentLevel = 1;
  turn = 1;
  turnsCounter = 0;
  isAutoTurnFinished = true;
  
  dataHandler.updateCharsData(loadedCharsData);
  
  helper.chooseCharacter();
  helper.changePlayerName();
  helper.updateLvlInfo();
  helper.changeLvlBg();
  
  character.changeMood('wait');
  character.say('wait');
  
  helper.resetCircles(handleClick);
  helper.whichTurn();
  
  if (turn === 2) {
    character.handleTurn();
  }
  
  previousLevel = currentLevel;
  
  reloadBtn.classList.remove('show');
  reloadBtn.classList.add('hide');
  
  helper.chooseDifficulty();
}


/**
 * Reload entire game.
 * Shows button "improveBtn".
 */
function improveScore() {
  btnPressSound.play();
  isDiffChosen = false;
  helper.playMusic();
  currentLevel = 1;
  turn = 1;
  turnsCounter = 0;
  isAutoTurnFinished = true;
  
  dataHandler.updateCharsData(loadedCharsData);
  
  helper.chooseCharacter();
  helper.changePlayerName();
  helper.updateLvlInfo();
  helper.changeLvlBg();
  
  character.changeMood('wait');
  character.say('wait');
  
  helper.resetCircles(handleClick);
  helper.whichTurn();
  
  if (turn === 2) {
    character.handleTurn();
  }
  
  previousLevel = currentLevel;
  
  improveBtn.classList.remove('show');
  improveBtn.classList.add('hide');
  
  helper.chooseDifficulty();
}


/**
 * Event handler on "click" event.
 * Will placed on "td" HTMLElements.
 * @param {object} e Just a normal "Event" object.
 */
function handleClick(e) {
  if (e.target.id || e.target.tagName == 'IMG') {
    return;
  }
  
  if ( !isAutoTurnFinished ) {
    return;
  }
  
  isAutoTurnFinished = false;
  clickSound.play();
  
  character.changeMood('think');
  character.say('think');
  
  turnsCounter++;
  
  if (turn === 1) {
    turn = 2;
    
    var spangebob = document.createElement('img');
    spangebob.setAttribute('src', 'img/spangebob.png');
    
    e.target.appendChild(spangebob);
    e.target.setAttribute('id', 'x');
    e.target.classList.add('clicked');
    
    helper.getPositions(e.target.parentNode, e.target);
  }
  
  if (turn === 2) {
    if (currentLevel === 2) {
      setTimeout(character.handleTurn, 1750);
      return;
    }
    
    if (currentLevel === 3) {
      setTimeout(character.handleTurn, 1500);
      return;
    }
    
    if (currentLevel === 4) {
      setTimeout(character.handleTurn, 1000);
      return;
    }
    
    setTimeout(character.handleTurn, 2000);
  }
}


for (var i = 0; i < tds.length; i++) {
  tds[i].addEventListener('click', handleClick);
}


helper.playMusic();
helper.chooseDifficulty();

// Our Data is now ready and placed
// into "loadedCharsData" variable.
getCharsData();


// Our character is now defined.
helper.chooseCharacter();
helper.changeLvlBg();
helper.whichTurn();

character.say('wait');


/************************************
*****Placing handlers on buttons*****
************************************/

restartBtn.addEventListener('click', restartTheGame);
nextBtn.addEventListener('click', loadNextLevel);
reloadBtn.addEventListener('click', reloadTheGame);
improveBtn.addEventListener('click', improveScore);

/************************************
*****Placing handlers on buttons*****
************************************/


// Reloads the game and shows main menu on "escape" event
document.addEventListener('keydown', function(e) {
  
  if (e.keyCode === 27) {
    reloadTheGame();
    
    if (restartBtn.classList.contains('show')) {
      restartBtn.classList.remove('show');
      restartBtn.classList.add('hide');
    }
    
    if (improveBtn.classList.contains('show')) {
      improveBtn.classList.remove('show');
      improveBtn.classList.add('hide');
    }
    
    if (nextBtn.classList.contains('show')) {
      nextBtn.classList.remove('show');
      nextBtn.classList.add('hide');
    }
  } 
});
