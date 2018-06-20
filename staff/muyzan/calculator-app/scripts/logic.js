"use strict";

var Calculator = (function() {
  class Calculator {
    constructor() {
      this._status = "";
      this._result;
    }

    one() {
      this._status += String(1);
    }
    two() {
      this._status += String(2);
    }
    three() {
      this._status += String(3);
    }
    four() {
      this._status += String(4);
    }
    five() {
      this._status += String(5);
    }
    six() {
      this._status += String(6);
    }
    seven() {
      this._status += String(7);
    }
    eight() {
      this._status += String(8);
    }
    nine() {
      this._status += String(9);
    }
    zero() {
      this._status += String(0);
    }

    sum() {

        let acumm =[];

        acumm.push(this._status);


        console.log(acumm)


    }

    subs() {}

    mul() {}

    div() {}

    result() {
     
      return this._result;
    }

    status() {
 
      return parseInt(this._status);
    }
  }

  return Calculator;
})();
