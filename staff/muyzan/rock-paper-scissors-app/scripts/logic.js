'use strict'

class RockPaperScissors {
    constructor(player1, player2){
        this.player1 = player1;
        this.player2 = player2;
        this._state = [];
        this._status = RockPaperScissors.CONTINUE;
        this._winner;
        this._playerOneScore = 0;
        this._playerTwoScore = 0;
    }

    play(hand1, hand2){

        if(this._status === RockPaperScissors.GAMEOVER) throw Error('GAME OVER!');
        if(hand1 !== 'rock' && hand1 !== 'paper' && hand1 !== 'scissors') throw Error('invalid hands');
        if(hand2 !== 'rock' && hand2 !== 'paper' && hand2 !== 'scissors') throw Error('invalid hands');

        let round = {player1:hand1, player2:hand2};

        this._state.push(round);

        let roundScore = gameLogic(this, hand1, hand2);
        
        if(roundScore === 1){
            this._playerOneScore += 1;
        }else if(roundScore === 2){
            this._playerTwoScore += 1};
  
        let roundCounter = this._state.length;
        let p1Score = this._playerOneScore; 
        let p2Score = this._playerTwoScore;

        //Two consecutive rounds winned by the same player.
        if(roundCounter === 2 && p1Score === 2){ 
            this._winner = this.player1;
            this._status = RockPaperScissors.GAMEOVER;
        } 
        else if (roundCounter === 2 && p2Score === 2){
            this._winner = this.player2;
            this._status = RockPaperScissors.GAMEOVER;
        } //Two rounds of three winned by the same player.
        else if (roundCounter === 3 && p1Score > p2Score){
            this._winner = this.player1;
            this._status = RockPaperScissors.GAMEOVER;
        }
        else if(roundCounter === 3 && p1Score < p2Score){
            this._winner = this.player2;
            this._status = RockPaperScissors.GAMEOVER;
        } //One or two rounds winned by the same player, when the rounds are upper three and nobody wins by two points before.
        else if(roundCounter > 3 && p1Score > p2Score){
            this._winner = this.player1;
            this._status = RockPaperScissors.GAMEOVER;
        }
        else if(roundCounter > 3 && p1Score < p2Score){
            this._winner = this.player2;
            this._status = RockPaperScissors.GAMEOVER;
        };

    };

    status(){
             return this._status;
    };

    state(){
        return this._state;
        };

    winner(){
        return this._winner;
    };

}

function gameLogic(target, hand1, hand2){
    if(hand1 === "rock" && hand2 === "scissors") return 1;
    if(hand1 === "scissors" && hand2  === "paper") return 1;
    if(hand1 === "paper" && hand2  === "rock") return 1;
    if(hand1 === "scissors" && hand2  === "rock") return 2;
    if(hand1 === "paper" && hand2  === "scissors") return 2;
    if(hand1 === "rock" && hand2  === "paper") return 2;
}

RockPaperScissors.CONTINUE = 0;
RockPaperScissors.GAMEOVER = 1;



