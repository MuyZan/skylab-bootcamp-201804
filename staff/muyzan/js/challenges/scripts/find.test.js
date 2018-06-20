'use strict'

test(
    function(){
        return find(['john', 'mary', 'jack'], function(v){ return v.indexOf("a") > -1;}); //nota zan: el -1 es porque indexOf, devuelve el índice del carácter, sino lo encuentra devuelve -1, así evitamos.
    },
    'find(["john", "mary", "jack"], function(v){ return v.indexOf("a") > -1}); should return "mary"',
    function(result){
        return result === "mary";
    }
);