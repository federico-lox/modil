/*
 * modil.js API unit tests
 * 
 * @author Federico "Lox" Lucignano <https://plus.google.com/117046182016070432246>
 */

describe("API", function(){
	describe("define", function(){
		var a = function(){};

		it("should be a function", function(){
			expect(typeof define).toBe('function');
		});
	});

	describe("require", function(){
		var a = function(){};

		it("should be a function", function(){
			expect(typeof require).toBe('function');
		});
	});
})
