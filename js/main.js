//Initialize function
var init = function () {
    // TODO:: Do your initialization job
    console.log("init() called");

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
            tizen.application.getCurrentApplication().exit();
    });

	$("#minesweeper").MineSweeper({x_count:17, y_count:17, mine_count:20});
	$("#reset").click(function(){
		$("#minesweeper").MineSweeper({x_count:17, y_count:17, mine_count:20});		
	});
};
$(document).bind('pageinit', init);