"use strict";

/************ Test ***********/

var input = "Hello My World";

test(
  function() {
    return toRandomCase("Hello My World");
  },
  'toRandomCase("Hello My World") should return input in random case',
  function(result) {
    return input.toLowerCase() === result.toLowerCase() && input !== result;
  }
);

/************ Error Handling ****************/

test(
  withErrorCapturing(function() {
    toRandomCase(true);
  }),
  "toRandomCase(true) should launch and error",
  function(result) {
    return result.message === "input is not a string";
  }
);

test(
  withErrorCapturing(function() {
    toRandomCase(4);
  }),
  "toRandomCase(4) should launch and error",
  function(result) {
    return result.message === "input is not a string";
  }
);

test(
  withErrorCapturing(function() {
    toRandomCase([]);
  }),
  "toRandomCase([]) should launch and error",
  function(result) {
    return result.message === "input is not a string";
  }
);
