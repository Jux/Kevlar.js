Ext.data.JsonP.Kevlar({"singleton":true,"statics":{"cfg":[],"property":[],"css_var":[],"event":[],"css_mixin":[],"method":[]},"files":[{"filename":"Kevlar.js","href":"Kevlar.html#Kevlar"}],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/Kevlar.html#Kevlar' target='_blank'>Kevlar.js</a></div></pre><div class='doc-contents'><p>Main singleton class and utility functions for the Kevlar library.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-abstractFn' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-abstractFn' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-abstractFn' class='name expandable'>abstractFn</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>An abstract function (method). ...</div><div class='long'><p>An abstract function (method). This can be referred to in cases where you want a function\nthat is abstract, but do not want to create a new function object with a new thrown\nerror string (which can bloat the code when repeated over many abstract classes/functions).\nOne should check the call stack when this error is thrown to determine which abstract\nmethod they forgot to implement.</p>\n\n<p>Ex in a class's prototype object literal definition:</p>\n\n<pre><code>someMethod: <a href=\"#!/api/Kevlar-method-abstractFn\" rel=\"Kevlar-method-abstractFn\" class=\"docClass\">Kevlar.abstractFn</a>\n</code></pre>\n</div></div></div><div id='method-apply' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-apply' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-apply' class='name expandable'>apply</a>( <span class='pre'>Object obj, Object config, Object defaults</span> ) : Object</div><div class='description'><div class='short'>Copies all the properties of config to obj. ...</div><div class='long'><p>Copies all the properties of config to obj.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>obj</span> : Object<div class='sub-desc'><p>The receiver of the properties</p>\n</div></li><li><span class='pre'>config</span> : Object<div class='sub-desc'><p>The source of the properties</p>\n</div></li><li><span class='pre'>defaults</span> : Object<div class='sub-desc'><p>A different object that will also be applied for default values</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>returns obj</p>\n</div></li></ul></div></div></div><div id='method-applyIf' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-applyIf' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-applyIf' class='name expandable'>applyIf</a>( <span class='pre'>Object obj, Object config</span> ) : Object</div><div class='description'><div class='short'>Copies all the properties of config to obj if they don't already exist. ...</div><div class='long'><p>Copies all the properties of config to obj if they don't already exist.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>obj</span> : Object<div class='sub-desc'><p>The receiver of the properties</p>\n</div></li><li><span class='pre'>config</span> : Object<div class='sub-desc'><p>The source of the properties</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>returns obj</p>\n</div></li></ul></div></div></div><div id='method-each' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-each' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-each' class='name expandable'>each</a>( <span class='pre'>Array/NodeList/Mixed array, Function fn, Object scope</span> ) : Mixed</div><div class='description'><div class='short'>Iterates an array calling the supplied function. ...</div><div class='long'><p>Iterates an array calling the supplied function.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>array</span> : Array/NodeList/Mixed<div class='sub-desc'><p>The array to be iterated. If this\nargument is not really an array, the supplied function is called once.</p>\n</div></li><li><span class='pre'>fn</span> : Function<div class='sub-desc'><p>The function to be called with each item. If the\nsupplied function returns false, iteration stops and this method returns\nthe current <code>index</code>. This function is called with\nthe following arguments:</p>\n\n<div class=\"mdetail-params\"><ul>\n<li><code>item</code> : <i>Mixed</i>\n<div class=\"sub-desc\">The item at the current <code>index</code>\nin the passed <code>array</code></div></li>\n<li><code>index</code> : <i>Number</i>\n<div class=\"sub-desc\">The current index within the array</div></li>\n<li><code>allItems</code> : <i>Array</i>\n<div class=\"sub-desc\">The <code>array</code> passed as the first\nargument to <code><a href=\"#!/api/Kevlar-method-each\" rel=\"Kevlar-method-each\" class=\"docClass\">Kevlar.each</a></code>.</div></li>\n</ul></div>\n\n</div></li><li><span class='pre'>scope</span> : Object<div class='sub-desc'><p>The scope (<code>this</code> reference) in which the specified function is executed.\nDefaults to the <code>item</code> at the current <code>index</code>\nwithin the passed <code>array</code>.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Mixed</span><div class='sub-desc'><p>See description for the fn parameter.</p>\n</div></li></ul></div></div></div><div id='method-emptyFn' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-emptyFn' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-emptyFn' class='name expandable'>emptyFn</a>( <span class='pre'></span> )</div><div class='description'><div class='short'>An empty function. ...</div><div class='long'><p>An empty function. This can be referred to in cases where you want a function\nbut do not want to create a new function object. Used for performance and clarity\nreasons.</p>\n</div></div></div><div id='method-extend' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-extend' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-extend' class='name expandable'>extend</a>( <span class='pre'>Function superclass, [Array mixins], Object overrides</span> ) : Function</div><div class='description'><div class='short'>Extends one class to create a subclass of it based on a passed literal (overrides), and optionally any mixin\nclasses ...</div><div class='long'><p>Extends one class to create a subclass of it based on a passed literal (<code>overrides</code>), and optionally any mixin\nclasses that are desired.</p>\n\n<p>This method adds a few methods to the class that it creates:</p>\n\n<ul>\n<li>override : Method that can be used to override members of the class with a passed object literal.\nSame as <a href=\"#!/api/Kevlar-method-override\" rel=\"Kevlar-method-override\" class=\"docClass\">override</a>, without the first argument.</li>\n<li>extend : Method that can be used to directly extend the class. Same as this method, except without\nthe first argument.</li>\n<li>hasMixin : Method that can be used to find out if the class (or any of its superclasses) implement a given mixin.\nAccepts one argument: the class (constructor function) of the mixin. Note that it is preferable to check if a given\nobject is an instance of another class or has a mixin by using the <a href=\"#!/api/Kevlar-method-isInstanceOf\" rel=\"Kevlar-method-isInstanceOf\" class=\"docClass\">isInstanceOf</a> method. This hasMixin()\nmethod will just determine if the class has a given mixin, and not if it is an instance of a superclass, or even an\ninstance of itself.</li>\n</ul>\n\n\n<p>For example, to create a subclass of <a href=\"#!/api/Kevlar.util.Observable\" rel=\"Kevlar.util.Observable\" class=\"docClass\">Kevlar.util.Observable</a>, which will provide Observable events for the class:</p>\n\n<pre><code>MyComponent = <a href=\"#!/api/Kevlar-method-extend\" rel=\"Kevlar-method-extend\" class=\"docClass\">Kevlar.extend</a>( <a href=\"#!/api/Kevlar.util.Observable\" rel=\"Kevlar.util.Observable\" class=\"docClass\">Kevlar.util.Observable</a>, {\n\n    constructor : function( config ) {\n        // apply the properties of the config to the object\n        <a href=\"#!/api/Kevlar-method-apply\" rel=\"Kevlar-method-apply\" class=\"docClass\">Kevlar.apply</a>( this, config );\n\n        // Call superclass constructor\n        MyComponent.superclass.constructor.call( this );\n\n        // Your postprocessing here\n    },\n\n    // extension of another method (assuming Observable had this method)\n    someMethod : function() {\n        // some preprocessing, if needed\n\n        MyComponent.superclass.someMethod.apply( this, arguments );  // send all arguments to superclass method\n\n        // some post processing, if needed\n    },\n\n    // a new method for this subclass (not an extended method)\n    yourMethod: function() {\n        // etc.\n    }\n} );\n</code></pre>\n\n<p>This is an example of creating a class with a mixin called MyMixin:</p>\n\n<pre><code>MyComponent = <a href=\"#!/api/Kevlar-method-extend\" rel=\"Kevlar-method-extend\" class=\"docClass\">Kevlar.extend</a>( <a href=\"#!/api/Kevlar.util.Observable\" rel=\"Kevlar.util.Observable\" class=\"docClass\">Kevlar.util.Observable</a>, [ MyMixin ], {\n\n    constructor : function( config ) {\n        // apply the properties of the config to the object\n        <a href=\"#!/api/Kevlar-method-apply\" rel=\"Kevlar-method-apply\" class=\"docClass\">Kevlar.apply</a>( this, config );\n\n        // Call superclass constructor\n        MyComponent.superclass.constructor.call( this );\n\n        // Call the mixin's constructor\n        MyMixin.constructor.call( this );\n\n        // Your postprocessing here\n    },\n\n\n    // properties/methods of the mixin will be added automatically, if they don't exist already on the class\n\n\n    // method that overrides or extends a mixin's method\n    mixinMethod : function() {\n        // call the mixin's method, if desired\n        MyMixin.prototype.mixinMethod.call( this );\n\n        // post processing\n    }\n\n} );\n</code></pre>\n\n<p>Note that calling superclass methods can be done with either the [Class].superclass or [Class].<strong>super</strong> property.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>superclass</span> : Function<div class='sub-desc'><p>The constructor function of the class being extended.</p>\n</div></li><li><span class='pre'>mixins</span> : Array (optional)<div class='sub-desc'><p>Any mixin classes (constructor functions) that should be mixed into the new subclass\n  after it is extended from the superclass.  Mixin properties/methods will <em>not</em> overwrite class methods, and\n  mixins are taken in the supplied order for later-defined mixins to take precedence over earlier-defined mixins in the array.\n  This argument is the second argument to allow client code to be clean and readable.</p>\n</div></li><li><span class='pre'>overrides</span> : Object<div class='sub-desc'><p>An object literal with members that make up the subclass's properties/method. These are copied into the subclass's\n  prototype, and are therefore shared between all instances of the new class.</p>\n\n\n<p> <p>This may contain a special member named\n  <code>&lt;b&gt;constructor&lt;/b&gt;</code>, which is used to define the constructor function of the new subclass. If this property is <i>not</i> specified,\n  a constructor function is generated and returned which just calls the superclass's constructor, passing on its parameters.</p>\n  <p><b>It is essential that you call the superclass constructor in any provided constructor. See example code.</b></p></p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Function</span><div class='sub-desc'><p>The subclass constructor from the <code>overrides</code> parameter, or a generated one if not provided.</p>\n</div></li></ul></div></div></div><div id='method-isArray' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-isArray' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-isArray' class='name expandable'>isArray</a>( <span class='pre'>Mixed a</span> ) : Boolean</div><div class='description'><div class='short'>An accurate way of checking whether a given value is an Array. ...</div><div class='long'><p>An accurate way of checking whether a given value is an Array.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>a</span> : Mixed<div class='sub-desc'><p>The value to check.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-isBoolean' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-isBoolean' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-isBoolean' class='name expandable'>isBoolean</a>( <span class='pre'>Mixed v</span> ) : Boolean</div><div class='description'><div class='short'>Whether a given value is a Boolean. ...</div><div class='long'><p>Whether a given value is a Boolean.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>v</span> : Mixed<div class='sub-desc'><p>The value to check.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-isDate' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-isDate' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-isDate' class='name expandable'>isDate</a>( <span class='pre'>Object object</span> ) : Boolean</div><div class='description'><div class='short'>Returns true if the passed object is a JavaScript date object, otherwise false. ...</div><div class='long'><p>Returns true if the passed object is a JavaScript date object, otherwise false.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>object</span> : Object<div class='sub-desc'><p>The object to test</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-isDefined' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-isDefined' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-isDefined' class='name expandable'>isDefined</a>( <span class='pre'>Mixed value</span> ) : Boolean</div><div class='description'><div class='short'>Returns true if the passed value is not undefined. ...</div><div class='long'><p>Returns true if the passed value is not undefined.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : Mixed<div class='sub-desc'><p>The value to test</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-isElement' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-isElement' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-isElement' class='name expandable'>isElement</a>( <span class='pre'>Mixed v</span> ) : Boolean</div><div class='description'><div class='short'>Whether a given value is an DOM element. ...</div><div class='long'><p>Whether a given value is an DOM element.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>v</span> : Mixed<div class='sub-desc'><p>The value to check.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-isEmpty' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-isEmpty' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-isEmpty' class='name expandable'>isEmpty</a>( <span class='pre'>Mixed value, [Boolean allowBlank]</span> ) : Boolean</div><div class='description'><div class='short'>Returns true if the passed value is empty. ...</div><div class='long'><p>Returns true if the passed value is empty.</p>\n\n\n<p>The value is deemed to be empty if it is<div class=\"mdetail-params\"><ul>\n<li>null</li>\n<li>undefined</li>\n<li>an empty array</li>\n<li>a zero length string (Unless the `allowBlank` parameter is `true`)</li>\n</ul></div>\n\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : Mixed<div class='sub-desc'><p>The value to test</p>\n</div></li><li><span class='pre'>allowBlank</span> : Boolean (optional)<div class='sub-desc'><p>True to allow empty strings.</p>\n<p>Defaults to: <code>false</code></p></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-isFunction' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-isFunction' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-isFunction' class='name expandable'>isFunction</a>( <span class='pre'>Mixed v</span> ) : Boolean</div><div class='description'><div class='short'>Whether a given value is a Function. ...</div><div class='long'><p>Whether a given value is a Function.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>v</span> : Mixed<div class='sub-desc'><p>The value to check.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-isInstanceOf' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-isInstanceOf' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-isInstanceOf' class='name expandable'>isInstanceOf</a>( <span class='pre'>Mixed obj, Function jsClass</span> ) : Boolean</div><div class='description'><div class='short'>Determines if a given object (obj) is an instance of a given class (jsClass). ...</div><div class='long'><p>Determines if a given object (<code>obj</code>) is an instance of a given class (<code>jsClass</code>). This method will\nreturn true if the <code>obj</code> is an instance of the <code>jsClass</code> itself, if it is a subclass of the <code>jsClass</code>,\nor if the <code>jsClass</code> is a mixin on the <code>obj</code>. For more information about classes and mixins, see the\n<a href=\"#!/api/Kevlar-method-extend\" rel=\"Kevlar-method-extend\" class=\"docClass\">extend</a> method.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>obj</span> : Mixed<div class='sub-desc'><p>The object to test.</p>\n</div></li><li><span class='pre'>jsClass</span> : Function<div class='sub-desc'><p>The class (constructor function) to see if the obj is an instance of, or has a mixin</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'><p>True if the obj is an instance of the jsClass (it is a direct instance of it,\n  it inherits from it, or the jsClass is a mixin of it)</p>\n</div></li></ul></div></div></div><div id='method-isJQuery' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-isJQuery' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-isJQuery' class='name expandable'>isJQuery</a>( <span class='pre'>Mixed value</span> ) : Boolean</div><div class='description'><div class='short'>Returns true if the given value is a jQuery wrapped set object. ...</div><div class='long'><p>Returns true if the given <code>value</code> is a jQuery wrapped set object.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : Mixed<div class='sub-desc'><p>The value to check.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-isNumber' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-isNumber' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-isNumber' class='name expandable'>isNumber</a>( <span class='pre'>Mixed v</span> ) : Boolean</div><div class='description'><div class='short'>Whether a given value is a Number. ...</div><div class='long'><p>Whether a given value is a Number.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>v</span> : Mixed<div class='sub-desc'><p>The value to check.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-isObject' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-isObject' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-isObject' class='name expandable'>isObject</a>( <span class='pre'>Mixed v</span> ) : Boolean</div><div class='description'><div class='short'>Whether a given value is an Object. ...</div><div class='long'><p>Whether a given value is an Object.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>v</span> : Mixed<div class='sub-desc'><p>The value to check.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-isPrimitive' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-isPrimitive' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-isPrimitive' class='name expandable'>isPrimitive</a>( <span class='pre'>Mixed value</span> ) : Boolean</div><div class='description'><div class='short'>Returns true if the passed value is a JavaScript 'primitive' (i.e. ...</div><div class='long'><p>Returns true if the passed value is a JavaScript 'primitive' (i.e. a string, number, or boolean).</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>value</span> : Mixed<div class='sub-desc'><p>The value to test.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-isRegExp' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-isRegExp' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-isRegExp' class='name expandable'>isRegExp</a>( <span class='pre'>Mixed v</span> ) : Boolean</div><div class='description'><div class='short'>Whether a given value is a Regular Expression. ...</div><div class='long'><p>Whether a given value is a Regular Expression.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>v</span> : Mixed<div class='sub-desc'><p>The value to check.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-isString' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-isString' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-isString' class='name expandable'>isString</a>( <span class='pre'>Mixed v</span> ) : Boolean</div><div class='description'><div class='short'>Whether a given value is a String. ...</div><div class='long'><p>Whether a given value is a String.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>v</span> : Mixed<div class='sub-desc'><p>The value to check.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-isUndefined' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-isUndefined' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-isUndefined' class='name expandable'>isUndefined</a>( <span class='pre'>Mixed v</span> ) : Boolean</div><div class='description'><div class='short'>Whether a given value is undefined. ...</div><div class='long'><p>Whether a given value is undefined.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>v</span> : Mixed<div class='sub-desc'><p>The value to check</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Boolean</span><div class='sub-desc'>\n</div></li></ul></div></div></div><div id='method-namespace' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-namespace' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-namespace' class='name expandable'>namespace</a>( <span class='pre'>String namespace1, String namespace2, String etc</span> ) : Object</div><div class='description'><div class='short'>Creates namespaces to be used for scoping variables and classes so that they are not global. ...</div><div class='long'><p>Creates namespaces to be used for scoping variables and classes so that they are not global.\nSpecifying the last node of a namespace implicitly creates all other nodes. Usage:</p>\n\n<pre><code><a href=\"#!/api/Kevlar-method-namespace\" rel=\"Kevlar-method-namespace\" class=\"docClass\">Kevlar.namespace</a>( 'Company', 'Company.data' );\n<a href=\"#!/api/Kevlar-method-namespace\" rel=\"Kevlar-method-namespace\" class=\"docClass\">Kevlar.namespace</a>( 'Company.data' ); // equivalent and preferable to above syntax\nCompany.Widget = function() { ... }\nCompany.data.CustomStore = function(config) { ... }\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>namespace1</span> : String<div class='sub-desc'>\n</div></li><li><span class='pre'>namespace2</span> : String<div class='sub-desc'>\n</div></li><li><span class='pre'>etc</span> : String<div class='sub-desc'><p>...</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object</span><div class='sub-desc'><p>The namespace object. (If multiple arguments are passed, this will be the last namespace created)</p>\n</div></li></ul></div></div></div><div id='method-newId' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-newId' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-newId' class='name expandable'>newId</a>( <span class='pre'></span> ) : Number</div><div class='description'><div class='short'>Generates a new id. ...</div><div class='long'><p>Generates a new id. The id is a sequentially increasing number, starting with\nthe first returned number being 1.</p>\n<h3 class='pa'>Returns</h3><ul><li><span class='pre'>Number</span><div class='sub-desc'><p>The new id.</p>\n</div></li></ul></div></div></div><div id='method-override' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-override' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-override' class='name expandable'>override</a>( <span class='pre'>Object origclass, Object overrides</span> )</div><div class='description'><div class='short'>Adds a list of functions to the prototype of an existing class, overwriting any existing methods with the same name. ...</div><div class='long'><p>Adds a list of functions to the prototype of an existing class, overwriting any existing methods with the same name.\nUsage:</p>\n\n<pre><code><a href=\"#!/api/Kevlar-method-override\" rel=\"Kevlar-method-override\" class=\"docClass\">Kevlar.override</a>( MyClass, {\n    newMethod1 : function() {\n        // etc.\n    },\n    newMethod2 : function( foo ) {\n        // etc.\n    }\n} );\n</code></pre>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>origclass</span> : Object<div class='sub-desc'><p>The class to override</p>\n</div></li><li><span class='pre'>overrides</span> : Object<div class='sub-desc'><p>The list of functions to add to origClass.  This should be specified as an object literal\ncontaining one or more methods.</p>\n</div></li></ul></div></div></div><div id='method-toArray' class='member  not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar'>Kevlar</span><br/><a href='source/Kevlar.html#Kevlar-method-toArray' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar-method-toArray' class='name expandable'>toArray</a>( <span class='pre'>Array/Arguments/NodeList a</span> ) : Array</div><div class='description'><div class='short'>Converts any iterable (numeric indices and a length property) into a true array\nDon't use this on strings. ...</div><div class='long'><p>Converts any iterable (numeric indices and a length property) into a true array\nDon't use this on strings. IE doesn't support \"abc\"[0] which this implementation depends on.\nFor strings, use this instead: \"abc\".match(/./g) => [a,b,c];</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>a</span> : Array/Arguments/NodeList<div class='sub-desc'><p>The iterable object to be turned into a true Array.</p>\n</div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Array</span><div class='sub-desc'><p>The array.</p>\n</div></li></ul></div></div></div></div></div></div></div>","uses":[],"code_type":"assignment","inheritdoc":null,"superclasses":[],"mixins":[],"members":{"property":[],"cfg":[],"css_var":[],"css_mixin":[],"event":[],"method":[{"owner":"Kevlar","meta":{},"name":"abstractFn","id":"method-abstractFn","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"apply","id":"method-apply","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"applyIf","id":"method-applyIf","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"each","id":"method-each","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"emptyFn","id":"method-emptyFn","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"extend","id":"method-extend","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"isArray","id":"method-isArray","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"isBoolean","id":"method-isBoolean","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"isDate","id":"method-isDate","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"isDefined","id":"method-isDefined","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"isElement","id":"method-isElement","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"isEmpty","id":"method-isEmpty","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"isFunction","id":"method-isFunction","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"isInstanceOf","id":"method-isInstanceOf","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"isJQuery","id":"method-isJQuery","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"isNumber","id":"method-isNumber","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"isObject","id":"method-isObject","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"isPrimitive","id":"method-isPrimitive","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"isRegExp","id":"method-isRegExp","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"isString","id":"method-isString","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"isUndefined","id":"method-isUndefined","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"namespace","id":"method-namespace","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"newId","id":"method-newId","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"override","id":"method-override","tagname":"method"},{"owner":"Kevlar","meta":{},"name":"toArray","id":"method-toArray","tagname":"method"}]},"component":false,"meta":{},"private":false,"mixedInto":[],"name":"Kevlar","alternateClassNames":[],"aliases":{},"html_meta":{},"tagname":"class","extends":null,"requires":[],"id":"class-Kevlar","allMixins":[],"subclasses":[],"inheritable":false});