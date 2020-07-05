let game;

document.getElementById('btn__reset').addEventListener('click', (event) => {
  game = new Game();
  console.log(game);
  game.startGame();
  console.log(game);
});

document.getElementById('qwerty').addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    game.handleInteraction(e);
  }
});
