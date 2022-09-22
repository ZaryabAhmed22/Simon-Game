let buttonColor = ["red", "blue", "green", "yellow"];

//--Storing the computer generated pattern
let gamePattern = [];

//--Storing the user generated pattern
let userClickedPattern = [];

//--Level variable, initially at zero
let level = 0;

//--Started variable to check if the game has started
let started = false;

//-----game logic >> Putting all together -----//

//detecting a keypress to start the game
$(document).on("keypress", function (e) {
  //first checking if the game has started

  if (!started) {
    //Updating the h1 to Level 0
    $("h1").html(`Level ${level}`);

    //calling the computer pattern function
    nextSequence();
  }
});

//-- Creating a function to generate computer pattern
function nextSequence() {
  //Once nextSequence() is triggered, reseting the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColor[randomNumber];

  //adding the random chosen color to end of the gamePattern
  gamePattern.push(randomChosenColor);

  //Choosing the button based on randomChosenColor
  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  //playing audio on the computer choosen color
  playSond(randomChosenColor);

  //incrementing the level
  level++;

  //updating the h1
  $("h1").html(`Level ${level}`);
}

//-- Detecting which button is pressed >> click event
$(".btn").on("click", function (e) {
  let userChosenColor = $(e.target).attr("id");
  userClickedPattern.push(userChosenColor);

  //playing audio on user choosen color
  playSond(userChosenColor);

  //animating the button press
  animatePress(userChosenColor);

  //checking answer
  checkAnswer(userClickedPattern.length - 1);
});

//-- Function to generate audio on every button select
function playSond(color) {
  let audio = new Audio(`sounds/${color}.mp3`);
  audio.play();
}

//-- Function to animate every button press
function animatePress(color) {
  $(`#${color}`).addClass("pressed");

  setTimeout(() => {
    $(`#${color}`).removeClass("pressed");
  }, 100);
}

//--Function for checking the answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("correct");
    //cheching if both the arrays are equal
    if (arrayEquals(gamePattern, userClickedPattern)) {
      console.log("same patterns");
      setTimeout(() => {
        nextSequence();
      }, 2000);
    }
  } else {
    console.log("worog");

    //playing the gameover sound
    playSond("wrong");

    //Changing the background color
    toggleBackground();

    //changing the h1;
    $("h1").html(`Game Over, Press Any Key to Restart`);

    //calling the restart function
    startOver();
  }
}

//--Function for checking if the arrays are equal
function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

//--Function for toggling the background on wrong answer
function toggleBackground() {
  $("body").addClass("game-over");

  setTimeout(() => {
    $("body").removeClass("game-over");
  }, 200);
}

//--Function for restarting the game
function startOver() {
  //seting the level to zero again
  level = 0;

  //setting the game pattern to empty
  gamePattern = [];

  //userClickedPattern is automatically emptied when nextSequence is called
}
