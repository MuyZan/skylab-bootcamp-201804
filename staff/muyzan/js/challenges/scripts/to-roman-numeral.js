'use strict';

function toRomanNumeral(str) {

  if(str > 10){
    throw Error("Please, inset a number from 1 to 10");
  }

  if (typeof str === "number") {
    var numberToRoman;
    var arrayNumbers = [1,2,3,4,5,6,7,8,9,10];
    var romanNumbers = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
    var index = arrayNumbers.indexOf(str);
    numberToRoman = romanNumbers[index];
    return numberToRoman; 
  }
  
  throw Error("input is not a number");
}
