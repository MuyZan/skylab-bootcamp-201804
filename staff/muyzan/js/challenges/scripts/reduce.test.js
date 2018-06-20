"use strict";

var a = [
  { name: "jeans", price: 10.5 },
  { name: "t-shirt", price: 5.99 },
  { name: "socks", price: 19.99 }
];

var result = reduce(
  a,
  function(accum, v) {
    if (v.price > 10) {
      return accum + v.price;
    }
    return accum;
  },
  0
);

console.log(result);

Array.reduce()
