//Creates a game variable.
let game;

//Adds a listening event to the start button and initializes a new Game class to the variable game and then calls startGame.
document.getElementById('btn__reset').addEventListener('click', (event) => {
  game = new Game();
  game.startGame();
});

//Event listener for clicks on the keyboard, calling the handleInteraction method if they are buttons.
document.getElementById('qwerty').addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    game.handleInteraction(e);
  }
});

//Event listener for keyboard presses, calling the handleInteraction method if a letter key is pressed.
document.addEventListener('keyup', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    game.handleInteraction(e);
  }
});
