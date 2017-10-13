var dataHandler = (function() {
  
  
  
  /**
   * Calls the rest dataHandler's methods to
   * take data from given object if needed.
   * Gives these methods the same object.
   * @param {Object} charsData
   */
  function updateCharsData(charsData) {
  
    if ( !playersNames[0] ) {
      getPlayersNames(charsData);
    }

    if ( !playersColors[0] ) {
      getPlayersColors(charsData);
    }

    changePlayerImages(charsData);

    getPlayerPhrases(charsData);
    
  }
  
  
  
  /************************************
  *************************************
  ****USING ONLY BY updateCharsData****
  *************************************
  *************************************/
  
  
  /**
   * Takes names from the object.
   * @param {Object} charsData
   */
  function getPlayersNames(charsData) {
    playersNames = Object.keys(charsData);
  }
  
  
  /**
   * Takes colors from the object.
   * @param {Object} charsData
   */
  function getPlayersColors(charsData) {
    var name;
    for ( var i = 0; i < playersNames.length; i++ ) {
      name = playersNames[i];
      playersColors.push(charsData[name].color);
    }
  }
  
  /**
   * Takes images from the object.
   * @param {Object} charsData
   */
  function changePlayerImages(charsData) {
    var imgBox = document.querySelector('.player-image');

    imgBox.textContent = '';

    charsData[playersNames[currentLevel - 1]].images.map(function(item, i) {

      var img = document.createElement('img');
      img.setAttribute('src', item.src);
      img.setAttribute('id', item.id);
      img.setAttribute('alt', item.alt);
      imgBox.appendChild(img);

    });

    return;
  }
  
  /**
   * Takes phrases from the object.
   * @param {Object} charsData
   */
  function getPlayerPhrases(charsData) {
    playerPhrases = {};

    charsData[playersNames[currentLevel - 1]].phrases.map(function(item, i) {
      playerPhrases[item.state] = item.phrase;
    });

    return;
  }
  
  /************************************
  *************************************
  ****USING ONLY BY updateCharsData****
  *************************************
  *************************************/
  
  
  return {
    
    updateCharsData : updateCharsData
    
  }
  
  
}());