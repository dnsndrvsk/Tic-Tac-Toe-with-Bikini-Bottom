(function(){
  
  var Patrick = function() {
    
    this.handleTurn = function() {
      clickSound.play();
      turn = 1;
      turnsCounter++;

      var img = document.createElement('img');
      img.setAttribute('src', 'img/patrick2.png');

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
      
      var coordinats = [
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
              coordinats[i].one = true;
              continue;
            }
            
            if ( k === 1 ) {
              coordinats[i].two = true;
              continue;
            }
            
            if ( k === 2 ) {
              coordinats[i].three = true;
              continue;
            }
          }
        }
      }
      
      // HORIZONTAL MATCHES
      if ( coordinats[0].one && coordinats[0].two ) {
        
        place = table.children[0].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( coordinats[0].two && coordinats[0].three ) {
        
        place = table.children[0].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( coordinats[0].one && coordinats[0].three ) {
        
        place = table.children[0].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      if ( coordinats[1].one && coordinats[1].two ) {
        
        place = table.children[1].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( coordinats[1].two && coordinats[1].three ) {
        
        place = table.children[1].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( coordinats[1].one && coordinats[1].three ) {
        
        place = table.children[1].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      if ( coordinats[2].one && coordinats[2].two ) {
        
        place = table.children[2].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( coordinats[2].two && coordinats[2].three ) {
        
        place = table.children[2].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( coordinats[2].one && coordinats[2].three ) {
        
        place = table.children[2].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      
      // VERTICAL MATCHES
      if ( coordinats[0].one && coordinats[1].one ) {
        
        place = table.children[2].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( coordinats[1].one && coordinats[2].one ) {
        
        place = table.children[0].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( coordinats[0].one && coordinats[2].one ) {
        
        place = table.children[1].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      if ( coordinats[0].two && coordinats[1].two ) {
        
        place = table.children[2].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( coordinats[1].two && coordinats[2].two ) {
        
        place = table.children[0].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( coordinats[0].two && coordinats[2].two ) {
        
        place = table.children[1].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      if ( coordinats[0].three && coordinats[1].three ) {
        
        place = table.children[2].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( coordinats[1].three && coordinats[2].three ) {
        
        place = table.children[0].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( coordinats[0].three && coordinats[2].three ) {
        
        place = table.children[1].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      
      // LEFT TO RIGHT DIAGONAL MATCHES
      if ( coordinats[0].one && coordinats[1].two ) {
        
        place = table.children[2].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( coordinats[1].two && coordinats[2].three ) {
        
        place = table.children[0].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( coordinats[0].one && coordinats[2].three ) {
        
        place = table.children[1].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      
      // RIGHT TO LEFT DIAGONAL MATCHES
      if ( coordinats[0].three && coordinats[1].two ) {
        
        place = table.children[2].children[0];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( coordinats[2].one && coordinats[1].two ) {
        
        place = table.children[0].children[2];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      if ( coordinats[0].three && coordinats[2].one ) {
        
        place = table.children[1].children[1];
        
        if ( !place.id ) {
          putItem(place);
          return;
        }
      }
      
      
      
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
  
  Patrick.prototype = Character;
  
  window.Patrick = Patrick;
  
}());