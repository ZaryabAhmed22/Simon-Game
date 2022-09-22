let buttonColor = ["red", "blue", "green", "yellow"];

//--Storing the computer generated pattern
let gamePattern = [];

//--Storing the user generated pattern
let userClickedPattern = [];

//--Level variable, initially at zero
let level = 0;

//-----game logic >> Putting all together -----//

//detecting a keypress to start the game
$(document).on("keypress", function (e) {
  //Updating the h1 to Level 0
  $("h1").html(`Level ${level}`);

  //calling the computer pattern function
  nextSequence();
});

//-- Creating a function to generate computer pattern
function nextSequence() {
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
  checkAnswer();
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
function checkAnswer() {
  if (
    gamePattern[gamePattern.length - 1] ===
    userClickedPattern[userClickedPattern.length - 1]
  ) {
    console.log("correct");
  } else {
    console.log("worog");
  }
}
