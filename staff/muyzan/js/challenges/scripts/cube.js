"use strict";

/**
 * Calculates the cube of a given numeric input.
 *
 * @example
 *
 * var res = numbersToCube(2) // -> 8
 * var res = numbersToCube([1, 2, 3]) // --> [1, 8, 27]
 *
 *
 * @param {number|number[]} val - Initial number or Initial array of given numbers.
 *
 *
 * @throws {Error} - Input is not a number or an array.
 * @throws {Error} - The index of a given array contains a non number valor.
 *
 * @returns {number|number[]} - The cube of the input number or array of numbers.
 */

function numbersToCube(val) {
  if (typeof val === "number") {
    return cube(val);
  }

  if (!(val instanceof Array)) {
    //zan note: !() primero comprobar si es una instancia, y luego negarla.
    throw Error("It is not a number or array!");
  }
  var newVal = [];
  for (var i = 0; i < val.length; i++) {
    if (typeof val[i] !== "number") {
      throw Error("Input array is not a number in the index " + i);
    }
    newVal[i] = cube(val[i]);
  }
  return newVal;
}

function cube(n) {
  return n ** 3; //same that n*n*n, cube's formula
}

