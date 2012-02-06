Ext.data.JsonP.Kevlar_data_NativeObjectConverter({"singleton":true,"statics":{"cfg":[],"property":[],"css_var":[],"event":[],"css_mixin":[],"method":[]},"files":[{"filename":"NativeObjectConverter.js","href":"NativeObjectConverter.html#Kevlar-data-NativeObjectConverter"}],"html":"<div><pre class=\"hierarchy\"><h4>Files</h4><div class='dependency'><a href='source/NativeObjectConverter.html#Kevlar-data-NativeObjectConverter' target='_blank'>NativeObjectConverter.js</a></div></pre><div class='doc-contents'><p class='private'><strong>NOTE</strong> This is a private utility class for internal use by the framework. Don't rely on its existence.</p><p>NativeObjectConverter allows for the conversion of Collection / <a href=\"#!/api/Kevlar.Model\" rel=\"Kevlar.Model\" class=\"docClass\">Models</a>\nto their native Array / Object representations, while dealing with circular dependencies.</p>\n</div><div class='members'><div class='members-section'><div class='definedBy'>Defined By</div><h3 class='members-title icon-method'>Methods</h3><div class='subsection'><div id='method-convert' class='member first-child not-inherited'><a href='#' class='side expandable'><span>&nbsp;</span></a><div class='title'><div class='meta'><span class='defined-in' rel='Kevlar.data.NativeObjectConverter'>Kevlar.data.NativeObjectConverter</span><br/><a href='source/NativeObjectConverter.html#Kevlar-data-NativeObjectConverter-method-convert' target='_blank' class='view-source'>view source</a></div><a href='#!/api/Kevlar.data.NativeObjectConverter-method-convert' class='name expandable'>convert</a>( <span class='pre'>Kevlar.Collection/Kevlar.Model A, [Object options]</span> ) : Object[]/Object</div><div class='description'><div class='short'>Converts a Collection or Kevlar.Model to its native Array/Object representation,\nwhile dealing with circular dependen...</div><div class='long'><p>Converts a Collection or <a href=\"#!/api/Kevlar.Model\" rel=\"Kevlar.Model\" class=\"docClass\">Kevlar.Model</a> to its native Array/Object representation,\nwhile dealing with circular dependencies.</p>\n<h3 class=\"pa\">Parameters</h3><ul><li><span class='pre'>A</span> : Kevlar.Collection/Kevlar.Model<div class='sub-desc'><p>Collection or Model to convert to its native Array/Object representation.</p>\n</div></li><li><span class='pre'>options</span> : Object (optional)<div class='sub-desc'><p>An object (hashmap) of options to change the behavior of this method. This may include:</p>\n<ul><li><span class='pre'>attributeNames</span> : String[] (optional)<div class='sub-desc'><p>In the case that a <a href=\"#!/api/Kevlar.Model\" rel=\"Kevlar.Model\" class=\"docClass\">Model</a> is provided to this method, this\n  may be an array of the attribute names that should be returned in the output object.  Other attributes will not be processed.\n  (Note: only affects the Model passed to this method, and not nested models.)</p>\n</div></li><li><span class='pre'>persistedOnly</span> : Boolean (optional)<div class='sub-desc'><p>True to have the method only return data for the persisted attributes on\n  Models (i.e. attributes with the <a href=\"#!/api/Kevlar.Attribute-cfg-persist\" rel=\"Kevlar.Attribute-cfg-persist\" class=\"docClass\">persist</a> config set to true, which is the default).</p>\n</div></li><li><span class='pre'>raw</span> : Boolean (optional)<div class='sub-desc'><p>True to have the method only return the raw data for the attributes, by way of the <a href=\"#!/api/Kevlar.Model-method-raw\" rel=\"Kevlar.Model-method-raw\" class=\"docClass\">Kevlar.Model.raw</a> method.\n  This is used for persistence, where the raw data values go to the server rather than higher-level objects, or where some kind of serialization\n  to a string must take place before persistence (such as for Date objects).</p>\n</div></li></ul></div></li></ul><h3 class='pa'>Returns</h3><ul><li><span class='pre'>Object[]/Object</span><div class='sub-desc'><p>An array of objects (for the case of a Collection}, or an Object (for the case of a Model)\n  with the internal attributes converted to their native equivalent.</p>\n</div></li></ul></div></div></div></div></div></div></div>","uses":[],"code_type":"assignment","inheritdoc":null,"superclasses":[],"mixins":[],"members":{"property":[],"cfg":[],"css_var":[],"css_mixin":[],"event":[],"method":[{"owner":"Kevlar.data.NativeObjectConverter","meta":{},"name":"convert","id":"method-convert","tagname":"method"}]},"component":false,"meta":{},"private":true,"mixedInto":[],"name":"Kevlar.data.NativeObjectConverter","alternateClassNames":[],"aliases":{},"html_meta":{},"tagname":"class","extends":null,"requires":[],"id":"class-Kevlar.data.NativeObjectConverter","allMixins":[],"subclasses":[],"inheritable":false});