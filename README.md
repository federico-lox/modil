Modil [![Travis CI build status](https://travis-ci.org/federico-lox/modil.png?branch=master)](https://travis-ci.org/federico-lox/modil/branches)
=====
A no-frills, lightweight and fast AMD implementation for modular Javascript projects meant to run in a Web browser.

Rationale
---------
What makes Modil different from RequireJS and other non-AMD module systems for JavaScript and why should you
use it?

Here's a list of good reasons:

* **Made for the web, but not only**: differently than other AMD implementations (e.g. RequireJS), modil.js is designed from the ground up
  as a platform-agnostic pure JavaScript library, no assumptions are done on how modules should be loaded, this means
  less code (no checks on existing implementations) and better overall performances; if you need to have modil.js run
  on a specific platform it's really easy to fork the code and add support also thanks to this
* **Good practices**: AMD is a great pattern that helps you keeping your complex applications/scripts modular enforcing some industry-recognized
  good practices (clear dependencies declaration and injection, no pollution of the global scope, etc.);
* **Simplicity and performance**: RequireJS has evolved from a pure AMD implementation into a complex and extensible assets loader, its' size and purposes
  may not match your expectations and needs, especially if all you want is a module system, you already use an assets loader/mechanism
  or you're working on platforms where the overall size of the code and its' performances are a critical factor (e.g. mobile);
* **Clear rules**: modil.js, differently than RequireJS, has a strict API and enforces defining methods using an ID, this makes your code more maintainable, since
  you won't need to update your code when a module's file name changes, and makes the library a lot less complex (no eval
  mumbo-jumbo, no assumptions on how you package/load your modules), also module libraries (a script with more than one inter-dependent
  module) are a possibility with no need to go through a nodeJS packager
* **Useful additions** to the AMD proposal:
  * focusing on being a module system, modil.js introduces support for references to existing objects and values as define/require dependencies bridging
  the gap between AMD and non-AMD code without breaking the dependencies declaration/injection mechanism (this means you can
  use existing frameworks/libraries without the need to wrap them in a dummy module or waiting for those to support AMD)
  * possibility to mock (even partiallu) functionality of a module via define.mock
  * optional dependencies via require.optional
  * circular dependencies detection, when detected an error will be thrown; circular dependencies usually make the code more fragile and are a pointer of a sub-optimal design
  * coming soon - support for the deferreds/promises API, another very interesting pattern that
  helps you make your code more elegant maintainable

Credits
-------
*	[Federico "Lox" Lucignano](https://plus.google.com/+FedericoLucignano/about "Google profile"), creator and maintainer
* [Jakub Olek](https://plus.google.com/112565259111817320425/about), maintainer and helper
*	[James Burke](https://github.com/jrburke), the mind behind the AMD proposal which has inspired this project, creator and maintainer of [Require.js](http://requirejs.org/)
*	All the [contributors](http://github.com/federico-lox/modil/contributors "modil.js contributors at GitHub")

Special thanks to:
[Artur Klajnerok](https://plus.google.com/109367642971679785165/about) for the support and the feedback.
