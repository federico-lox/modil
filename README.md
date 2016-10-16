Modil ![Travis CI build status][travis status] [![Code Climate](https://codeclimate.com/github/federico-lox/modil.png)][codeclimate]
==============================================
A no-frills, lightweight and fast [AMD] implementation for modular JavaScript
projects meant to run in a web browser.

Rationale
---------
What makes Modil differ from [RequireJS] and other non-_AMD_ module systems for
JavaScript and why should you use it? Here's a list of good reasons:

* **Made for the web, but not only**: Modil is designed from the ground up as
  a platform-agnostic vanilla _JavaScript_ library, i.e. no assumptions are
  done on how modules are loaded; this means less code (no checks for existing
  implementations) and better overall performance; if you need to get _Modil_
  run on a specific platform it's really easy to fork the code and add support
  also because of this
* **Good practices**: _AMD_ is a great pattern that helps in keeping complex
  applications modular by enforcing some industry-recognized good practices
  (e.g. clear dependencies declaration and injection, no pollution of the
  global scope, etc.)
* **Simplicity and performance**: _RequireJS_ has evolved from a pure _AMD_
  implementation into a complex and extensible assets loader, its' size and
  goals may not match your expectations and needs, especially if all you want
  is a module system, you already use an assets loader/mechanism or you're
  working on platforms where the overall size of the code and its' performance
  are a critical factor (e.g. mobile)
* **Clear rules**: differently than _RequireJS_, _Modil_ has a strict API and
  enforces defining methods using an ID, this makes your code more
  maintainable, since you won't need to update your code when a module's file
  name changes, and makes the library a lot less complex (no eval mumbo-jumbo,
  no assumptions on how you package/load your modules), also module libraries
  (a script with more than one inter-dependent module) are a possibility with
  no need to go through a _node_-powered packager/preprocessor
* **Useful additions** to the _AMD_ pattern
  * Support for references to existing objects and values as define/require
    dependencies bridging the gap between _AMD_ and non-_AMD_ code without
    breaking the dependencies declaration/injection mechanism; this means you
    can use existing frameworks/libraries without the need to wrap them in a
    dummy module or waiting for those to start supporting _AMD_
  * Possibility to mock functionality (even partially) of a module via
    `define.mock`
  * Otional dependencies via `require.optional`
  * Circular dependencies detection, an error will be thrown; circular
    dependencies usually make the code more fragile and are a pointer of a
    sub-optimal design
  * Coming soon: support for the deferreds/promises API, another very
    interesting pattern that helps you make asynchronous code more elegant and
    maintainable


Information for contributors
----------------------------
### Tests
Modil uses [Karma] for running [Jasmine] specs, to execute the tests:

* use `npm test` for a single run
* use `npm start` to start _Karma_ in continuous run mode

Credits
-------
*	[Federico "Lox" Lucignano](federico-lox), creator and maintainer
* [Jakub Olek](hakubo-profile), maintainer and helper
*	[James Burke], the mind behind the original AMD proposal and specification
  which has inspired this project
*	All the [contributors]


[amd]: https://github.com/amdjs/amdjs-api/wiki/AMD
[travis status]: https://travis-ci.org/federico-lox/modil.png?branch=master
[codeclimate]: https://codeclimate.com/github/federico-lox/modil
[requirejs]: http://requirejs.org
[karma]: http://karma-runner.github.io
[jasmine]: https://jasmine.github.io/
[federico-lox]: https://github.com/federico-lox "Federico Lucignano on Github"
[jakub olek]: https://github.com/hakubo "Jakub Olek on Github"
[james burke]: https://github.com/jrburke "James Burke on Github"
[contributors]: http://github.com/federico-lox/modil/contributors

