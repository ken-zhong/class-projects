var showingWinScreen = false;
var showingTitleScreen = true;

var canvas = document.querySelector('#gameCanvas'); //the canvas
var canvasContext;  //the stuff inside the canvas
var ballX = canvas.width/2; //x position of ball
var ballY = canvas.height/2; //y position of ball
var ballSpeedX = -7;
var ballSpeedY = 0;
var aiSpeed = 5;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 15;

var player1Score = 0;
var player2Score = 0;
const WINNING_SCORE = 5;

var soundFX = document.querySelector('#plop')

//window.onload lets you wait for everything to load before it starts running stuff
window.onload = function(){
    //canvas = document.querySelector('#gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 60;
    setInterval(function(){
        moveEverything();
        drawEverything();
    }, 1000/framesPerSecond);

    canvas.addEventListener('mousemove',
        function(evt){
            var mousePos = calculateMousePos(evt);
            paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
        })

    canvas.addEventListener('mousedown', handleMouseClick);

}

function handleMouseClick(evt){
    if(showingWinScreen){
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false;
    }

    if(showingTitleScreen){
        player1Score = 0;
        player2Score = 0;
        showingTitleScreen = false;
    }
}

function computerMovement(){
    if(paddle2Y+(PADDLE_HEIGHT/2) > ballY+35){
        paddle2Y -= aiSpeed;
    } else if(paddle2Y+(PADDLE_HEIGHT/2) < ballY-35){
        paddle2Y += aiSpeed;
    }
}

function moveEverything(){

   if(showingWinScreen){
       return;
   }

   if(showingTitleScreen){
       return;
   }

    computerMovement();
    ballX = ballX + ballSpeedX;
    if(ballX >= canvas.width-PADDLE_THICKNESS){
        if(ballY > paddle2Y && ballY < paddle2Y+PADDLE_HEIGHT){
            soundFX.play();
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY - (paddle2Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player1Score++;
            ballReset();
        }
    } else if(ballX <= PADDLE_THICKNESS){
        if(ballY > paddle1Y && ballY < paddle1Y+PADDLE_HEIGHT){
            soundFX.play();
            ballSpeedX = -ballSpeedX;
            var deltaY = ballY - (paddle1Y+PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.25;
        } else {
            player2Score++;
            ballReset();
        }
    }

    ballY = ballY + ballSpeedY;
    if(ballY >= canvas.height){
        ballSpeedY = -ballSpeedY;
    } else if(ballY <= 0){
        ballSpeedY = -ballSpeedY;
    }
}

function drawEverything(){
     // next line blacks out the canvas
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    canvasContext.fillStyle = 'yellow';
    canvasContext.font = "20px Courier";

    if(showingWinScreen){
        if(player1Score >= WINNING_SCORE){
            canvasContext.fillText("Player 1 Won!", 320, 200)
        } else if(player2Score >= WINNING_SCORE){
            canvasContext.fillText("Player 2 Won!", 320, 200)
        }

        canvasContext.fillText("Click to play again!", 280, 300);
        return;
    }

    if(showingTitleScreen){
        canvasContext.font = "40px Courier";
        canvasContext.fillText("PONG", 350, 200)
        canvasContext.font = "20px Courier";
        canvasContext.fillText("Click to start!", 310, 350);
        canvasContext.fillText("Play to " + WINNING_SCORE, 340, 400);
        return;
    }

    // draw the net!
    drawNet();
    //player paddle
    colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
    //paddle 2
    colorRect(canvas.width-PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
    //ball colorRect(ballX, ballY, 10, 10, 'red');
    colorCircle(ballX, ballY, 10, 'yellow');

    // scoreboard
    canvasContext.fillText(player1Score, 100, 100);
    // p2 scoreboard
    canvasContext.fillText(player2Score, canvas.width-100, 100);
}

function drawNet(){
    for(var i = 10; i < canvas.height; i+= 40){
        colorRect(canvas.width/2, i, 2, 20, 'white');
    }
}

function colorRect(leftX, topY, width, height, drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

function colorCircle(centerX, centerY, radius, drawColor){
    canvasContext.fillStyle = drawColor
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
    canvasContext.fill();
}

function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect(); // gets canvas bounds
    var root = document.documentElement;
    // gets us coordinates ONLY from within the canvas
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt. clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

function ballReset(){
    if(player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE  ){
        showingWinScreen = true;
    }
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    var newSpeed = -ballSpeedX;
    ballSpeedX = 0;
    ballSpeedY = 0;
    setTimeout(() => { ballSpeedX = newSpeed }, 1000 )
}
