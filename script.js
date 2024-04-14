var jet = document.getElementById("jet");
var board = document.getElementById("board");
var lives = 3;
var level = 1;
var rockSpeed = 700;
var rockCount = 0;
var generaterocks;
var gameStarted = false; 

const nivel = document.getElementById('level');

window.addEventListener("keydown", (e) => {
  if (!gameStarted && e.keyCode === 32) {
    gameStarted = true;
    startGame();
}

  if (gameStarted) {
    var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
    if (e.key == "ArrowLeft" && left > 0) {
    jet.style.left = left - 10 + "px";
    }
    else if (e.key == "ArrowRight" && left <= 460) {
    jet.style.left = left + 10 + "px";
    }

    if (e.key == "ArrowUp" || e.keyCode == 32) {
      var bullet = document.createElement("div");
      bullet.classList.add("bullets");
      board.appendChild(bullet);

      var movebullet = setInterval(() => {
        var rocks = document.getElementsByClassName("rocks");

        for (var i = 0; i < rocks.length; i++) {
          var rock = rocks[i];
          if (rock != undefined) {
            var rockbound = rock.getBoundingClientRect();
            var bulletbound = bullet.getBoundingClientRect();


            if (
            bulletbound.left >= rockbound.left &&
            bulletbound.right <= rockbound.right &&
            bulletbound.top <= rockbound.top &&
            bulletbound.bottom <= rockbound.bottom
            ) {
            rock.parentElement.removeChild(rock);
            document.getElementById("points").innerHTML =
              parseInt(document.getElementById("points").innerHTML) + 1;
          }
        }
      }
      var bulletbottom = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("bottom")
      );

      if (bulletbottom >= 500) {
        clearInterval(movebullet);
      }

      bullet.style.left = left + "px"; 
      bullet.style.bottom = bulletbottom + 3 + "px";
    });
  }
  }
});

function startGame() {
  generateRocks();
}

function generateRocks() {
  generaterocks = setInterval(() => {
    if(gameStarted){
      var rock = document.createElement("div");
    rock.classList.add("rocks");

    var rockleft = Math.floor(Math.random() * (460 - 20) + 20);
    rock.style.left = rockleft + "px";

    board.appendChild(rock);

    var moverock = setInterval(() => {
      var rocktop = parseInt(window.getComputedStyle(rock).getPropertyValue("top"));
      rock.style.top = rocktop + 20 + "px";

      var rockbound = rock.getBoundingClientRect();
      var jetbound = jet.getBoundingClientRect();

      if (
        rockbound.left <= jetbound.right &&
        rockbound.right >= jetbound.left &&
        rockbound.top <= jetbound.bottom &&
        rockbound.bottom >= jetbound.top
      ) {
        lives--;
        document.getElementById("lives").innerHTML = lives;
        if (lives <= 0) {
          alert("Game Over");
          clearInterval(moverock);
          clearInterval(generaterocks);
          window.location.reload();
        }
        rock.parentElement.removeChild(rock);
      }

      if (rocktop >= 500) {
        rockCount --;
        rock.parentElement.removeChild(rock);
      }
    }, rockSpeed);
    rockCount++;

    if (rockCount >= 15) {
      level++;
      nivel.textContent = level;
      clearInterval(generaterocks);
      rockSpeed -= 100;
      rockCount = 0;
      generateRocks();
    }
    }
  }, 2000);
}

generateRocks();


