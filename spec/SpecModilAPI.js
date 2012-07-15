/*
 * modil.js API unit tests
 *
 * @author Federico "Lox" Lucignano <https://plus.google.com/117046182016070432246>
 */

describe("API", function(){
	describe("define", function(){
		var a = function(){};

		it("should be a function", function(){
			expect(define instanceof Function).toBe(true);
		});

		it("should support AMD", function(){
			expect(define.amd).toBeDefined();
		});
	});

	describe("require", function(){
		var a = function(){};

		it("should be a function", function(){
			expect(typeof require).toBe('function');
		});
	});
})
