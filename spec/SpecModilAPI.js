/**
 * modil.js API unit tests
 *
 * @author Federico "Lox" Lucignano
 * <https://plus.google.com/117046182016070432246>
 */

/*global describe, it, expect, define, require*/
describe("API", function () {
	'use strict';

	describe("define", function () {
		it("should be a function", function () {
			expect(define instanceof Function).toBe(true);
		});

		it("should support AMD", function () {
			expect(define.amd).toBeDefined();
		});
	});

	describe("require", function () {
		it("should be a function", function () {
			expect(typeof require).toBe('function');
		});
	});
});