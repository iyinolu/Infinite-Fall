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
	var blockLast = document.getElementById("block"+(counter-1));
	var holeLast = document.getElementById("hole"+(counter-1));
	if (counter > 0) {
		var blockLastTop =
		parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"))
		var holeLastTop = 
		parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"))
	}
	// else {
	// 	var blockLastTop = 0;
	// 	var holeLastTop = 0;
	// }
	
	if (blockLastTop < 400 || counter == 0) {
		// create the two divs for block and hole
		var block = document.createElement('div');
		var hole = document.createElement('div');

		// set block and hole class and id attributes
		block.setAttribute("class", "block");
		hole.setAttribute("class", "hole");
		hole.setAttribute("id", "hole"+counter);
		block.setAttribute("id", "block"+counter);

		// style the block and the hole appropriately
		block.style.top = blockLastTop + 100 + 'px';
		hole.style.top = holeLastTop + 100 + 'px';
		// console.log(blockLastTop);

		var random = Math.floor(Math.random() * 360);
		hole.style.left = random + "px";
		game.appendChild(block);
		game.appendChild(hole);
		currentBlocks.push(counter);
		counter++
	
	}
	characterTop = 
	parseInt(window.getComputedStyle(character).getPropertyValue("top"));
	characterLeft = 
	parseInt(window.getComputedStyle(character).getPropertyValue("left"));
	var drop = 0;
	console.log(characterTop);

	if (characterTop <= 0) {
		alert("Game Over. Score " + (counter-9));
		clearInterval(blocks);
		location.reload();
	}
	for (var i = 0; i < currentBlocks.length; i++) {
		let current = currentBlocks[i];
		let iblock = document.getElementById("block"+current);
		let ihole = document.getElementById("hole"+current);
	
		iblockTop = 
		parseFloat(window.getComputedStyle(iblock).getPropertyValue('top')); 
		iholeLeft = 
		parseFloat(window.getComputedStyle(ihole).getPropertyValue('left')); 
		
		// push block and hole upwards
		iblock.style.top = iblockTop - 0.8 + 'px';
		ihole.style.top = iblockTop - 0.8 + 'px';

		// check if block has exceeded game container by -20px
		if (iblockTop < -20) {
			// remove the block that exceeded boundary (topmost block) and update currentBlock array
			currentBlocks.shift();
			iblock.remove();
			ihole.remove();
		}

		// check for drop condition
		if (iblockTop-20 <= characterTop && iblockTop > characterTop) {
			drop++;
			if (iholeLeft<=characterLeft && iholeLeft+20 >= characterLeft) {
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
}, 1);
