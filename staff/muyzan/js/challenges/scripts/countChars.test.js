"use strict";

/************ Test ***********/

test(
  function() {
    return countChars("hello world");
  },
  'countChars("hello world") should return 11',
  function(result) {
    return result === 11;
  }
);

test(
  function() {
    return countChars("0123456789");
  },
  "countChars('0123456789') should return 10",
  function(result) {
    return result === 10;
  }
);

test(
  function() {
    return countChars("abracadabra", function(c){ return c === "a"});
  },
  'countChars("abracadabra", function(c){ return c === "a"} should return 5',
  function(result) {
    return result === 5;
  }
);

/************ Error Handling ****************/

test(
  withErrorCapturing(function() {
    countChars(true);
  }),
  "countChars(true) should launch and error",
  function(result) {
    return result.message === "input is not a string";
  }
);

test(
  withErrorCapturing(function() {
    countChars(1);
  }),
  "countChars(1) should launch and error",
  function(result) {
    return result.message === "input is not a string";
  }
);

test(
  withErrorCapturing(function() {
    countChars([]);
  }),
  "countChars([]) should launch and error",
  function(result) {
    return result.message === "input is not a string";
  }
);

test(
  withErrorCapturing(function() {
    countChars("casa", "pedro");
  }),
  'countChars("casa", "pedro") should launch and error',
  function(result) {
    return result.message === 'input condition is not a function';
  }
);



