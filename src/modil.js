/**
 * modil.js
 * 
 * A no-frills, lightweight and fast AMD implementation for modular Javascript projects.
 * 
 * @author Federico "Lox" Lucignano <https://plus.google.com/117046182016070432246>
 * @see https://github.com/federico-lox/modil.js
 * @see http://requirejs.org/docs/api.html for example and docs until the official docs for modil ain't ready
 */

(function(context){
	var modules = {},
		definitions = {},
		processing = {},
		arrType = Array,
		funcType = Function,
		strType = 'string';

	/**
	 * @private
	 */
	function process(name){
		var module = modules[name],
			dependencies;

		if(module)
			return module;

		if(processing[name]){
			var chain = '',
				p;

			for(p in processing)
				chain += p + '->';

			throw "circular dependency: " + chain + name;
		}

		processing[name] = true;
		module = definitions[name];

		if(module.dep instanceof arrType){
			dependencies = [];

			for(var x = 0, y = module.dep.length; x < y; x++){
				dependencies[x] = process(module.dep[x]);
			}
		}

		module = modules[name] = module.def.apply(context, dependencies);
		delete processing[name];
		delete definitions[name];
		return module;
	}

	/**
	 * @public
	 */
	context.define = function(name, dependencies, definition){
		if(typeof name != strType)
			throw "module name missing or not a string";

		//no dependencies array, it's actually the definition
		if(!definition && dependencies){
			definition = dependencies
			dependencies = undefined;
		}

		if(!definition)
			throw "module " + name + " is missing a definition";

		if(definition instanceof funcType)
			definitions[name] = {def: definition, dep: dependencies}
		else
			modules[name] = definition;
	};

	/**
	 * @public
	 */
	context.require = function(name, callback){
		var isArray = name instanceof arrType,
			m = [];

		if(typeof name != strType && !isArray)
			throw "module name missing or not valid";

		if(isArray){
			for(var x = 0, y = name.length; x < y; x++)
				m[x] = process(name[x]);
		}else
			m[0] = process(name);

		if(callback instanceof funcType)
			callback.apply(context, m);
	};
}(this));