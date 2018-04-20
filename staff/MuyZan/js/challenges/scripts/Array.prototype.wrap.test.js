'use strict'
var input = [1, 2, 3];

test(
    function() {   
      return input.wrap("[", "]");
    },
    'input.wrap("[","]") should return a new array with values = [ "[1]", "[2]", "[3]"" ]',
    function(result) {
      return ["[1]", "[2]", "[3]"].toString() === result.toString() && input.toString() === [1, 2, 3].toString();
    }
  );

 
  /************ Error Handling ****************/
  
 test(
    withErrorCapturing(function() {
      input.wrap(true, "casa");
    }),
    "input.wrap(true, 'casa') should launch and error",
    function(result) {
      return result.message === "the inputs aren't a strings";
    }
  );
   