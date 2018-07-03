'use strict'

var input =[1, 2 , 3];

test(
    function(){
        return map(input, function(v) {return v**2});
    },
'map([1, 2, 3], function(v){ return v**2;}) should return a new array with values [1, 4, 9]'
    ,
    function(result){
        return input !== result && result.toString() === '1,4,9' && input.toString === '1,2,3'; //nota zan: input !== result es para comprobar que no están en la misma posición de memoria y ha hecho un nuevo array.(por si se ha implementado mal el map())
    }
)

test(
    withErrorCapturing(
        function(){
            map();
        }
    ),
    'map() should throw an error if input array is not valid',
    function(result){
        return result.message === 'input array is not valid'
    }
);

test(
    withErrorCapturing(
        function(){
            map([]);
        }
    ),
    'map() should throw an error if input handler is undefined',
    function(result){
        return result.message === 'input handler is not valid'
    }
);