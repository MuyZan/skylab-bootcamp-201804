
/*
 * OLD TEST: ¡NO BORRAR! ¡ÚTIL PARA ESTUDIAR!
*/


/* TEST 1 --- Manera 1*/

var num = numbersToCube(3);

console.log('numberToCube("3") should return 27', num === 27, num);

/*-----------------*/

/*TEST 2 --- Manera 1*/

var num = numbersToCube([1, 2, 3]);
var result = [1, 8, 27];
result = result.toString();

/*zan note: para poder comparar los valores, porque a = [1,2] b = [1,2] // a === b ---> false. Porque compara las posiciones 
en memoria, no los valores.
c = a / a === c ---> true; compara los valores.
*/

console.log(
  "numberToCube([1, 2, 3]) should return [1, 8, 27]",
  num.toString() === result,
  num
);

/*-----------------*/

/*TEST 3 --- Manera 2 ---- >  un test + dos manejo de errores*/


function test(testCase, message, check){
  try{
    var res = testCase()
    console.log(messsage, check(res), res);
  }catch(err){
    console.log(message, "FAILED")
  }
}

test(function(){return numbersToCube(2);},'numberToCube("2") should return 8', function(result){return result === 8})


function testThrowError(testCase, message){

  var error;

  try{
    testCase()
  }catch(err){
    error = err;
  }finally{
    console.log(message, error!== undefined, error);
  }
}

testThrowError(function(){numbersToCube("casa")}, "numbersToCube('casa') should launch and error") 
//nota zan: una función anónima pasa como parámetro otra función, que será lanzada cuando se la declare dentro de la primera
//Sino la encierro se ejecutaría  al llamarla antes que el testThrow.

testThrowError(function(){numbersToCube([1, 5, "casa", 8])}, "numbersToCube([1,5,'casa',8]) should launch and error") 



