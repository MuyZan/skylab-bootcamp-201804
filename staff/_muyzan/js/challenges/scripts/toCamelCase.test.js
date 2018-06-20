'use strict';

/************ Test ***********/


test(
  function() {
    return toCamelCase("hello my WORLD");
  },
  'toCamelCase("hello world" should return helloMyWorld',
  function(result) {
    return result === "helloMyWorld";
  }
);

/************ Error Handling ****************/

test(
  withErrorCapturing(function() {
    toCamelCase(true);
  }),
  "toCamelCase(true) should launch and error",
  function(result) {
    return result.message === "input is not a string";
  }
);

