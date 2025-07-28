var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var scoreDiv = document.getElementById("score");
var musicBtn = document.getElementById("musicBtn");
var bgMusic = document.getElementById("bgMusic");
var playBtn = document.getElementById("playBtn");
var playOverlay = document.getElementById("playOverlay");

var jumping = 0;
var counter = 0;
var score = 0;
var musicOn = true;
var gameStarted = false;

// Play Button
playBtn.addEventListener('click', function() {
    playOverlay.style.display = 'none';
    gameStarted = true;
    document.addEventListener('click', jump);
    score = 0;
    scoreDiv.textContent = 'Score: ' + score;
});

// Music Button
musicBtn.addEventListener('click', function() {
    musicOn = !musicOn;
    if(musicOn) {
        bgMusic.play();
        musicBtn.textContent = '🔊 Muzică: Pornit';
    } else {
        bgMusic.pause();
        musicBtn.textContent = '🔇 Muzică: Oprit';
    }
});

hole.addEventListener('animationiteration', () => {
    var random = -((Math.random()*300)+150);
    hole.style.top = random + "px";
    counter++;
    if(gameStarted) {
        score++;
        scoreDiv.textContent = 'Score: ' + score;
    }
});

setInterval(function(){
    if(!gameStarted) return;
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if(jumping==0){
        character.style.top = (characterTop+3)+"px";
    }
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(500-characterTop);
    if((characterTop>470)||((blockLeft<30)&&(blockLeft>-50)&&((cTop<holeTop)||(cTop>holeTop+130)))){
        alert("Game over. Score: " + score);
        character.style.top = 100 + "px";
        counter=0;
        score=0;
        scoreDiv.textContent = 'Score: ' + score;
        gameStarted = false;
        playOverlay.style.display = 'flex';
    }
},10);

function jump(){
    if(!gameStarted) return;
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop>6)&&(jumpCount<12)){
            character.style.top = (characterTop-6)+"px";
        }
        if(jumpCount>18){
            clearInterval(jumpInterval);
            jumping=0;
            jumpCount=0;
        }
        jumpCount++;
    },10);
}
