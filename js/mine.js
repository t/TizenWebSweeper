    $.fn.extend({
      MineSweeper: function(config){
        $(this).empty();
    	  
        var opened = [];
        var mines  = [];

        var is_mine = function(x, y){
          return mines[y * config.y_count + x]; 
        }

        var get_value = function(x, y){
          if(is_mine(x, y)){
            return "X";
          }else{
            var count = 0;
            for(i = -1; i < 2; i++){
              for(j = -1; j < 2; j++){
                if(is_mine(x + i, y + j)){
                  count++;
                }
              }
            }
            if(count == 0){
              return "";
            }else{
              return count;
            }
          }
        }

        var open_cell = function(x, y){
          if(! ( x >= 0 && x < config.x_count && y >= 0 && y < config.y_count) ) return;
          cell = $("#" + x + "_" + y);
          if(! cell) return;
          id = y * config.y_count + x;
          if(opened[id]) return;
          var v = get_value(x, y);

          cell.css("background", "url('tile2.gif')");
          cell.text(v); 
          opened[id] = 1;

          if(v == ""){
            open_cell(x, y - 1);
            open_cell(x + 1, y); 
            open_cell(x, y + 1);
            open_cell(x - 1, y);
          }

          return (v == "X");
        }

        var open_all_cell = function(){
          for(x = 0; x < config.x_count; x++){
            for( y = 0; y < config.y_count; y++){
              if(is_mine(x, y)){
                open_cell(x, y);
               }
            }
          }
        }
      
        var map = $('<div style="width:320px;"></div>');
        map.appendTo($(this));
        for(x = 0; x < config.x_count; x++){
          for(y = 0; y < config.y_count; y++){
            var cell = document.createElement('div');
            cell.id        = x + "_" + y;
            cell.innerHTML = "&nbsp;";
            cell.className = "cell";
            $(cell).appendTo(map);
            $(cell).bind("click", {x: x, y: y}, function(e){
              if( open_cell(e.data.x, e.data.y) ){
                open_all_cell();
                alert("game over");
              }
              return false;
            });
          }
        }   
        for(i = 0; i < config.mine_count; i++){
          while(true){
            var rand = Math.floor( Math.random() * config.x_count * config.y_count );
            if(! mines[rand] ){
              mines[rand] = 1;
              break;
            }
          }
        }
      },
    });


