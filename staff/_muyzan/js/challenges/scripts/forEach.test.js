"use strict";

/**** variables */

var myConsole = function(v,i,arr){ console.log(v,i,arr)};
var output = []; 
var myPush = function(v) { output.push(v) };

/************Test****************/

test(function () {
    return forEach([1, 2, 3], myPush);
},
    'forEach(input, function(v) { output.push(v) }) should fulfill output with values from input',
    function (result) {
        return [1, 2, 3].toString() === output.toString();
    }
)

/************Error Handling****************/

test(withErrorCapturing(function () {
    forEach("zan", myConsole);
}),
    'forEach("zan", myConsole) should throw an error',
    function (result) {
        return result.message === 'The first input is not an array!';
    })



