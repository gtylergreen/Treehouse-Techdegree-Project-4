//Game class with contructor to the specified criteria. Also added a keysPressed property to track keys that had been selected
//using keyboard events.
class Game {
  constructor() {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;
    this.keysPressed = [];
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
    //Loops through the phrases array and creates a new Phrase class for each of the phrases.
    for (let i = 0; i < startPhrases.length; i++) {
      let lowerCasePhrase = startPhrases[i].phrase.toLowerCase();
      let currentPhrase = new Phrase(lowerCasePhrase);
      phrases.push(currentPhrase);
    }
    //Returns the array of phrase objects.
    return phrases;
  }

  /**
   * Selects random phrase from phrases property
   * @return {Object} Phrase object chosen to be used
   */
  getRandomPhrase() {
    const randomNumber = Math.floor(Math.random() * Math.floor(5));
    let randomPhrase = this.phrases[randomNumber];
    return randomPhrase;
  }

  /**
   * Begins game by selecting a random phrase and displaying it to user
   */
  startGame() {
    //   Removes the start game screen and had to change the display style of the hearts
    //   since I wanted to add a pulsing effect. I needed to show and hide them to keep
    //   them from appearing on the homescreen.
    document.getElementById('overlay').style.display = 'none';
    const hearts = document.querySelectorAll('.tries');
    console.log(hearts);
    for (let i = 0; i < hearts.length; i++) {
      hearts[i].style.display = 'inline-block';
    }
    //Calls the getRandomPhraseMethod and sets it to the active phrase and displays the placeholders for the phrase.
    this.activePhrase = this.getRandomPhrase();
    console.log(this.activePhrase);
    this.activePhrase.addPhraseToDisplay();
  }

  /**
   * Handles any interaction in the game.
   */

  //Takes in an event, determines whether it was a keyup or click event and applies logic to determine
  //whether it is one of the letters. If it is, calls show matched letter, the calls the check for win
  //method. If that returns true, calls gameover passing in win. If letter isn't in the phrase, calls
  //the removeLife method to remove a life.
  handleInteraction(e) {
    let currentEventValue = '';
    let currentKey = '';
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      currentEventValue = String.fromCharCode(e.keyCode).toLowerCase();
      console.log(currentEventValue);
      const allKeys = document.getElementsByClassName('key');
      console.log(allKeys);
      //   debugger;
      console.log(this.keysPressed);
      for (let i = 0; i < this.keysPressed.length; i++) {
        if (this.keysPressed[i] === currentEventValue) {
          return false;
        }
      }
      this.keysPressed.push(currentEventValue);
      for (let i = 0; i < allKeys.length; i++) {
        if (allKeys[i].textContent === currentEventValue) {
          allKeys[i].disabled = true;
          currentKey = allKeys[i];
        }
      }
      console.log(currentKey);
    } else {
      currentEventValue = e.target.textContent;
      console.log(currentEventValue);
      e.target.disabled = true;
    }

    if (this.activePhrase.checkLetter(currentEventValue)) {
      this.activePhrase.showMatchedLetter(currentEventValue);
      if (currentKey === '') {
        e.target.classList.add('chosen');
      } else {
        currentKey.classList.add('chosen');
      }
      debugger;
      if (this.checkForWin()) {
        this.gameOver('win');
      }
    } else if (!this.activePhrase.checkLetter(currentEventValue)) {
      if (currentKey === '') {
        e.target.classList.add('wrong');
      } else {
        currentKey.classList.add('wrong');
      }

      this.removeLife();
    }
  }

  /**
* Checks for winning move
* @return {boolean} True if game has been won, false if game wasn't
won
*/
  //Checks to see if there are any letters remaining that have the classes hide and letter. If there
  //aren't any, calls the gameOver methond passing in win.
  checkForWin() {
    let letterLis = document.getElementById('phrase').firstElementChild
      .childNodes;
    let lettersRemaining = 0;
    for (let i = 0; i < letterLis.length; i++) {
      if (letterLis[i].className === 'hide letter') {
        lettersRemaining += 1;
      }
      if (lettersRemaining > 0) {
        return false;
      }
    }
    if (lettersRemaining === 0) {
      return true;
    }
  }

  /**
   * Increases the value of the missed property
   * Removes a life from the scoreboard
   * Checks if player has remaining lives and ends game if player is out
   */

  removeLife() {
    this.missed += 1;
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
   * Whether or not the user won the game
   * Calls refreshGameBoard to prepare for the next game.
   */
  gameOver(result) {
    const gameOverBackground = document.getElementById('overlay');
    const gameOverMessage = document.getElementById('game-over-message');

    if (result === 'win') {
      gameOverMessage.textContent = 'Congratulations! You Win!';
      gameOverBackground.classList.add('win');
      gameOverBackground.classList.remove('lose');
      gameOverBackground.style.display = 'block';

      console.log('You Win!');
    } else if (result == 'lose') {
      gameOverMessage.textContent = 'Sorry. You Lose.';
      gameOverBackground.classList.add('lose');
      gameOverBackground.classList.remove('win');
      gameOverBackground.style.display = 'block';
    }
    this.refreshGameBoard();
  }
  //Sets game board back to ready to play state.
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
      firstRow[i].classList.remove('wrong');
      firstRow[i].classList.remove('chosen');
      firstRow[i].removeAttribute('disabled');
    }
    const secondRow = rows.nextElementSibling.children;
    for (let i = 0; i < secondRow.length; i++) {
      secondRow[i].classList.remove('wrong');
      secondRow[i].classList.remove('chosen');
      secondRow[i].removeAttribute('disabled');
    }
    const thirdRow = rows.nextElementSibling.nextElementSibling.children;
    for (let i = 0; i < thirdRow.length; i++) {
      thirdRow[i].classList.remove('wrong');
      thirdRow[i].classList.remove('chosen');
      thirdRow[i].removeAttribute('disabled');
    }
    let lives = document.getElementById('scoreboard').firstElementChild
      .children;
    for (let i = 0; i < lives.length; i++) {
      lives[i].classList.add('tries');
      lives[i].innerHTML =
        '<img src="images/liveHeart.png" alt="Heart Icon" height="35" width="30">';
    }
    const hearts = document.querySelectorAll('.tries');
    console.log(hearts);
    for (let i = 0; i < hearts.length; i++) {
      hearts[i].style.display = 'none';
    }
  }
}
