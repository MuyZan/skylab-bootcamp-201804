"use strict";

/**
 * Converts to camelCase format the text input. (string)
 *
 * @example
 *
 * var result = toCamelCase('hello world') // -> "helloWorld"
 * var result = toCamelCase('My name is Zan') // -> "myNameIsZan"
 *
 * @param {string} str - The text to camelCase the words from.
 *
 * @throws {Error} - If input text is not a string.
 *
 * @returns {string} - The camelCased format text.
 */

 
 function toCamelCase(str) {
  if (typeof str === "string") {
    var val = str.split(" ");
    for (var i = 0; i < val.length; i++) {
      val[i] = val[i].toLowerCase();
      if (i > 0) {
        val[i] = val[i].replace(val[i][0], val[i][0].toUpperCase());
      }
    }
    val = val.join("");
    return val;
  }
  throw Error("input is not a string");
}

