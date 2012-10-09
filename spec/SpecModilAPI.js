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

		it('should throw', function(){
			expect(function(){
				define('module');
			}).toThrow();

			expect(function(){
				define('module', 'dependencies', function(){});
			}).toThrow();
		})

		it('should be a function', function (){
			expect(define.mock).toBeDefined();
			expect(define.mock instanceof Function).toBe(true);
		});

		it('should return OptionalModule', function(){
			var optionalModule = define.optional('module');
			expect(optionalModule ).toBeTruthy();
			expect(optionalModule.toString()).toEqual('module');
		});
	});

	describe("require", function () {
		it("should be a function", function () {
			expect(typeof require).toBe('function');
		});

		it('should throw an exception', function(){
			expect(function(){
				require();
			}).toThrow();

			expect(function(){
				require('iDontExist')
			}).toThrow();

			expect(function(){
				require('iDontExist', 'iShouldBeFunction')
			}).toThrow();

			expect(function(){
				require(['iDontExist'], 'iShouldBeFunction')
			}).toThrow();
		});
	});
});