'use strict'

/**
 * Runs a test case unit.
 * 
 * @example
 * 
 * //---normal use
 * 
 * function fun(){
 *      return 'Hello, World!';
 * }
 * 
 * test(
 *      function(){
 *          return fun():
 * }, 'fun() should return "Hello, World"',
 *      function(result){
 *          return result === 'Hello, World';
 *      }
 * );
 * 
 * //--- test with error capturing
 * 
 * function notFun(){
 *      throw Error('CRASH!');
 * }
 * 
 * test(
 *      withErrorCapturing(
 *          function(){
 *              notFun();
 *          }
 *      ),
 *      'notFun() should throw error with message "CRASH"',
 * 
 *      function(result){
 *           return result && result.message === 'CRASH!';
 *      }
 * )
 * 
 * 
 * @param {function} testCase - The test case to run.
 * @param {string} message - The description of the test case.
 * @param {function} check - The function that checks the results of the test case.
 * 
 * @author manuelbarzi.mostly-copied-but-understood-by-Zan // :D
 * 
 * @version 2.0.3
 */


function test(testCase, message, check) {
    try {
        var res = testCase();
        check(res) ? console.log(message, check(res), res) : console.warn(message, check(res), res)
    } catch (err) {
        console.error(message, 'FAILED', err);
    };
}

/**
 * Wraps a test case with error capturing.
 * 
 * @param {function} testCase - The test case to run.
 * 
 * @returns {function} - An anonymous function that wraps the execution of the test case in a secure manner (try-catch).
 */

function withErrorCapturing(testCase) {
    return function () {
        var error;

        try {
            testCase();
        } catch (err) {
            error = err;
        }

        return error;
    };
}