'use strict'

describe('cube', function(){
    it("should numbersToCube(3) return 27", function(){
        expect(numbersToCube(3)).toBe(27);
    });

    it("should numbersToCube([1, 2, 3]) return [1, 8, 27]", function(){
        expect(numbersToCube([1, 2, 3])).toEqual([1, 8, 27]);
    });

    it("should numbersToCube(true) throw an error", function(){
        expect(function(){
            numbersToCube(true);
        }).toThrow(Error("It is not a number or array!"));
    });

    it("should numbersToCube([1, 2, 'a']) throw an error", function(){
        expect(function(){
            numbersToCube([1, 2, 'a']);
        }).toThrow(Error("Input array is not a number in the index 2"));
    });
});

