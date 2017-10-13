var helper = (function(){
  
  /**
   * Initiate chain of function to find out
   * whether it is victory, loss or draw.
   * @param {HTMLElement} row
   * @param {HTMLElement} cell
   */
  function getPositions(row, cell) {
    var rowID = '#' + row.id;
    var cellPosition = 0;
    var rowCells = row.children;

    for ( var i = 0; i < rowCells.length; i++ ) {
      
      var previousSibling;

      if ( previousSibling ) {
        
        if ( previousSibling.previousElementSibling ) {
          
          previousSibling = previousSibling.previousElementSibling;
          cellPosition++;
          continue;
          
        } else {
          continue;
        }
      }

      if ( cell.previousElementSibling ) {
        
        previousSibling = cell.previousElementSibling;
        cellPosition++;
      }
    }

    cellPosition++;

    isWin(rowID, cellPosition);
  }
  
  
  /************************************
  *************************************
  *******USING ONLY BY getPositions****
  *************************************
  *************************************/
  
  /**
   * Checking if the game is over.
   * @param {string} rowID
   * @param {number} cellPosition
   */
  function isWin(rowID, cellPosition) {
  
    var rowNum = 0;

    for ( var i = 0; i < rowID.length; i++ ) {
      if ( typeof parseInt(rowID[i]) === 'number' ) {
        rowNum = parseInt(rowID[i]);
      } else {
        continue;
      }
    }

    var row = document.querySelector(rowID);
    var cells = row.children;
    var cell = row.children[cellPosition - 1];

    var cellValue = cell.id;

    if ( hMatch(row, cells, cellPosition, cellValue) ) {
      return;
    }

    if ( vMatch(row, cells, cellPosition, cellValue) ) {
      return;
    }

    if ( dlMatch(row, cells, cellPosition, cellValue) ) {
      return;
    }

    if ( drMatch(row, cells, cellPosition, cellValue) ) {
      return;
    }

    if ( turnsCounter === 9 ) {
      handleDraw();
      return;
    }

    whichTurn();
    
  }
  
  
  /**
   * Trying to find horizontal matches
   * @param   {HTMLElement}    row
   * @param   {HTMLCollection} cells
   * @param   {number}         cellPosition
   * @param   {string}         cellValue
   * @returns {boolean}        Returns true if found 3 matches.
   */
  function hMatch(row, cells, cellPosition, cellValue) {
  
    cellPosition--;


    var matches = [];

    matches.push(cells[cellPosition]);


    if (cells[cellPosition - 1]) {
      
      if ( cells[cellPosition - 1].id === cellValue ) {

        matches.push(cells[cellPosition - 1]);

        if (cells[cellPosition - 2]) {
          
          if ( cells[cellPosition - 2].id === cellValue ) {

            matches.push(cells[cellPosition - 2]);

            matches.forEach(function(item){
              hgMatches(item);
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }


    matches.splice(1);


    if (cells[cellPosition + 1]) {
      if ( cells[cellPosition + 1].id === cellValue ) {

        matches.push(cells[cellPosition + 1]);

        if (cells[cellPosition + 2]) {
          if ( cells[cellPosition + 2].id === cellValue ) {

            matches.push(cells[cellPosition + 2]);

            matches.forEach(function(item){
              hgMatches(item);
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }


    matches.splice(1);


    if ( cells[cellPosition - 1] && cells[cellPosition + 1] ) {
      
      if ( cells[cellPosition - 1].id === cellValue && 
           cells[cellPosition + 1].id === cellValue ) {

        matches.push(cells[cellPosition - 1]);
        matches.push(cells[cellPosition + 1]);

        matches.forEach(function(item){
          hgMatches(item);
        });

        handleWin(cellValue);
        return true;
      }
    }
  }
  
  
  /**
   * Trying to find vertical matches.
   * @param   {HTMLElement}    row
   * @param   {HTMLCollection} cells
   * @param   {number}         cellPosition
   * @param   {string}         cellValue
   * @returns {boolean}        Returns true if found 3 matches.
   */
  function vMatch(row, cells, cellPosition, cellValue) {
    cellPosition--;


    var matches = [];

    matches.push(cells[cellPosition]);

    var rowPrevious = row.previousElementSibling;
    var rowNext = row.nextElementSibling;
    

    if ( rowPrevious ) {
      
      if ( rowPrevious.children[cellPosition].id === cellValue ) {

        matches.push(rowPrevious.children[cellPosition]);

        if ( rowNext ) {
          
          if ( rowNext.children[cellPosition].id === cellValue ) {

            matches.push(rowNext.children[cellPosition]);

            matches.forEach(function(item){
              hgMatches(item);
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }


    matches.splice(1);


    if ( rowPrevious ) {
      
      if ( rowPrevious.children[cellPosition].id === cellValue ) {

        matches.push(rowPrevious.children[cellPosition]);

        if ( rowPrevious.previousElementSibling ) {
          
          if ( rowPrevious.previousElementSibling.children[cellPosition].id === cellValue ) {

            matches.push(rowPrevious.previousElementSibling.children[cellPosition]);

            matches.forEach(function(item){
              hgMatches(item);
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }


    matches.splice(1);


    if ( rowNext ) {
      
      if ( rowNext.children[cellPosition].id === cellValue ) {

        matches.push(rowNext.children[cellPosition]);

        if ( rowNext.nextElementSibling ) {
          
          if ( rowNext.nextElementSibling.children[cellPosition].id === cellValue ) {

            matches.push(rowNext.nextElementSibling.children[cellPosition]);

            matches.forEach(function(item){
              hgMatches(item);
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }
  }
  
  
  /**
   * Trying to find diagonal (from bottom left to top right) matches.
   * @param   {HTMLElement}    row
   * @param   {HTMLCollection} cells
   * @param   {number}         cellPosition
   * @param   {string}         cellValue
   * @returns {boolean}        Returns true if found 3 matches.
   */
  function dlMatch(row, cells, cellPosition, cellValue) {
    cellPosition--;


    var matches = [];

    matches.push(cells[cellPosition]);

    var rowPrevious = row.previousElementSibling;
    var rowNext = row.nextElementSibling;
    

    if ( rowPrevious && rowPrevious.children[cellPosition + 1]) {
      
      if ( rowPrevious.children[cellPosition + 1].id === cellValue ) {

        matches.push(rowPrevious.children[cellPosition + 1]);

        if ( rowPrevious.previousElementSibling && 
             rowPrevious.previousElementSibling.children[cellPosition + 2] ) {
          
          if ( rowPrevious.previousElementSibling.children[cellPosition + 2].id === cellValue ) {

            matches.push(rowPrevious.previousElementSibling.children[cellPosition + 2]);

            matches.forEach(function(item){
              hgMatches(item);
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }


    matches.splice(1);


    if ( rowNext && rowNext.children[cellPosition - 1] ) {
      
      if ( rowNext.children[cellPosition - 1].id === cellValue ) {

        matches.push(rowNext.children[cellPosition - 1]);

        if ( rowNext.nextElementSibling && rowNext.nextElementSibling.children[cellPosition - 2] ) {
          
          if ( rowNext.nextElementSibling.children[cellPosition - 2].id === cellValue ) {

            matches.push(rowNext.nextElementSibling.children[cellPosition - 2]);

            matches.forEach(function(item){
              hgMatches(item);
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }


    matches.splice(1);


    if ( rowNext && rowNext.children[cellPosition - 1] ) {
      
      if ( rowNext.children[cellPosition - 1].id === cellValue ) {

        matches.push(rowNext.children[cellPosition - 1]);

        if ( rowPrevious && rowPrevious.children[cellPosition + 1]) {
          
          if ( rowPrevious.children[cellPosition + 1].id === cellValue ) {

            matches.push(rowPrevious.children[cellPosition + 1]);

            matches.forEach(function(item){
              hgMatches(item);
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }
  }
  
  
  /**
   * Trying to find diagonal (from top left to bottom right) matches.
   * @param   {HTMLElement}    row
   * @param   {HTMLCollection} cells
   * @param   {number}         cellPosition
   * @param   {string}         cellValue
   * @returns {boolean}        Returns true if found 3 matches.
   */
  function drMatch(row, cells, cellPosition, cellValue) {
    cellPosition--;


    var matches = [];

    matches.push(cells[cellPosition]);

    var rowPrevious = row.previousElementSibling;
    var rowNext = row.nextElementSibling;
    

    if ( rowPrevious && rowPrevious.children[cellPosition - 1]) {
      
      if ( rowPrevious.children[cellPosition - 1].id === cellValue ) {

        matches.push(rowPrevious.children[cellPosition - 1]);

        if ( rowPrevious.previousElementSibling && 
             rowPrevious.previousElementSibling.children[cellPosition - 2] ) {
          
          if ( rowPrevious.previousElementSibling.children[cellPosition - 2].id === cellValue ) {

            matches.push(rowPrevious.previousElementSibling.children[cellPosition - 2]);

            matches.forEach(function(item){
              hgMatches(item);
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }


    matches.splice(1);


    if ( rowNext && rowNext.children[cellPosition + 1] ) {
      
      if ( rowNext.children[cellPosition + 1].id === cellValue ) {

        matches.push(rowNext.children[cellPosition + 1]);

        if ( rowNext.nextElementSibling && 
             rowNext.nextElementSibling.children[cellPosition + 2] ) {
          
          if ( rowNext.nextElementSibling.children[cellPosition + 2].id === cellValue ) {

            matches.push(rowNext.nextElementSibling.children[cellPosition + 2]);

            matches.forEach(function(item){
              hgMatches(item);
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }


    matches.splice(1);


    if ( rowNext && rowNext.children[cellPosition + 1] ) {
      
      if ( rowNext.children[cellPosition + 1].id === cellValue ) {

        matches.push(rowNext.children[cellPosition + 1]);

        if ( rowPrevious && rowPrevious.children[cellPosition - 1]) {
          
          if ( rowPrevious.children[cellPosition - 1].id === cellValue ) {

            matches.push(rowPrevious.children[cellPosition - 1]);

            matches.forEach(function(item){
              hgMatches(item);
            });

            handleWin(cellValue);
            return true;
          }
        }
      }
    }
  }
  
  
  /**
   * Ends current game and shows "Next level" button
   * if the player wins. Otherwise it shows "Restart" button.
   * @param {string} cellValue
   */
  function handleWin(cellValue) {
    
    if ( turn === 2 ) {
      
      if ( currentLevel < 5 ) {
        winSound.play();
      }
      
      infoBox.innerHTML = "<span>You</span> won the game!";
      character.changeMood('lose');
      character.say('lose');
      helper.increaseLevel();
      
    } else {
      
      loseSound.play();
      gameLives--;
      updateLives();
      
      infoBox.innerHTML = "<span style=\"color:" + 
                          playersColors[currentLevel - 1] + 
                          "\">" + 
                          fixedCharName + 
                          "</span> won the game!";
      
      character.changeMood('win');
      character.say('win');
    }

    for ( var i = 0; i < tds.length; i++ ) {
      tds[i].removeEventListener('click', handleClick);
    }

    character.stop();
    
    if ( gameLives < 0 ) {
      reloadBtn.classList.add('show');
      return;
    }
    
    if ( currentLevel === 5 ) {
      endGameSound.play();
      
      helper.saveResult();
      
      improveBtn.classList.add('show');
      return;
    }

    if ( currentLevel === previousLevel ) {
      restartBtn.classList.add('show');
      return;
    }
    
    if ( currentLevel !== previousLevel ) {
      nextBtn.classList.add('show');
      return;
    }
  }
  
  
  /**
   * Ends current game and shows "Restart" button.
   */
  function handleDraw() {
    infoBox.textContent = "Draw! <3";

    drawSound.play();
    
    character.changeMood('draw');
    character.say('draw');

    for ( var i = 0; i < tds.length; i++ ) {
      tds[i].removeEventListener('click', handleClick);
    }

    character.stop();

    restartBtn.classList.add('show');
  }
  
  
  /**
   * Highlights matched elements.
   * @param {HTMLElement} item
   */
  function hgMatches(item) {
    matchedSound.play();
    
    item.classList.remove('clicked');
    item.classList.add('matched');
  }
  
  /************************************
  *************************************
  *******USING ONLY BY getPositions****
  *************************************
  *************************************/
  
  
  
  
  
  
  
  
  
  
  
  
  /**
   * Update levels info.
   * Creates DOM element for each name in "playersNames".
   * Puts "beaten" class on element if
   * current level is more than previous.
   */
  function updateLvlInfo() {
    var lvlinfo = document.querySelector('.level-info');
    
    if ( currentLevel === 1 ) {
      lvlinfo.innerHTML = '';
      
      for ( var i = 1; i < playersNames.length + 1; i++ ) {
        
        var p = document.createElement("p");
        var span = document.createElement("span");
        
        if ( i === currentLevel ) {
          p.classList.add('current');
        }
        
        p.textContent = "Level ";

        span.textContent = i;
        span.style.color = playersColors[i - 1];

        p.appendChild(span);
        
        if ( i === 1 ) {
          p.innerHTML += ' (Easy)';
        }
        
        if ( i === 2 ) {
          p.innerHTML += ' (Normal)';
        }
        
        if ( i === 3 ) {
          p.innerHTML += ' (Hard)';
        }
        
        if ( i === 4 ) {
          p.innerHTML += ' (Nightmare)';
        }

        lvlinfo.appendChild(p);
      }
      
      return;
    }
    
    if ( currentLevel > previousLevel ) {
      lvlinfo.children[currentLevel - 1].classList.add('current');
      
      lvlinfo.children[previousLevel - 1].classList.remove('current');
      lvlinfo.children[previousLevel - 1].classList.add('beaten');
    }
  }
  
  
  /**
   * Sets name of the character
   * we're currently playing with.
   */
  function changePlayerName() {
    var nameBox = document.querySelector('.char-name');
    var name = playersNames[currentLevel - 1];

    var first = name[0].toUpperCase();
    var rest = '';

    for (var i = 1; i < name.length; i++) {
      rest += name[i];
    }

    fixedCharName = first + rest;

    if ( fixedCharName === 'Krabs' ) {
      nameBox.textContent = 'Mr. ' + fixedCharName;
      nameBox.style.color = playersColors[currentLevel -1];

      fixedCharName = 'Mr. ' + fixedCharName;

      return;
    }

    nameBox.textContent = fixedCharName;
    nameBox.style.color = playersColors[currentLevel -1];
  }
  
  
  /**
   * Changes level's background.
   */
  function changeLvlBg() {
    var page = document.querySelector('.page-wrap');

    if ( currentLevel === 1 ) {
      page.classList.remove('lvl-two');
      page.classList.remove('lvl-three');
      page.classList.remove('lvl-four');
      page.classList.add('lvl-one');
      return;
    }

    if ( currentLevel === 2 ) {
      page.classList.remove('lvl-one');
      page.classList.remove('lvl-three');
      page.classList.remove('lvl-four');
      page.classList.add('lvl-two');
      return;
    }

    if ( currentLevel === 3 ) {
      page.classList.remove('lvl-one');
      page.classList.remove('lvl-two');
      page.classList.remove('lvl-four');
      page.classList.add('lvl-three');
      return;
    }

    if ( currentLevel === 4 ) {
      page.classList.remove('lvl-one');
      page.classList.remove('lvl-two');
      page.classList.remove('lvl-three');
      page.classList.add('lvl-four');
      return;
    }
  }
  
  
  /**
   * Increase "currentLevel" variable by 1
   */
  function increaseLevel() {
    currentLevel++;
  }
  
  
  /**
   * Says which turn, depending on "turn" variable.
   * It "turn" equals 1 - player's turn.
   * Otherwise it is characher's turn.
   */
  function whichTurn() {
    if (turn === 1) {
      infoBox.innerHTML = "It's <span>Your</span> turn";
    } else {
      infoBox.innerHTML = "It's <span style=\"color:" + 
                          playersColors[currentLevel - 1] + 
                          "\">" + fixedCharName + 
                          "</span>'s turn";
    }
  }
  
  
  /**
   * Remove events handlers, "animated", "clicked" classes.
   * @param {function} clickHandler - Handler will removed
   */
  function resetCircles(clickHandler) {
    
    for ( var i = 0; i < tds.length; i++ ) {
    
      if ( tds[i].classList.contains('animated') ) {
        tds[i].classList.remove('animated');
      } else {
        tds[i].classList.add('animated');
      }

      if ( tds[i].classList.contains('matched') ) {
        tds[i].classList.remove('matched');
      }

      tds[i].textContent = '';
      tds[i].classList.remove('clicked');
      tds[i].removeAttribute('id');

      tds[i].addEventListener('click', clickHandler);
    }
    
  }
  
  
  /**
   * Choose character, depending on what level
   * we are currently at.
   */
  function chooseCharacter() {
    if ( currentLevel === 1 ) {
      character = new Patrick();
      return;
    }

    if ( currentLevel === 2 ) {
      character = new Squidward();
      return;
    }

    if ( currentLevel === 3 ) {
      character = new Krabs();
      return;
    }

    if ( currentLevel === 4 ) {
      character = new Plankton();
      return;
    }
  }
  
  
  /**
   * Makes main menu visible, and wait until
   * difficulty is chosen. When it is chosen,
   * hides main menu.
   */
  function chooseDifficulty() {
    var popup = document.querySelector('.pop-up');
    popup.style.display = 'block';
    
    

    var btns = document.querySelectorAll('.pop-up .difficulty');
    
    for ( var i = 0; i < btns.length; i++ ) {
      btns[i].addEventListener('click', function(e){
        e.preventDefault();
        
        isDiffChosen = true;
        
        btnPressSound.play();
        
        helper.playMusic();
        
        var value = e.target.textContent;

        if ( value === 'Easy' ) {
          gameLives = 3;
        }

        if ( value === 'Hard' ) {
          gameLives = 1;
        }

        if ( value === 'Insane' ) {
          gameLives = 0;
        }
        
        updateLives();
        
        time = helper.getTime();
        
        setInterval(helper.showCurGameTime, 1000);
        
        popup.style.display = 'none';
        
      });
    }

  }
  
  
  /**
   * Shows how many lives player has,
   * depending on what difficulty he chose.
   */
  function updateLives() {
    var livesBoxWrap = document.querySelector('.player-lives p');
    var livesBox = document.querySelector('.lives-count');
    
    var text = document.createElement('span');
    text.classList.add('last');
    
    if ( gameLives > 1 || gameLives === 0 ) {
      livesBox.textContent = gameLives;
      text.textContent = ' lives left'
      
      if ( livesBoxWrap.lastElementChild.classList.contains('last') ) {
        livesBoxWrap.removeChild(livesBoxWrap.lastElementChild);
      }
      
      livesBoxWrap.appendChild(text);
      return;
    }
    
    if ( gameLives === 1 ) {
      livesBox.textContent = gameLives;
      text.textContent = ' life left'
      
      if ( livesBoxWrap.lastElementChild.classList.contains('last') ) {
        livesBoxWrap.removeChild(livesBoxWrap.lastElementChild);
      }
      
      livesBoxWrap.appendChild(text);
      return;
    }
    
    if ( gameLives < 0 ) {
      return;
    }
    
    
  }
  
  
  /**
   * Changes background music,
   * depending on what current level are.
   */
  function playMusic() {
    
    if ( !isDiffChosen ) {
      music.pause();
      music = new Audio('sounds/menu.mp3');
      music.play();
      return;
    }
    
    
    if ( currentLevel === 1 && isDiffChosen ) {
      music.pause();
      music = new Audio('sounds/level_one.mp3');
      music.play();
      return;
    }
    
    if ( currentLevel === 2 ) {
      music.pause();
      music = new Audio('sounds/level_two.mp3');
      music.play();
      return;
    }
    
    if ( currentLevel === 3 ) {
      music.pause();
      music = new Audio('sounds/level_three.mp3');
      music.play();
      return;
    }
    
    if ( currentLevel === 4 ) {
      music.pause();
      music = new Audio('sounds/level_four.mp3');
      music.play();
      return;
    }
  }
  
  
  /**
   * We need these milliseconds in our
   * "changeDifficulty" and "saveResul" functions.
   * @returns {number} milliseconds
   */
  function getTime() {
    var date = new Date();
    return date.getTime();
  }
  
  
  /**
   * Write result in both "best result" and "previous result"
   * if player finishes game in first time. And re-write
   * "best result" if new result is better.
   * Always re-write "previous result".
   */
  function saveResult() {
    var container = document.querySelector('.game-results');

    var best = document.querySelector('.game-results .best-number');
    var prev = document.querySelector('.game-results .prev-number');

    var prevResult = best.children[0].textContent;

    var curTime = helper.getTime();

    var seconds = (curTime - time) / 1000;


    if ( seconds < 60 ) {
      seconds = seconds.toFixed(0);

      if ( prevResult === '' ) {
        best.children[0].textContent = seconds;
        prev.children[0].textContent = seconds;
        best.children[1].textContent = ' seconds';
        prev.children[1].textContent = ' seconds';
        return;
      }

      if ( best.children[2].textContent !== '' ) {
        best.children[2].textContent = '';
        best.children[3].textContent = '';

        best.children[0].textContent = seconds;
        best.children[1].textContent = ' seconds';
      }

      if ( Number(seconds) < Number(prevResult) ) {
        best.children[0].textContent = seconds;
        best.children[1].textContent = ' seconds';
      }

      if ( prev.children[2].textContent !== '' ) {
        prev.children[2].textContent = '';
        prev.children[3].textContent = '';
      }

      prev.children[0].textContent = seconds;
      prev.children[1].textContent = ' seconds';

      return;
    }

    var minutes = 0;

    while ( seconds >= 60 ) {

      seconds = seconds - 60;

      minutes++;

    }

    seconds = seconds.toFixed(0);

    if ( prevResult === '' ) {
      best.children[0].textContent = minutes;
      best.children[1].textContent = ' minutes '
      best.children[2].textContent = seconds;
      best.children[3].textContent = ' seconds';

      prev.children[0].textContent = minutes;
      prev.children[1].textContent = ' minutes '
      prev.children[2].textContent = seconds;
      prev.children[3].textContent = ' seconds';

      if ( minutes === 1 ) {
        prev.children[1].textContent = ' minute '
        best.children[1].textContent = ' minute '
      }

      return;
    }

    if ( Number(best.children[0].textContent) >= minutes ) {

      if ( best.children[2].textContent !== '' && Number(best.children[2].textContent) > seconds ) {

        best.children[0].textContent = minutes;
        best.children[1].textContent = ' minutes '
        best.children[2].textContent = seconds;
        best.children[3].textContent = ' seconds';

        if ( minutes === 1 ) {
          best.children[1].textContent = ' minute '
        }
      }
    }

    prev.children[0].textContent = minutes;
    prev.children[1].textContent = ' minutes '
    prev.children[2].textContent = seconds;
    prev.children[3].textContent = ' seconds';

    if ( minutes === 1 ) {
      prev.children[1].textContent = ' minute '
    }
  }
  
  
  /**
   * Shows time, spent at this moment.
   * Will be called in "chooseDifficulty" function.
   * Requires "time" variable to be a number.
   */
  function showCurGameTime() {
    
    var mNumBox = document.querySelector('.spent-time span:nth-child(1)'),
        sNumBox = document.querySelector('.spent-time span:nth-child(3)'),
        mTxtBox = document.querySelector('.spent-time span:nth-child(2)'),
        sTxtBox = document.querySelector('.spent-time span:nth-child(4)');
    
    var curTime = helper.getTime();
    
    var seconds = (curTime - time) / 1000;
    
    seconds = seconds.toFixed(0);
    
    if ( seconds < 60 ) {
      
      mNumBox.textContent = '';
      mTxtBox.textContent = '';
      sNumBox.textContent = seconds;
      
      if ( seconds <= 1 ) {
        sTxtBox.textContent = ' second';
        return;
      }
      
      sTxtBox.textContent = ' seconds';
      return;
    }
    
    var minutes = 0;
    
    while ( seconds >= 60 ) {
      seconds = seconds - 60;
      minutes++;
    }
    
    mNumBox.textContent = minutes;
    mTxtBox.textContent = ' minutes';
    sNumBox.textContent = seconds;
    sTxtBox.textContent = ' seconds';
    
    if ( minutes === 1 ) {
      mTxtBox.textContent = ' minute';
    }
    
    if ( seconds === 1 ) {
      sTxtBox.textContent = ' second';
    }
    
  }
  
  
  
  
  
  
 return {
    getPositions     : getPositions,
   
    showCurGameTime  : showCurGameTime,
    saveResult       : saveResult,
    getTime          : getTime,
    playMusic        : playMusic,
    updateLvlInfo    : updateLvlInfo,
    changePlayerName : changePlayerName,
    changeLvlBg      : changeLvlBg,
    increaseLevel    : increaseLevel,
    
    chooseCharacter  : chooseCharacter,
    chooseDifficulty : chooseDifficulty,
    resetCircles     : resetCircles,
    whichTurn        : whichTurn
  }
  
  
  
}());