var numSquares = 6;
var colors = generateRandomColors(numSquares);
var squares = document.querySelectorAll(".square");
var pickedColor = pickColor();   // this needs to get randomized
var colorDisplay = document.querySelector("#colorDisplay");
var topbanner = document.querySelector("#topbanner");
var message = document.querySelector('#message');
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode")


colorDisplay.textContent = pickedColor;

init()

function init(){

	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");

			if(this.textContent === "Easy"){
				numSquares = 3;
			}
			else{
				numSquares = 6;
			}
	// or ternary operator:  this.textContent === "easy" ? numSquares = 3: numSquares = 6;
			reset()
		})

	}

	for(var i=0; i < squares.length; i++){
		//add click listeners to squares
		squares[i].addEventListener("click", function(){
			var clickedColor = this.style.background
			if(clickedColor === pickedColor){  
				message.textContent = "Correct!"
				changeColors(clickedColor);
				topbanner.style.background = pickedColor;
				resetButton.textContent = "Play again?" 

			}
			else{ 
				this.style.background = "#232323";
				message.textContent = "Try Again";
				}
		})
	}
	reset();
}

function reset(){

	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Game" 
	topbanner.style.background = "steelblue";
	message.textContent = "";
	resetButton.textContent = "New Colors";

	for(var i=0; i < squares.length; i++){
	//add initial colors to squares
		if(colors[i]){
		squares[i].style.display = "block";
		squares[i].style.background = colors[i]; }
		else{
		squares[i].style.display = "none";
		}
	}
}

resetButton.addEventListener("click", function(){
	reset() 
} )


function changeColors(color){
	for(var i = 0; i < squares.length; i++){
		squares[i].style.background = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length); 
	return colors[random];
}

function generateRandomColors(n){
	// make an array, adding n random colors to arr, and then return array
	var arr = [];
	for(i = 0; i < n; i++){
		arr.push(randomColors());
	}

	return arr;
}

function randomColors(){
	// pick a "red" from 0-255, a "green" from 0-255, and a "blue" from 0-255
	var r = Math.floor(Math.random()* 256)
	var g = Math.floor(Math.random()* 256)
	var b = Math.floor(Math.random()* 256)
	return "rgb(" + r + ", " + g + ", " + b + ")";
}