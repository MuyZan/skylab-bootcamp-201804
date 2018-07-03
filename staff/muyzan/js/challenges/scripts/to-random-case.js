"use strict";

/**
 * Randomizes the upper and lower case of a given text entry. (string)
 *
 * @example
 *
 * var result = toRandomCase('hello world') // -> "HEllO WoRld"
 * var result = toRandomCase('hello world') // -> "heLLO woRLd"
 * var result = toRandomCase('hello world') // -> "hElLo WOrlD"
 *
 * @param {string} str - The text to randomize the words from.
 *
 * @throws {Error} - If input text is not a string.
 *
 * @returns {string} - The randomized upper and lower case letter-text.
 */

function toRandomCase(str) {
  var res = "";

  if (typeof str !== "string") {
    throw Error("input is not a string");
  }

  for (var i = 0; i < str.length; i++) {
    var oldLetter = str[i];
    var newLetter = toUpperLowerCase(oldLetter);
    res += newLetter;
  }
  return res;
}

function toUpperLowerCase(n) {
  var randomNumber = Math.floor(Math.random() * 2);
  if (randomNumber == 0) {
    return (n = n.toUpperCase());
  } else {
    return (n = n.toLowerCase());
  }
}



