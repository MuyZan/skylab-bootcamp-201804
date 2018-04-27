"use strict";

var Calculator = (function() {
  class Calculator {
    constructor() {
      this._status = "";
      this._result;
    }

    one() {
      this._prevStatus += String(1);
    }
    two() {
      this._prevStatus += String(2);
    }
    three() {
      this._prevStatus += String(3);
    }
    four() {
      this._prevStatus += String(4);
    }
    five() {
      this._prevStatus += String(5);
    }
    six() {
      this._prevStatus += String(6);
    }
    seven() {
      this._prevStatus += String(7);
    }
    eight() {
      this._prevStatus += String(8);
    }
    nine() {
      this._prevStatus += String(9);
    }
    zero() {
      this._prevStatus += String(0);
    }

    sum() {

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
