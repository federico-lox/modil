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
	function process(id, reqId){
		var module = modules[id],
			//manage the process chain per require call since it can be an async call
			pid = processing[reqId],
			dependencies,
			chain = '',
			x = 0,
			y,
			p;

		if(module){
			return module;
		}

		if(!pid){
			pid = {length: 0};
		}else if(pid[id]){
			for(p in pid){
				if(p !== 'length'){
					chain += p + '->';
				}
			}

			throw 'circular dependency: ' + chain + id;
		}

		pid[id] = yes;
		pid.length++;
		processing[reqId] = pid;
		module = definitions[id];

		if(module && module.def){
			if(module.dep instanceof arrType){
				dependencies = [];
				y = module.dep.length;

				for(; x < y; x++){
					dependencies[x] = process(module.dep[x], reqId);
				}
			}

			modules[id] = module = module.def.apply(context, dependencies);
		}else{
			throw 'Module ' + id + ' is not defined.';
		}

		delete definitions[id];
		delete pid[id];
		pid.length--;

		if(!pid.length){
			delete processing[reqId];
		}

		return module;
	}

	/**
	 * @public
	 */
	context.define = def = function(id, dependencies, definition){
		if(typeof id !== strType){
			throw "Module id missing or not a string.";
		}

		//no dependencies array, it's actually the definition
		if(!definition && dependencies){
			definition = dependencies;
			dependencies = nil;
		}

		if(!definition){
			throw "Module " + id + " is missing a definition.";
		}

		if(definition instanceof funcType){
			if(dependencies === nil || dependencies instanceof arrType){
				definitions[id] = {def: definition, dep: dependencies};
			}else{
				throw 'Invalid dependencies for module ' + id;
			}
		}else{
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
	context.require = function(ids, callback, errHandler){
		if(ids instanceof arrType && callback instanceof funcType){
			//execute asynchronously
			setTimeout(function(){
				var reqId = Math.random();
					m = [];

				var x = 0,
					y = ids.length;

				try{
					for(; x < y; x++){
						m[x] = process(ids[x], reqId);
					}
				}catch(err){
					if(errHandler instanceof funcType){
						errHandler.call(context, err);
					}else{
						throw err;
					}
				}

				callback.apply(context, m);
			}, 0);
		}else{
			throw 'Invalid require call.';
		}
	};

	//clear up temporary refs
	def = nil;
}(this));