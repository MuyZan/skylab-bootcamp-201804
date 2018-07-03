"use strict";

var res = toRomanNumeral(10);

console.log('toRomanNumeral("10" should return X', res === "X", res);

var res = toRomanNumeral(1);

console.log('toRomanNumeral("1" should return I', res === "I", res);

var res = toRomanNumeral(5);

console.log('toRomanNumeral("5" should return V', res === "V", res);


var error;

try {
  count = toRomanNumeral("4");
} catch (err) {
    error = err;
}finally{
  console.log("toRomanNumeral('stringType') should launch and error", error !== undefined, error);
}

error = undefined;

try {
  count = toRomanNumeral(123);
} catch (err) {
    error = err;
}finally{
  console.log("toRomanNumeral(123) should launch and error", error !== undefined, error);
}
