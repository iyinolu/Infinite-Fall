var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var both = 0;
var currentBlocks = [];


// For Round Ball Movement
function moveLeft() {
	var left =
	parseInt(window.getComputedStyle(character).getPropertyValue("left"));
	if (left > 0) {
		character.style.left = left - 2 + "px";
	}
}

function moveRight() {
	var left =
	parseInt(window.getComputedStyle(character).getPropertyValue("left"));
	if (left < 380) {
		character.style.left = left + 2 + "px";
	}
}


document.addEventListener("keydown", event => {
	if (both==0) {
		both++;
		if (event.key === 'ArrowLeft') {
			interval = setInterval(moveLeft, 0.5);
		}
		if (event.key === 'ArrowRight') {
			interval = setInterval(moveRight, 0.5);
		}
	}
});


document.addEventListener("keyup", event => {
	clearInterval(interval);
	both=0;
});


var counter = 0;

// For Horizontal Base
var blocks = setInterval(function () {

	var blockLast = document.getElementById("blockLeft"+(counter-1));

	if (counter > 0) {
		var blockLastTop =
		parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
		
	}
	// else {
	// 	var blockLastTop = 0;
	// 	var holeLastTop = 0;
	// }
	
	if (blockLastTop < 400 || counter == 0) {
		// create the two divs for block and hole
		var block_left = document.createElement('div');
		var block_right = document.createElement('div');

		// set block and hole class and id attributes
		block_left.setAttribute("class", "block-left");
		block_right.setAttribute("class", "block-right");
		block_left.setAttribute("id", "blockLeft" + counter);
		block_right.setAttribute("id", "blockRight" + counter);
                         
		// style the block and the hole appropriately
		block_left.style.top = blockLastTop + 100 + 'px';
        block_right.style.top = blockLastTop + 100 + 'px';
        
        
		
        // randomly position the drop holes
        var random = Math.floor(Math.random() * 330);
        var left_x = random;
        var middle = left_x + 10;
        var right_x = 360-middle;
        block_left.style.width = left_x + "px";
        block_right.style.width = right_x + "px";
        
        // add left and right blocks to the window
		game.appendChild(block_left);
		game.appendChild(block_right);
        currentBlocks.push(counter);
		counter++
	
	}
	characterTop = 
	parseInt(window.getComputedStyle(character).getPropertyValue("top"));
	characterLeft = 
	parseInt(window.getComputedStyle(character).getPropertyValue("left"));
	var drop = 0;


	if (characterTop <= 0) {
		// alert("Game Over. Score " + (counter-9));
		clearInterval(blocks);
		// location.reload();
    }
    
	for (var i = 0; i < currentBlocks.length; i++) {
		let current = currentBlocks[i];
        let iblock_left = document.getElementById("blockLeft"+current);
        let iblock_right = document.getElementById("blockRight"+current);
		
	
		iblockTop = 
        parseFloat(window.getComputedStyle(iblock_left).getPropertyValue('top'));
        iblockLeft = 
        parseFloat(window.getComputedStyle(iblock_left).getPropertyValue('width'));
        
        
		// push block and hole upwards
        iblock_left.style.top = iblockTop - 0.8 + 'px';
        iblock_right.style.top = iblockTop - 0.8 + 'px';
		

		// check if block has exceeded game container by -20px
		if (iblockTop <= -20) {
			// remove the block that exceeded boundary (topmost block) and update currentBlock array
			currentBlocks.shift();
			iblock_left.remove();
            iblock_right.remove();
            
			
		}

		// check for drop condition
		if (iblockTop-20 <= characterTop && iblockTop > characterTop) {
			drop++;
			if (iblockLeft<=characterLeft && iblockLeft+40 >= characterLeft) {
				drop = 0;
			}
		}
    }
    if (drop == 0) {
        if (characterTop < 480) {
            character.style.top = characterTop + 2 + 'px';
        }
    }
    else {
        character.style.top = characterTop - 0.8 + 'px';
    }
}, 0.5);
