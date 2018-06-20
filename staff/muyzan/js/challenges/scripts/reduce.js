"use strict";

function reduce(obj, myHandler, initialValue) {
  var total = initialValue;
  for (var i = 0; i < obj.length; i++) {
    total = myHandler(total, obj[i]);
  }
  return total;
}
