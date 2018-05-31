'use strict'

/**
 * Polyfill implementation that wrap the array done in special characters;
 * 
 * @example
 * 
 * var a = [1, 2 , 3];
 * 
 * a.wrap('[',']'); // -> ['[1]', '[2]', '[3]']
 * a.wrap('[', ']').wrap('{', '}'); // -> ['{[1]}', '{[2]}', '{[3]}']
 * a.wrap('[', ']').wrap('{', '}').wrap('<', '>'); // -> ['<{[1]}>', '<{[2]}>', '<{[3]}>']
 * 
 * @param {string} open - The first symbol that wrap the iterated element of an array done.
 * @param {string} close - The last symbol that wrap the iterated element of an array done.
 * 
 * @returns {Array} - Returns a new array with its values of array done wrapped by the parameters done.
 */

Array.prototype.wrap = function (open, close){

    if(typeof open !== 'string' || typeof close !== 'string') throw Error("the inputs aren't a strings")

    var res = [];
    for (var i = 0; i < this.length; i++){
        res.push(open + this[i] + close);   
    }
    return this;
 }



