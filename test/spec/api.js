/**
 * modil.js API unit tests
 *
 * @author Federico "Lox" Lucignano
 * <https://plus.google.com/117046182016070432246>
 */

/*global describe, it, expect, define, require*/
describe("API", function () {
	'use strict';

	describe("Modil namespace", function (){
		it("should be defined", function () {
			expect(Modil).toBeDefined();
		});
	});

	describe("define", function () {
		it("should be a namespaced function", function () {
			expect(Modil.define).toEqual(jasmine.any(Function));
		});

		it("should be a global function", function () {
			expect(define).toEqual(jasmine.any(Function));
		});

		it("should support AMD", function () {
			expect(define.amd).toBeDefined();
		});

		it('should throw an exception', function () {
			expect(function () {
				define();
			}).toThrow();

			expect(function () {
				define('module');
			}).toThrow();

			expect(function () {
				define('module', 'dependencies', function(){});
			}).toThrow();

			expect(function () {
				define(function () {});
			});
		})

		it('should have a mock helper function', function (){
			expect(define.mock).toEqual(jasmine.any(Function));
		});
	});

	describe("require", function () {
		it("should be a namespaced function", function () {
			expect(Modil.require).toEqual(jasmine.any(Function));
		});

		it("should be a global function", function () {
			expect(require).toEqual(jasmine.any(Function));
		});

		it('should throw an exception', function(){
			expect(function () {
				require();
			}).toThrow();

			expect(function () {
				require('doesnt.exist');
			}).toThrow();

			expect(function () {
				require('doesnt.exist', 'not.a.function')
			}).toThrow();

			expect(function(){
				require(['doesnt.exist'], 'not.a.function')
			}).toThrow();

			var calls = 0;

			runs(function () {
				require(['doesnt.exist'], function () {}, function () {
					calls++;
				});
			});

			waitsFor(function () {
				return calls > 0;
			}, "error callback to be called", 100);

			runs(function () {
				expect(calls).toEqual(1);
			})
		});

		it('should have an helper function to mark optional dependencies',
			function(){
				expect(require.optional).toEqual(jasmine.any(Function));
			}
		);
	});
});
