(function(){
  
  var Squidward = function() {
    
    this.handleTurn = function() {
      clickSound.play();
      turn = 1;
      turnsCounter++;

      var img = document.createElement('img');
      img.setAttribute('src', 'img/squid2.png');

      var table = document.querySelector('table').firstElementChild;
      
      var place;
      
      function putItem(place) {
        
        place.appendChild(img);
        place.setAttribute('id', 'o');
        place.classList.add('clicked');

        character.changeMood('wait');
        character.say('wait');

        helper.getPositions(place.parentElement, place);

        isAutoTurnFinished = true;
        return;
        
      }
      
      
      
      /****************************************************
      *****************************************************
      *****************CHARACTER COORDINATES***************
      *****************************************************
      ****************************************************/
      
      var charCoords = [
        {
          "one"  : false,
          "two"  : false,
          "three": false
        },
        {
          "one"  : false,
          "two"  : false,
          "three": false
        },
        {
          "one"  : false,
          "two"  : false,
          "three": false
        }
      ];
      
      for ( var i = 0; i < table.children.length; i++ ) {
        
        row = table.children[i];
        
        for ( var k = 0; k < row.children.length; k++ ) {
          
          if ( row.children[k].id === 'o' ) {
            
            if ( k === 0 ) {
              charCoords[i].one = true;
              continue;
            }
            
            if ( k === 1 ) {
              charCoords[i].two = true;
              continue;
            }
            
            if ( k === 2 ) {
              charCoords[i].three = true;
              continue;
            }
          }
        }
      }
      
      // HORIZONTAL MATCHES
      if ( charCoords[0].one && charCoords[0].two ) {
        
        place = table.children[0].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( charCoords[0].two && charCoords[0].three ) {
        
        place = table.children[0].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( charCoords[0].one && charCoords[0].three ) {
        
        place = table.children[0].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      if ( charCoords[1].one && charCoords[1].two ) {
        
        place = table.children[1].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( charCoords[1].two && charCoords[1].three ) {
        
        place = table.children[1].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( charCoords[1].one && charCoords[1].three ) {
        
        place = table.children[1].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      if ( charCoords[2].one && charCoords[2].two ) {
        
        place = table.children[2].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( charCoords[2].two && charCoords[2].three ) {
        
        place = table.children[2].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( charCoords[2].one && charCoords[2].three ) {
        
        place = table.children[2].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      
      // VERTICAL MATCHES
      if ( charCoords[0].one && charCoords[1].one ) {
        
        place = table.children[2].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( charCoords[1].one && charCoords[2].one ) {
        
        place = table.children[0].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( charCoords[0].one && charCoords[2].one ) {
        
        place = table.children[1].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      if ( charCoords[0].two && charCoords[1].two ) {
        
        place = table.children[2].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( charCoords[1].two && charCoords[2].two ) {
        
        place = table.children[0].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( charCoords[0].two && charCoords[2].two ) {
        
        place = table.children[1].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      if ( charCoords[0].three && charCoords[1].three ) {
        
        place = table.children[2].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( charCoords[1].three && charCoords[2].three ) {
        
        place = table.children[0].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( charCoords[0].three && charCoords[2].three ) {
        
        place = table.children[1].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      
      // LEFT TO RIGHT DIAGONAL MATCHES
      if ( charCoords[0].one && charCoords[1].two ) {
        
        place = table.children[2].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( charCoords[1].two && charCoords[2].three ) {
        
        place = table.children[0].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( charCoords[0].one && charCoords[2].three ) {
        
        place = table.children[1].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      
      // RIGHT TO LEFT DIAGONAL MATCHES
      if ( charCoords[0].three && charCoords[1].two ) {
        
        place = table.children[2].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( charCoords[2].one && charCoords[1].two ) {
        
        place = table.children[0].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( charCoords[0].three && charCoords[2].one ) {
        
        place = table.children[1].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      /****************************************************
      *****************************************************
      *****************CHARACTER COORDINATES***************
      *****************************************************
      ****************************************************/
      
      
      
      
      
      /****************************************************
      *****************************************************
      ****************PLAYER COORDINATES*******************
      *****************************************************
      ****************************************************/
      
      var playerCoords = [
        {
          "one"  : false,
          "two"  : false,
          "three": false
        },
        {
          "one"  : false,
          "two"  : false,
          "three": false
        },
        {
          "one"  : false,
          "two"  : false,
          "three": false
        }
      ];
      
      for ( var i = 0; i < table.children.length; i++ ) {
        
        row = table.children[i];
        
        for ( var k = 0; k < row.children.length; k++ ) {
          
          if ( row.children[k].id === 'x' ) {
            
            if ( k === 0 ) {
              playerCoords[i].one = true;
              continue;
            }
            
            if ( k === 1 ) {
              playerCoords[i].two = true;
              continue;
            }
            
            if ( k === 2 ) {
              playerCoords[i].three = true;
              continue;
            }
          }
        }
      }
      
      // HORIZONTAL MATCHES
      if ( playerCoords[0].one && playerCoords[0].two ) {
        
        place = table.children[0].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( playerCoords[0].two && playerCoords[0].three ) {
        
        place = table.children[0].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( playerCoords[0].one && playerCoords[0].three ) {
        
        place = table.children[0].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      if ( playerCoords[1].one && playerCoords[1].two ) {
        
        place = table.children[1].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( playerCoords[1].two && playerCoords[1].three ) {
        
        place = table.children[1].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( playerCoords[1].one && playerCoords[1].three ) {
        
        place = table.children[1].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      if ( playerCoords[2].one && playerCoords[2].two ) {
        
        place = table.children[2].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( playerCoords[2].two && playerCoords[2].three ) {
        
        place = table.children[2].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( playerCoords[2].one && playerCoords[2].three ) {
        
        place = table.children[2].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      
      // VERTICAL MATCHES
      if ( playerCoords[0].one && playerCoords[1].one ) {
        
        place = table.children[2].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( playerCoords[1].one && playerCoords[2].one ) {
        
        place = table.children[0].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( playerCoords[0].one && playerCoords[2].one ) {
        
        place = table.children[1].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      if ( playerCoords[0].two && playerCoords[1].two ) {
        
        place = table.children[2].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( playerCoords[1].two && playerCoords[2].two ) {
        
        place = table.children[0].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( playerCoords[0].two && playerCoords[2].two ) {
        
        place = table.children[1].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      if ( playerCoords[0].three && playerCoords[1].three ) {
        
        place = table.children[2].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( playerCoords[1].three && playerCoords[2].three ) {
        
        place = table.children[0].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( playerCoords[0].three && playerCoords[2].three ) {
        
        place = table.children[1].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      
      // LEFT TO RIGHT DIAGONAL MATCHES
      if ( playerCoords[0].one && playerCoords[1].two ) {
        
        place = table.children[2].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( playerCoords[1].two && playerCoords[2].three ) {
        
        place = table.children[0].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( playerCoords[0].one && playerCoords[2].three ) {
        
        place = table.children[1].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      
      // RIGHT TO LEFT DIAGONAL MATCHES
      if ( playerCoords[0].three && playerCoords[1].two ) {
        
        place = table.children[2].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( playerCoords[2].one && playerCoords[1].two ) {
        
        place = table.children[0].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( playerCoords[0].three && playerCoords[2].one ) {
        
        place = table.children[1].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      /****************************************************
      *****************************************************
      ****************PLAYER COORDINATES*******************
      *****************************************************
      ****************************************************/
      
      
      
      var row;
      var td;
      
      
      var randomOne = Math.round(Math.random() * 2);
      var randomTwo = Math.round(Math.random() * 2);
      
      row = table.children[randomOne];
      td = row.children[randomTwo];
      
      if ( !td.id ) {
        
        putItem(td);
        
        return;
        
      }
      
      for ( var i = 0; i < table.children.length; i++ ) {
        
        row = table.children[i];
        
        for ( var k = 0; k < row.children.length; k++ ) {
          
          td = row.children[k];
          
          if ( !td.id ) {

            putItem(td);
            
            return;
          }
          
        }
        
      } 
    }
    
  };
  
  Squidward.prototype = Character;
  
  window.Squidward = Squidward;
  
}());