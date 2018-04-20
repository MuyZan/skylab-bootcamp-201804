'use strict';

describe('countChars', function () {
    it('should return 27 on cube (3)', function () {
        expect(cube(3)).toBe(27);
    })

    it('should cube([1, 2, 3]) return [1,8,27]', function () {
        expect(cube([1, 2, 3])).toEqual([1, 8, 27])
    });

    it('should cube(true) throw an error', function () {
        expect(function () {
            cube(true);
        }).toThrow(Error('input num is not a number, neither an array'))
    })

    it('should cube([1, 2, "a"]) throw error', function () {
        expect(function () {
            cube([1, 2, "a"]);
        }).toThrow(Error('input array is not a number at index 2'))
    })
});