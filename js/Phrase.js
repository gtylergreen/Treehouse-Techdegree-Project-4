class Phrase {
  constructor(phrase) {
    this.phrase = phrase;
  }

  /**
   * Display phrase on game board
   */
  addPhraseToDisplay() {
    let phraseList = document.getElementById('phrase').firstElementChild;
    let splitPhrase = this.phrase.split('');
    console.log(splitPhrase.length);
    for (let i = 0; i < splitPhrase.length; i++) {
      let currentElement = document.createElement('li');
      if (splitPhrase[i] === ' ') {
        currentElement.setAttribute('class', 'hide space');
        currentElement.textContent = splitPhrase[i];
        phraseList.appendChild(currentElement);
      } else {
        currentElement.setAttribute('class', 'hide letter');
        currentElement.textContent = splitPhrase[i];
        phraseList.appendChild(currentElement);
      }
    }
  }

  /**
   * Checks if passed letter is in phrase
   * @param (string) letter - Letter to check
   */
  checkLetter(eventLetter) {
    console.log(game.activePhrase.phrase);
    console.log(eventLetter);
    if (game.activePhrase.phrase.includes(eventLetter)) {
      this.showMatchedLetter(eventLetter);
    } else {
      game.removeLife();
    }
    game.checkForWin();
  }

  /**
   * Displays passed letter on screen after a match is found
   * @param (string) letter - Letter to display
   */
  showMatchedLetter(letter) {
    const listItems = document.getElementById('phrase').firstElementChild
      .childNodes;
    listItems.forEach((item) => {
      if (item.textContent === letter) {
        item.classList.add('show');
        item.classList.remove('hide');
      }
    });
    // splitPhrase.for((letter) => {
    //   return letter === eletter;
    // });
    // console.log(matchingLetters);
  }
}
