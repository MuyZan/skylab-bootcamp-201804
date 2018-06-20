"use strict";

class Hangman {
  constructor(wordToGuess, numAttempts) {

    if (!(typeof wordToGuess === "string")) {
      throw Error("invalid word " + wordToGuess);
    }

    this.word = wordToGuess,
    this.wordArray = this.word.split(""),
    this.count = numAttempts || 10,
    this.matched,
    // this.guess = new Array(this.wordArray.length).fill('_')
    this.guess = this.fun(this.wordArray)
  }

  fun(word) {
    let guess = word;
    for (let i = 0; i < guess.length; i++) {
      guess[i] = "_";
    }
    return guess;
  }

  try(letter) {
    if (!(typeof letter === "string")) {
      throw Error("invalid letter or word " + letter);
    }

    
    if (letter.length > 1) {
      let tryWord = this.word;
      if (tryWord === letter) {
        this.matching(letter);
        return true;
      } else {
        this.count -= 1;
        return false;
      }
  
    } else {

      if (this.word.includes(letter)) {
        this.matching(letter);
        return true;
      } else {
        this.count -= 1;
        return false;
      }
 
    }
  }

  matching(letter) {
      
    if (letter.length > 1) {
      this.matched = letter.length;
      this.guess = this.word.split("");
    } else {

      for (let i = 0; i < this.wordArray.length; i++) {
        if (this.wordArray[i] === letter) {
          this.guess[i] = letter;
          this.matched++;
        }
      }
    }
  }

  attempts() {
    return this.count;
  }

  guessed() {
    return this.guess;
  }


  status(){
  
    let length = this.wordArray.length;
    if(this.count === 0){
        Hangman.CONTINUE = false;
        this.endGame();
       return  Hangman.LOSE         
    } else if(length === this.matched){
        Hangman.CONTINUE = false;
        this.endGame();
        return Hangman.WIN;
    } else {
       return Hangman.CONTINUE;
    } 
}

endGame(){
    this.WIN ?  "YOU WIN" : "YOU LOSE";
}
}


Hangman.CONTINUE = true;
Hangman.LOSE = false;
Hangman.WIN = false;





    

 

 



  

  

