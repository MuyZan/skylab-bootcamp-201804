'use strict'





class Hangman {
    constructor(wordToGuess, numAttempts){

        if(!(typeof wordToGuess === "string")){
            throw Error ('invalid input word');
        }
        this.word = wordToGuess.split(""),
        this.count = numAttempts || 10

    } 
}

  /*      
        
        this.matched,
        this.letter = "";
        this.guess(this.word);
        this.try(letter),
        this.guessed(),
        this.attempts(numAttempts),
        this.status(),
        this.matched(),
        this.endGame(),
        this.CONTINUE = true;
        this.LOSE = false;
        this.WIN = false;

    }

    guess(word){
        let guess = this.word;
        for(let i=0; i < guess.length; i++){
            guess[i] = "_";
        }
    }

    try(letter){
            if(this.word.includes("letter")){
                this.matched(letter);
                return true;
            } else{
                this.count -= 1;
                return false;
            } 
            status();
    }


    matched(letter){
        for(let i =0; i < this.word.length; i++){
            if(this.word[i] === letter){
                this.guess[i] = letter;
                matched++;
            }
        }
    }

    guessed(){
        return this.guess;
    }

    attempts(){  
        return this.count;
    }

    endGame(){
        this.WIN ?  "YOU WIN" : "YOU LOSE";
    }

    status(){
        let length = this.word.length;
        if(this.count === 0){
            Hangman.CONTINUE = false;
            this.endGame();
           return  Hangman.LOSE         
        } else if(length === matched){
            Hangman.CONTINUE = false;
            this.endGame();
            return Hangman.WIN;
        } else {
           return Hangman.CONTINUE;
        }  */

 




 