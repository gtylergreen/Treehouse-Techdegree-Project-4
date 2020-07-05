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
    const phrases = [
      { phrase: 'A Chip on Your Shoulder' },
      { phrase: 'A Fool and His Money Are Soon Parted' },
      { phrase: 'Barking Up The Wrong Tree' },
      { phrase: 'An Arm and a Leg' },
      { phrase: 'Beating Around the Bush' },
    ];

    return phrases;
  }

  /**
   * Selects random phrase from phrases property
   * @return {Object} Phrase object chosen to be used
   */
  getRandomPhrase() {
    const randomNumber = Math.floor(Math.random() * Math.floor(5));
    let randomPhrase = this.phrases[randomNumber];
    let phraseToLowerCase = randomPhrase.phrase.toLowerCase();
    randomPhrase.phrase = phraseToLowerCase;
    console.log(randomPhrase);
    let workingPhrase = new Phrase(randomPhrase);
    return workingPhrase;
  }

  /**
   * Begins game by selecting a random phrase and displaying it to user
   */
  //   startGame() {
  //     //debugger;
  //     document.getElementById('overlay').style.display = 'none';
  //     this.activePhrase = this.getRandomPhrase;
  //     console.log(this.activePhrase);
  //     activePhrase.addPhraseToDisplay;
  //   }
}
