"use strict";

function forEach(arr, myHandler) {
  if (!arr instanceof Array) {
    throw Error("The first input is not an array!");
  }
  var index = 0;
  var iterator = function() {
    if (index < arr.length) {
      myHandler(arr[index], index, arr);
      index++;
      iterator();
    }
  };
  iterator();
}
