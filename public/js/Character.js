(function(){
  
  var Character = {
    
    "say"       : function(string) {
      
      var playerDialog = document.querySelector('.player-dialog p');
      
      playerDialog.textContent = playerPhrases[string];
      
    },
    
    "changeMood" : function(string) {
      
      var playerImages = document.querySelectorAll('.player-image img');

      for ( var i = 0; i < playerImages.length; i++ ) {
        
        if ( playerImages[i].id === string ) {
          playerImages[i].style.display = 'block';
        } else {
          playerImages[i].style.display = 'none';
        }
        
      }
    },
    
    "stop"       : function() {
      
      this.save = this.handleTurn;
      this.handleTurn = '';
      
    },
    
    "continue"   : function() {
      
      this.handleTurn = this.save;
      this.save = '';
      
    }
  };
  
  window.Character = Character;
  
}());
