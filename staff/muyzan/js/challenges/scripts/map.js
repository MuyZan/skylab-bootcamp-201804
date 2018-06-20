'use strict'

/**
 * 
 * Maps values from an input array into a new array, operating on each of them with the given handler.
 * 
 * @example
 * 
 * var input = [1, 2, 3];
 * 
 * map(input, function(v){ return v**2}); // -> [1, 4, 9]
 * 
 * @param {Array} arr - The input array.
 * @param {Function} handler - The handler function that operates on each value of the input array.
 * 
 * @throws {Error} - If input array and/or handler is not valid.
 * 
 * @returns {Array} - The resulting array
 * 
 */

 function map(arr, handler){
    if(!(arr instanceof Array)){
        throw Error ('input array is not valid')
    }
    if(!(handler instanceof Function)){
        throw Error ('input handler is not valid')
    }

    var res = [];
    for(var i=0; i < arr.length; i++){
        res.push(handler(arr[i]));
    }
    return res;
 }