'use strict';


/************ Test ***********/

test(
    function() {
      return countWords("hello world");
    },
    'countWords("hello world" should return 2',
    function(result) {
      return result === 2;
    }
  );



  /************ Error Handling ****************/

test(
    withErrorCapturing(function() {
        countWords(true);
    }),
    "countWords(true) should launch and error",
    function(result) {
      return result.message === "input is not a string";
    }
  );

  test(
    withErrorCapturing(function() {
        countWords(1);
    }),
    "countWords(1) should launch and error",
    function(result) {
      return result.message === "input is not a string";
    }
  );

  test(
    withErrorCapturing(function() {
        countWords([]);
    }),
    "countWords([]) should launch and error",
    function(result) {
      return result.message === "input is not a string";
    }
  );