'use strict'

describe("forEach", function(){
    
    it("should fullfill output with input values", function(){
        var input = [1, 2, 3];
     var output = [];
        forEach(input, function(v){output.push(v);});

        expect(input.length).toBe(output.length); //compara que esté en la misma zona de memoria, que sea lo mismo.
        expect(input).toEqual(output); //compara que sea igual a. (no sólo valores sino tb propiedades, como por ejemplo el prototype)
    });

    it("should throw error when no arguments", function(){
        expect(function(){
            forEach();
        
        }).toThrow(Error('The first input is not an array!'));
    });
});