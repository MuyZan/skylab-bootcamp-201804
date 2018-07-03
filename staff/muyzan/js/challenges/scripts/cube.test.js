"use strict";

/**************** Test ****************/

test(function () {
  return numbersToCube(3);
},
  'numbersToCube(3) should return 27',
  function (result) {
      return result === 27;
  })

test(function () {
  return numbersToCube([1, 2, 3]);
},
  'numbersToCube([1, 2, 3]) should return [1, 8, 27]',
  function (result) {
      return result.toString() === [1, 8, 27].toString();
  }
)

/********** Error Handling **********/

test(withErrorCapturing(function () {
  numbersToCube(true);
}),
  'numbersToCube(true) should throw an error',
  function (result) {
      return result.message === "It is not a number or array!";
  })

test(withErrorCapturing(function () {
  numbersToCube([1, 2, 'a']);
}),
  'numbersToCube([1, 2, "a"]) should throw an error',
  function (result) {  
      return result.message === "Input array is not a number in the index 2";
  })










