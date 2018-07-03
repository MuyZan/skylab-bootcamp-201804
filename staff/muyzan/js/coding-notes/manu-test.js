'use strict';

test(function () {
    return cube(3);
},
    'cube(3) should return 27',
    function (result) {
        return result === 27;
    })

test(function () {
    return cube([1, 2, 3]);
},
    'cube([1, 2, 3]) should return [1, 8, 27]',
    function (result) {
        return result.toString() === [1, 8, 27].toString();
    }
)

test(runWithErrorHandling(function () {
    cube(true);
}),
    'cube(true) should throw an error',
    function (result) {
        return result.message === 'input num is not a number, neither an array';
    })

test(runWithErrorHandling(function () {
    cube([1, 2, 'a']);
}),
    'cube([1, 2, "a"]) should throw an error',
    function (result) {
        return result.message === 'input array is not a number at index 2';
    })

function test(testCase, message, check) {
    try {
        var res = testCase();

        console.log(message, check(res), res);
    } catch (err) {
        console.error(message, 'FAILED', err);
    }
}

function runWithErrorHandling(func) {
    return function () {
        var error;

        try {
            func();
        } catch (err) {
            error = err;
        }

        return error;
    };
}