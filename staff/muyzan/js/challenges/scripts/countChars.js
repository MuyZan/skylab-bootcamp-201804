"use strict";


/**
 * Count chars in text (string)
 * 
 * @example
 * 
 * var count = countChars('hello world'); // -> 11
 * 
 * var count = countChars('hello world', function(c) { return c === "e"; };) // -> 1
 * 
 * @param {string} str - The text to count the chars from.
 * @param {Function} [condition] - A condition to count chars (optional)  
 * 
 * @throws {Error} - If input text is not a string.
 * @throws {Error} - If given condition, is not a function. 
 * 
 * @returns {number} - The number of chars count in the input text.
 */

function countChars(str, condition) {

  if (typeof str !== 'string'){
    throw Error("input is not a string");
  }
  if (!condition){
    return str.length;
  }

  if(typeof condition !== 'function'){
      throw Error('input condition is not a function');
  }

  var count = 0;
  for (var i = 0; i < str.length; i++){
    var val = str[i]
    if (condition(val)){
      count++;
    }
  }
  return count;
}




