/**
 * modil.js
 *
 * A no-frills, lightweight and fast AMD implementation
 * for modular JavaScript projects.
 *
 * @author Federico "Lox" Lucignano
 * <https://plus.google.com/117046182016070432246>
 *
 * @see https://github.com/federico-lox/modil.js
 * @see http://requirejs.org/docs/api.html for example
 * and docs until the official docs for modil ain't ready
 */

/*global setTimeout*/
(function (context) {
	'use strict';

	var modules = {},
		definitions = {},
		processing = {},
		//help minification
		arrType = Array,
		funcType = Function,
		strType = 'string',
		yes = true,
		nil = null,
		def;

	/**
	 * @private
	 */
	function process(id, reqId) {
		var module = modules[id],
			//manage the process chain per require
			//call since it can be an async call
			pid = processing[reqId],
			dependencies,
			chain = '',
			x,
			y,
			p;

		if (module) {
			return module;
		}

		if (!pid) {
			pid = {length: 0};
		} else if (pid[id]) {
			for (p in pid) {
				if (p !== 'length') {
					chain += p + '->';
				}
			}

			throw 'circular dependency: ' + chain + id;
		}

		pid[id] = yes;
		pid.length += 1;
		processing[reqId] = pid;
		module = definitions[id];

		if (module && module.def) {
			if (module.dep instanceof arrType) {
				dependencies = [];

				for (x = 0, y = module.dep.length; x < y; x += 1) {
					dependencies[x] = process(module.dep[x], reqId);
				}
			}

			modules[id] = module = module.def.apply(context, dependencies);
		} else {
			throw 'Module ' + id + ' is not defined.';
		}

		delete definitions[id];
		delete pid[id];
		pid.length -= 1;

		if (!pid.length) {
			delete processing[reqId];
		}

		return module;
	}

	/**
	 * @public
	 */
	context.define = def = function (id, dependencies, definition) {
		if (typeof id !== strType) {
			throw "Module id missing or not a string.";
		}

		//no dependencies array, it's actually the definition
		if (!definition && dependencies) {
			definition = dependencies;
			dependencies = nil;
		}

		if (!definition) {
			throw "Module " + id + " is missing a definition.";
		} else if (definition instanceof funcType) {
			if (dependencies === nil || dependencies instanceof arrType) {
				definitions[id] = {def: definition, dep: dependencies};
			} else {
				throw 'Invalid dependencies for module ' + id;
			}
		} else {
			modules[id] = definition;
		}
	};

	/**
	 * declare support for the AMD spec
	 */
	def.amd = {
		/**
		 * @see https://github.com/amdjs/amdjs-api/wiki/jQuery-and-AMD
		 */
		jQuery: yes
	};

	/**
	 * @public
	 */
	context.require = function (ids, callback, errHandler) {
		if (ids instanceof arrType && callback instanceof funcType) {
			//execute asynchronously
			setTimeout(function () {
				try {
					var reqId = Math.random(),
						m = [],
						x,
						y;

					for (x = 0, y = ids.length; x < y; x += 1) {
						m[x] = process(ids[x], reqId);
					}

					callback.apply(context, m);
				} catch (err) {
					if (errHandler instanceof funcType) {
						errHandler.call(context, err);
					} else {
						throw err;
					}
				}
			}, 0);
		} else {
			throw 'Invalid require call.';
		}
	};

	//clear up temporary refs
	def = nil;
}(this));