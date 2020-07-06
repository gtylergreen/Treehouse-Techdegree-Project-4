class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;
  }

  /**
   * Creates phrases for use in game
   * @return {array} An array of phrases that could be used in the game
   */

  createPhrases() {
    const startPhrases = [
      { phrase: 'A Chip on Your Shoulder' },
      { phrase: 'A Fool and His Money Are Soon Parted' },
      { phrase: 'Barking Up The Wrong Tree' },
      { phrase: 'An Arm and a Leg' },
      { phrase: 'Beating Around the Bush' },
    ];
    let phrases = [];
    for (let i = 0; i < startPhrases.length; i++) {
      let lowerCasePhrase = startPhrases[i].phrase.toLowerCase();
      let currentPhrase = new Phrase(lowerCasePhrase);
      phrases.push(currentPhrase);
    }
    console.log(phrases);
    return phrases;
  }

  /**
   * Selects random phrase from phrases property
   * @return {Object} Phrase object chosen to be used
   */

  getRandomPhrase() {
    const randomNumber = Math.floor(Math.random() * Math.floor(5));
    let randomPhrase = this.phrases[randomNumber];
    console.log(randomPhrase);
    return randomPhrase;
  }

  /**
   * Begins game by selecting a random phrase and displaying it to user
   */
  startGame() {
    document.getElementById('overlay').style.display = 'none';
    this.activePhrase = this.getRandomPhrase();
    console.log(this.activePhrase);
    this.activePhrase.addPhraseToDisplay();
  }

  /**
   * Handles any interaction in the game.
   */
  handleInteraction(e) {
    const currentEventValue = e.target.textContent;
    e.target.disabled = true;
    e.target.classList.add('chosen');
    // console.log(currentEventValue);
    if (this.activePhrase.checkLetter(currentEventValue)) {
      this.activePhrase.showMatchedLetter(currentEventValue);
      if (this.checkForWin()) {
        this.gameOver('win');
      }
    } else if (!this.activePhrase.checkLetter(currentEventValue)) {
      this.removeLife();
    }
  }

  /**
* Checks for winning move
* @return {boolean} True if game has been won, false if game wasn't
won
*/
  checkForWin() {
    let letterLis = document.getElementById('phrase').firstElementChild
      .childNodes;
    let lettersRemaining = 0;
    for (let i = 0; i < letterLis.length; i++) {
      if (letterLis[i].className === 'hide letter') {
        lettersRemaining += 1;
      }
    }
    if (lettersRemaining === 0) {
      this.gameOver('win');
    }
  }

  /**
   * Increases the value of the missed property
   * Removes a life from the scoreboard
   * Checks if player has remaining lives and ends game if player is out
   */

  removeLife() {
    //debugger;
    this.missed += 1;
    console.log(this.missed);
    let livesRemaining = document.getElementById('scoreboard').firstElementChild
      .children;
    let currentLives = [];
    for (let i = 0; i < livesRemaining.length; i++) {
      if (livesRemaining[i].className === 'tries') {
        currentLives.push(livesRemaining[i]);
      }
    }
    if (currentLives.length > 0) {
      let firstAvailableLife = currentLives[0];
      firstAvailableLife.innerHTML =
        '<img src="images/lostHeart.png" alt="Heart Icon" height="35" width="30">';
      firstAvailableLife.classList.remove('tries');
      console.log(currentLives);
      currentLives.shift();
    }

    if (this.missed === 5) {
      this.gameOver('lose');
    }
  }

  /**
   * Displays game over message
   * @param {boolean} gameWon - Whether or not the user won the game
   */
  gameOver(result) {
    const gameOverBackground = document.getElementById('overlay');
    const gameOverMessage = document.getElementById('game-over-message');
    if (result === 'win') {
      gameOverMessage.textContent = 'Congratulations! You Win!';
      gameOverBackground.classList.add('win');
      gameOverBackground.style.display = 'block';

      console.log('You Win!');
    } else if (result == 'lose') {
      gameOverMessage.textContent = 'Sorry. You Lose.';
      gameOverBackground.classList.add('lose');
      gameOverBackground.style.display = 'block';
    }
    this.refreshGameBoard();
  }
  refreshGameBoard() {
    const phraseDiv = document.getElementById('phrase').firstElementChild;
    const ulItems = phraseDiv.childNodes;

    while (phraseDiv.firstChild) {
      phraseDiv.removeChild(phraseDiv.firstChild);
    }
    const rows = document.getElementById('qwerty').firstElementChild;
    const firstRow = rows.children;
    //debugger;
    for (let i = 0; i < firstRow.length; i++) {
      firstRow[i].classList.remove('chosen');
      firstRow[i].removeAttribute('disabled');
    }
    const secondRow = rows.nextElementSibling.children;
    for (let i = 0; i < secondRow.length; i++) {
      secondRow[i].classList.remove('chosen');
      secondRow[i].removeAttribute('disabled');
    }
    const thirdRow = rows.nextElementSibling.nextElementSibling.children;
    for (let i = 0; i < thirdRow.length; i++) {
      thirdRow[i].classList.remove('chosen');
      thirdRow[i].removeAttribute('disabled');
    }
    let lives = document.getElementById('scoreboard').firstElementChild
      .children;
    for (let i = 0; i < lives.length; i++) {
      lives[i].innerHTML =
        '<img src="images/liveHeart.png" alt="Heart Icon" height="35" width="30">';
    }
  }
}
