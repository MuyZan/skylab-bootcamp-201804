'use strict';

describe('logic (beers)', function() {
    it('should search beers', function(done) {
        logic.searchBeers('mahou', function(beers) {
            expect(beers).toBeDefined();

            expect(beers.length).toBe(4);

            done();
        });
    });

    it("should search beers fail on wrong matching", function(done){
        logic.searchBeers("watafac", function(error, beers){
            expect(error).toBeDefined();

            expect(beers).toBeUndefined();

            done();
        })

    })

    it('should get beer info', function(done) {
        logic.getBeerInfo('xnRniA', function(beer) {
            expect(beer).toBeDefined();

            expect(beer.id).toBe('xnRniA');

            done();
        });
    });

    it("should get beer info fail on wrong id", function(done){
        logic.getBeerInfo("watafac", function(error, beer){
            expect(error).toBeDefined();

            expect(beer).toBeUndefined();

            done();

        })
    })
});