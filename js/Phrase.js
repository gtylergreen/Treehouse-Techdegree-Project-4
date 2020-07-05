class Phrase {
  constructor(phrase) {
    this.phrase = phrase.phrase;
  }

  /**
   * Display phrase on game board
   */
  addPhraseToDisplay() {
    let phraseList = document.getElementById('phrase');
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
}
