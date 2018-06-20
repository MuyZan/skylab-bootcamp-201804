"use strict";

/**
 * Count words in text (string)
 * 
 * @example
 * 
 * var count = countWords('hello world') // -> 2
 * 
 * @param {string} str - The text to count the words from.
 * 
 * @throws {Error} - If input text is not a string.
 * 
 * @returns {number} - The number of words count in the input text.
 */

function countWords(str) {

  if(typeof str !== 'string'){
    throw Error ('input is not a string');
  }

  var val = 0;
  var res = str.split(" ");
  for (var i = 0; i < res.length; i++) {
    val++;
  }
  return val;
}



