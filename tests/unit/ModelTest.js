/*global window, Ext, Y, JsMockito, tests, Kevlar */
tests.unit.Kevlar.Model = new Ext.test.TestSuite( {
    
	parentSuite: tests.unit,
	name: 'Kevlar.Model',
	
	
	items : [
	
		{
			/*
			 * Test Fields Inheritance
			 */
			name: 'Test Fields Inheritance',
			
	
			setUp : function() {
				this.TestModel = Kevlar.extend( Kevlar.Model, {
					addFields: [
						{ name: 'field1' },
						{ name: 'field2', defaultValue: "field2's default" },
						{ name: 'field3', defaultValue: function() { return "field3's default"; } },
						{ name: 'field4', set : function( value, model ) { return model.get( 'field1' ) + " " + model.get( 'field2' ); } },
						{ name: 'field5', set : function( value, model ) { return value + " " + model.get( 'field2' ); } }
					]
				} );
			},
			
			
			
			/*
			 * Utility method to remove duplicates from an array. Used by {@link #assertFieldsHashCorrect} for its check for the number of
			 * fields that should exist.  Uses a hash to remove duplicates.
			 * 
			 * @method removeArrayDuplicates 
			 * @param {Array} arr
			 */
			removeArrayDuplicates : function( arr ) {
				var out=[], obj={};
				
				for( var i = 0, len = arr.length; i < len; i++ ) {
					obj[ arr[ i ] ] = 0;
				}
				for( i in obj ) { if( obj.hasOwnProperty( i ) ) { out.push( i ); } }
				
				return out;
			},
			
			
			/*
			 * Given a Model (provided as the last arg), and its superclasses, asserts that the number of fields found on the prototypes of each Model
			 * matches the number of keys in the final {@link Kevlar.Model#fields} hash, and that there is one key for each Field
			 * found in the 'fields' prototype arrays.
			 * 
			 * Basically asserts that the final hash that the Kevlar.Model compiles from itself, and all of its superclasses, is correct.
			 * 
			 * @method assertFieldsHashCorrect
			 * @param {Kevlar.Model...} One or more Model classes, starting with the highest level Model (the "highest superclass" Model),
			 *   going all the way down to the lowest subclass Model.  Ex of args: Model, SubClassModel, SubSubClassModel. In this example,
			 *   the SubSubClassModel is the Model that will be tested.  
			 */
			assertFieldsHashCorrect : function( /* ... */ ) {
				var models = Kevlar.toArray( arguments ),
				    i, len;
				
				// Get the full array of prototype fields (from the Model, SubClassModel, SubSubClassModel, etc), and the expected number of fields
				var prototypeFields = [];
				for( i = 0, len = models.length; i < len; i++ ) {
					var currentPrototype = models[ i ].prototype;
					if( currentPrototype.hasOwnProperty( 'addFields' ) ) {
						prototypeFields = prototypeFields.concat( models[ i ].prototype.addFields );
					}
				}
				
				// Convert the array to a duplicates-removed array of field names
				var fieldNames = [];
				for( i = 0, len = prototypeFields.length; i < len; i++ ) {
					var fieldName = new Kevlar.Field( prototypeFields[ i ] ).getName();
					fieldNames.push( fieldName );
				}
				fieldNames = this.removeArrayDuplicates( fieldNames );
				var expectedFieldCount = fieldNames.length;
				
				
				// Check the instance fields of the Model under test now
				var instance = new models[ models.length - 1 ](),  // the last Model class provided to the method. It is assumed that all previous arguments are its superclasses
				    instanceFields = instance.fields;
				
				var fieldCount = Kevlar.util.Object.length( instanceFields );
				Y.Assert.areSame( expectedFieldCount, fieldCount, "There should be the same number of resulting fields in the 'instanceFields' hash as the original 'fields' arrays of the Model classes." );
				
				// Check that all of the fields defined by each Model's prototype exist in the final 'fields' hash
				for( i = 0, len = fieldNames.length; i < len; i++ ) {
					Y.ObjectAssert.hasKey( fieldNames[ i ], instanceFields, "The Model (last arg to assertFieldsHashCorrect) should have defined the '" + fieldNames[ i ] + "' field in its final 'fields' hash" );
				}
			},
			
			// ---------------------------
			
			
			// Tests
			
			
			"The Kevlar.Model class itself (i.e. no superclass Model) should just have the fields defined on its prototype." : function() {
				var Model = Kevlar.Model;
				
				// Run the test code
				this.assertFieldsHashCorrect( Model );
			},
			
			
			"Fields should inherit from a Model subclass's superclass when the subclass defines no fields of its own" : function() {
				var Model = Kevlar.Model;
				var SubClassModel = Kevlar.extend( Model, {} );
				
				// Run the test code
				this.assertFieldsHashCorrect( Model, SubClassModel );
			},
			
			
			"Fields should inherit from a Model subclass's superclass when the subclass does define fields of its own" : function() {
				// Reference the base class, and create a subclass
				var Model = Kevlar.Model;
				var SubClassModel = Kevlar.extend( Model, {
					addFields : [ 'a', 'b' ]
				} );
				
				// Run the test code
				this.assertFieldsHashCorrect( Model, SubClassModel );
				
				// As a sanity check for the assertFieldsHashCorrect test code, assert that at least the fields defined by subclasses are there 
				// (not asserting anything against the base Kevlar.Model's fields array, as they are subject to change).
				var instanceFields = (new SubClassModel()).fields;
				Y.ObjectAssert.hasKey( 'a', instanceFields, "SubClassModel should have the 'a' field defined in its final 'fields' hash." );
				Y.ObjectAssert.hasKey( 'b', instanceFields, "SubClassModel should have the 'b' field defined in its final 'fields' hash." );
			},
			
			
			"Fields should inherit from a Model subclass's superclass, and its superclass as well (i.e. more than one level up)" : function() {
				// Reference the base class, and create two subclasses
				var Model = Kevlar.Model;
				var SubClassModel = Kevlar.extend( Model, {
					addFields : [ 'a', 'b' ]
				} );
				var SubSubClassModel = Kevlar.extend( SubClassModel, {
					addFields : [ 'c', 'd', 'e' ]
				} );
				
				// Run the test code
				this.assertFieldsHashCorrect( Model, SubClassModel, SubSubClassModel );
				
				// As a sanity check for the assertFieldsHashCorrect test code, assert that at least the fields defined by subclasses are there 
				// (not asserting anything against the base Kevlar.Model's fields array, as they are subject to change).
				var instanceFields = (new SubSubClassModel()).fields;
				Y.ObjectAssert.hasKey( 'a', instanceFields, "SubSubClassModel should have the 'a' field defined in its final 'fields' hash." );
				Y.ObjectAssert.hasKey( 'b', instanceFields, "SubSubClassModel should have the 'b' field defined in its final 'fields' hash." );
				Y.ObjectAssert.hasKey( 'c', instanceFields, "SubSubClassModel should have the 'c' field defined in its final 'fields' hash." );
				Y.ObjectAssert.hasKey( 'd', instanceFields, "SubSubClassModel should have the 'd' field defined in its final 'fields' hash." );
				Y.ObjectAssert.hasKey( 'e', instanceFields, "SubSubClassModel should have the 'e' field defined in its final 'fields' hash." );
			},
			
			
			"Fields should inherit from a Model subclass's superclass, and all of its superclasses (i.e. more than two levels up)" : function() {
				// Reference the base class, and create two subclasses
				var Model = Kevlar.Model;
				var SubClassModel = Kevlar.extend( Model, {
					addFields : [ 'a', 'b' ]
				} );
				var SubSubClassModel = Kevlar.extend( SubClassModel, {
					addFields : [ 'c', 'd', 'e' ]
				} );
				var SubSubSubClassModel = Kevlar.extend( SubSubClassModel, {
					addFields : [ 'f' ]
				} );
				
				// Run the test code
				this.assertFieldsHashCorrect( Model, SubClassModel, SubSubClassModel, SubSubSubClassModel );
				
				// As a sanity check for the assertFieldsHashCorrect test code, assert that at least the fields defined by subclasses are there 
				// (not asserting anything against the base Kevlar.Model's fields array, as they are subject to change).
				var instanceFields = (new SubSubSubClassModel()).fields;
				Y.ObjectAssert.hasKey( 'a', instanceFields, "SubSubSubClassModel should have the 'a' field defined in its final 'fields' hash." );
				Y.ObjectAssert.hasKey( 'b', instanceFields, "SubSubSubClassModel should have the 'b' field defined in its final 'fields' hash." );
				Y.ObjectAssert.hasKey( 'c', instanceFields, "SubSubSubClassModel should have the 'c' field defined in its final 'fields' hash." );
				Y.ObjectAssert.hasKey( 'd', instanceFields, "SubSubSubClassModel should have the 'd' field defined in its final 'fields' hash." );
				Y.ObjectAssert.hasKey( 'e', instanceFields, "SubSubSubClassModel should have the 'e' field defined in its final 'fields' hash." );
				Y.ObjectAssert.hasKey( 'f', instanceFields, "SubSubSubClassModel should have the 'f' field defined in its final 'fields' hash." );
			},
			
			
			"Field definitions defined in a subclass should take precedence over field definitions in a superclass" : function() {
				var Model = Kevlar.Model;
				var SubClassModel = Kevlar.extend( Model, {
					addFields : [ { name : 'a', defaultValue: 1 } ]
				} );
				var SubSubClassModel = Kevlar.extend( SubClassModel, {
					addFields : [ { name : 'a', defaultValue: 2 }, 'b' ]
				} );
				
				// Run the test code
				this.assertFieldsHashCorrect( Model, SubClassModel, SubSubClassModel );
				
				// As a sanity check for the assertFieldsHashCorrect test code, assert that at least the fields defined by subclasses are there 
				// (not asserting anything against the base Kevlar.Model's fields array, as they are subject to change).
				var instanceFields = (new SubSubClassModel()).fields;
				Y.ObjectAssert.hasKey( 'a', instanceFields, "SubSubSubClassModel should have the 'a' field defined in its final 'fields' hash." );
				Y.ObjectAssert.hasKey( 'b', instanceFields, "SubSubSubClassModel should have the 'b' field defined in its final 'fields' hash." );
				
				// Check that the default value of the Field 'a' is 2, not 1 (as the Field in the subclass should have overridden its superclass Field)
				Y.Assert.areSame( 2, instanceFields[ 'a' ].defaultValue, "The field in the subclass should have overridden its superclass" ); 
			},
			
			
			"A subclass that doesn't define any fields should inherit all of them from its superclass(es)" : function() {
				// Reference the base class, and create two subclasses
				var Model = Kevlar.Model;
				var SubClassModel = Kevlar.extend( Model, {
					addFields : [ 'a', 'b' ]
				} );
				var SubSubClassModel = Kevlar.extend( SubClassModel, {} );
				
				// Run the test code
				this.assertFieldsHashCorrect( Model, SubClassModel, SubSubClassModel );
				
				// As a sanity check for the assertFieldsHashCorrect test code, assert that at least the fields defined by subclasses are there 
				// (not asserting anything against the base Kevlar.Model's fields array, as they are subject to change).
				var instanceFields = (new SubSubClassModel()).fields;
				Y.ObjectAssert.hasKey( 'a', instanceFields, "SubSubClassModel should have the 'a' field defined in its final 'fields' hash." );
				Y.ObjectAssert.hasKey( 'b', instanceFields, "SubSubClassModel should have the 'b' field defined in its final 'fields' hash." );
			},
			
			
			"A superclass that doesn't define any fields should be skipped for fields, but the subclass should still inherit from superclasses above it" : function() {
				// Reference the base class, and create two subclasses
				var Model = Kevlar.Model;
				var SubClassModel = Kevlar.extend( Model, {} );  // one that doesn't define any fields
				var SubSubClassModel = Kevlar.extend( SubClassModel, {
					addFields : [ 'a', 'b' ]
				} );
				
				// Run the test code
				this.assertFieldsHashCorrect( Model, SubClassModel, SubSubClassModel );
				
				// As a sanity check for the assertFieldsHashCorrect test code, assert that at least the fields defined by subclasses are there 
				// (not asserting anything against the base Kevlar.Model's fields array, as they are subject to change).
				var instanceFields = (new SubSubClassModel()).fields;
				Y.ObjectAssert.hasKey( 'a', instanceFields, "SubSubClassModel should have the 'a' field defined in its final 'fields' hash." );
				Y.ObjectAssert.hasKey( 'b', instanceFields, "SubSubClassModel should have the 'b' field defined in its final 'fields' hash." );
			}
		},
		
		
		
		{
			/*
			 * Test Initialization (the constructor)
			 */
			name: 'Test Initialization (the constructor)',
			ttype : 'testsuite',
			
			
			items : [
				{
					/*
					 * Test lazy instantiating a proxy
					 */
					name : "Test lazy instantiating a proxy",
					
					_should : {
						error : {
							"Attempting to instantiate a proxy with no 'type' attribute should throw an error" :
								"Kevlar.persistence.proxy.create(): No `type` property provided on proxy config object",
								
							"Attempting to instantiate a proxy with an invalid 'type' attribute should throw an error" :
								"Kevlar.persistence.Proxy.create(): Unknown Proxy type: 'nonexistentproxy'"
						}
					},
					
					"Attempting to instantiate a proxy with no 'type' attribute should throw an error" : function() {
						var TestModel = Kevlar.extend( Kevlar.Model, {
							addFields: [ 'field1' ],
							proxy : {}
						} );
						
						var model = new TestModel();
					},
					
					"Attempting to instantiate a proxy with an invalid 'type' attribute should throw an error" : function() {
						var TestModel = Kevlar.extend( Kevlar.Model, {
							addFields: [ 'field1' ],
							proxy : { 
								type : 'nonExistentProxy'
							}
						} );
						
						var model = new TestModel();
					},
					
					"Providing a valid config object should instantiate the Proxy *on class's the prototype*" : function() {
						var TestModel = Kevlar.extend( Kevlar.Model, {
							addFields: [ 'field1' ],
							proxy : { 
								type : 'rest'  // a valid proxy type
							}
						} );
						
						var model = new TestModel();
						Y.Assert.isInstanceOf( Kevlar.persistence.RestProxy, TestModel.prototype.proxy );
					},
					
					"Providing a valid config object should instantiate the Proxy *on the correct subclass's prototype*, shadowing superclasses" : function() {
						var TestModel = Kevlar.extend( Kevlar.Model, {
							addFields: [ 'field1' ],
							proxy : { 
								type : 'nonExistentProxy'  // an invalid proxy type
							}
						} );
						
						var TestSubModel = Kevlar.extend( TestModel, {
							addFields: [ 'field1' ],
							proxy : { 
								type : 'rest'  // a valid proxy type
							}
						} );
						
						var model = new TestSubModel();
						Y.Assert.isInstanceOf( Kevlar.persistence.RestProxy, TestSubModel.prototype.proxy );
					}
				},
				
			
				{
					/*
					 * Test change event upon initialization
					 */
					name : "Test change event upon initialization",
					
					setUp : function() {
						this.TestModel = Kevlar.extend( Kevlar.Model, {
							addFields: [
								{ name: 'field1' },
								{ name: 'field2', defaultValue: "field2's default" },
								{ name: 'field3', defaultValue: function() { return "field3's default"; } },
								{ name: 'field4', set : function( value, model ) { return model.get( 'field1' ) + " " + model.get( 'field2' ); } },
								{ name: 'field5', set : function( value, model ) { return value + " " + model.get( 'field2' ); } }
							]
						} );
					},
					
					
					/* This test is no longer valid, as the constructor currently does not allow for a `listeners` config
					"The Model should not fire its 'change' event during the set of the initial data" : function() {
						var changeEventFired = false;
						var model = new this.TestModel( {
							field1: "field1 value"
						} );
						
						//model.addListener( 'change', function() { changeEventFired = true; } );
						Y.Assert.isFalse( changeEventFired, "The change event should not have fired during the set of the initial data" );
					},
					*/
					
					"The Model should fire its 'change' event when a field's data is set externally" : function() {
						var changeEventFired = false;
						var model = new this.TestModel();
						model.addListener( 'change', function() { changeEventFired = true; } );
						
						// Set the value
						model.set( 'field1', 'value1' );
						Y.Assert.isTrue( changeEventFired, "The change event should have been fired during the set of the new data" );
					}
				},
			
			
				{
					/*
					 * Test that the initial default values are applied
					 */
					name : "Test that the initial default values are applied",
					
					setUp : function() {
						this.TestModel = Kevlar.extend( Kevlar.Model, {
							addFields: [
								{ name: 'field1' },
								{ name: 'field2', defaultValue: "field2's default" },
								{ name: 'field3', defaultValue: function() { return "field3's default"; } },
								{ name: 'field4', set : function( value, model ) { return model.get( 'field1' ) + " " + model.get( 'field2' ); } },
								{ name: 'field5', set : function( value, model ) { return value + " " + model.get( 'field2' ); } }
							]
						} );
					},
			
					// Test that default values are applied to field values
					
					"A field with a defaultValue but no provided data should have its defaultValue when retrieved" : function() {
						var model = new this.TestModel();  // no data provided
						
						Y.Assert.areSame( "field2's default", model.get( 'field2' ) );
					},
					
					"A field with a defaultValue that is a function, but no provided data should have its defaultValue when retrieved" : function() {
						var model = new this.TestModel();  // no data provided
						
						Y.Assert.areSame( "field3's default", model.get( 'field3' ) );  // field3 has a defaultValue that is a function
					},
					
					"A field with a defaultValue and also provided data should have its provided data when retrieved" : function() {
						var model = new this.TestModel( {
							field2 : "field2's data"
						} );
						
						Y.Assert.areSame( "field2's data", model.get( 'field2' ), "The 'default' specified on the Field should *not* have been applied, since it has a value." );
					}
				},
				
				{
					/*
					 * Test initial data
					 */
					name : "Test initial data",
					
					"Providing initial data to the constructor should not leave the model set as 'dirty' (i.e. it should have no 'changes')" : function() {
						var Model = Kevlar.Model.extend( {
							addFields : [ 'field1', 'field2' ]
						} );
						
						var model = new Model( { field1: 'value1', field2: 'value2' } );
						Y.Assert.isFalse( model.isDirty(), "The model should not be dirty upon initialization" );
						Y.Assert.isTrue( Kevlar.util.Object.isEmpty( model.getChanges ), "There should not be any 'changes' upon initialization" );
					}
				},				
				
				
				{
					/*
					 * Test that initialize() is called
					 */
					name : "Test that initialize() is called",
					
					
					"The initialize() method should be called with the constructor function, for subclass initialization" : function() {
						var initializeCalled = false;
						
						var MyModel = Kevlar.Model.extend( {
							addFields : [ 
								'test',
								{ name: 'test2', defaultValue: 'defaultForTest2' }
							],
							initialize : function() {
								initializeCalled = true;
							}
						} );
						
						var model = new MyModel();
						Y.Assert.isTrue( initializeCalled, "The initialize() method should have been called" ); 
					}
				}
			]
		},
		
		
		{
			/*
			 * Test get()
			 */
			name: 'Test get()',
	
	
			setUp : function() {
				this.TestModel = Kevlar.extend( Kevlar.Model, {
					addFields: [
						{ name: 'field1' },
						{ name: 'field2', defaultValue: "field2's default" },
						{ name: 'field3', defaultValue: function() { return "field3's default"; } },
						{ name: 'field4', set : function( value, model ) { return model.get( 'field1' ) + " " + model.get( 'field2' ); } },
						{ name: 'field5', get : function( value, model ) { return model.get( 'field1' ) + " " + model.get( 'field2' ); } }
					]
				} );
			},
			
			
			"running get() on a field with no initial value and no default value should return undefined" : function() {
				var model = new this.TestModel();
				Y.Assert.isUndefined( model.get( 'field1' ) );  // field1 has no default value
			},
			
			"running get() on a field with an initial value and no default value should return the initial value" : function() {
				var model = new this.TestModel( {
					field1 : "initial value"
				} );
				Y.Assert.areSame( "initial value", model.get( 'field1' ) );  // field1 has no default value
			},
			
			"running get() on a field with no initial value but does have a default value should return the default value" : function() {
				var model = new this.TestModel();
				Y.Assert.areSame( "field2's default", model.get( 'field2' ) );  // field2 has a default value
			},
			
			"running get() on a field with an initial value and a default value should return the initial value" : function() {
				var model = new this.TestModel( {
					field2 : "initial value"
				} );
				Y.Assert.areSame( "initial value", model.get( 'field2' ) );  // field2 has a default value
			},
			
			"running get() on a field with no initial value but does have a default value which is a function should return the default value" : function() {
				var model = new this.TestModel();
				Y.Assert.areSame( "field3's default", model.get( 'field3' ) );  // field3 has a defaultValue that is a function
			},
			
			"running get() on a field with a `get` function defined should return the value that the `get` function returns" : function() {
				var model = new this.TestModel( { field1: 'value1' } );
				Y.Assert.areSame( "value1 field2's default", model.get( 'field5' ) );
			}
		},
				
		
		{
			/*
			 * Test set()
			 */
			name: 'Test set()',
	
	
			setUp : function() {
				this.TestModel = Kevlar.extend( Kevlar.Model, {
					addFields: [
						{ name: 'field1' },
						{ name: 'field2', defaultValue: "field2's default" },
						{ name: 'field3', defaultValue: function() { return "field3's default"; } },
						{ name: 'field4', set : function( value, model ) { return model.get( 'field1' ) + " " + model.get( 'field2' ); } },
						{ name: 'field5', set : function( value, model ) { return value + " " + model.get( 'field2' ); } }
					]
				} );
			},
				
			
			/*
			 * Utility method to set the given field to all data types, including falsy values, and asserts that the operation was successful
			 * (i.e. the field returns the same exact value it was set to).
			 * 
			 * @method assertFieldAcceptsAll
			 * @param {Kevlar.Model} model
			 * @param {String} fieldName
			 */
			assertFieldAcceptsAll : function( model, fieldName ) {
				model.set( fieldName, undefined );
				Y.Assert.isUndefined( model.get( fieldName ), fieldName + "'s value should have the value set by set() (undefined)." );
				
				model.set( fieldName, null );
				Y.Assert.isNull( model.get( fieldName ), fieldName + "'s value should have the value set by set() (null)." );
				
				model.set( fieldName, true );
				Y.Assert.isTrue( model.get( fieldName ), fieldName + "'s value should have the value set by set() (true)." );
				
				model.set( fieldName, false );
				Y.Assert.isFalse( model.get( fieldName ), fieldName + "'s value should have the value set by set() (false)." );
				
				model.set( fieldName, 0 );
				Y.Assert.areSame( 0, model.get( fieldName ), fieldName + "'s value should have the value set by set() (0)." );
				
				model.set( fieldName, 1 );
				Y.Assert.areSame( 1, model.get( fieldName ), fieldName + "'s value should have the value set by set() (1)." );
				
				model.set( fieldName, "" );
				Y.Assert.areSame( "", model.get( fieldName ), fieldName + "'s value should have the value set by set() ('')." );
				
				model.set( fieldName, "Hello" );
				Y.Assert.areSame( "Hello", model.get( fieldName ), fieldName + "'s value should have the value set by set() ('Hello')." );
				
				model.set( fieldName, {} );
				Y.Assert.isObject( model.get( fieldName ), fieldName + "'s value should have the value set by set() (object)." );
				
				model.set( fieldName, [] );
				Y.Assert.isArray( model.get( fieldName ), fieldName + "'s value should have the value set by set() (array)." );
			},
			
			
			"set() should accept all datatypes including falsy values" : function() {
				var model = new this.TestModel();
				
				this.assertFieldAcceptsAll( model, 'field1' );
			},
			
			"set() should accept all datatypes, and still work even with a default value" : function() {
				// Test with regular values, given a default value
				var model = new this.TestModel();
				
				this.assertFieldAcceptsAll( model, 'field2' );  // field2 has a default value
			},
			
			"set() should accept all datatypes, and still work even with a given value" : function() {
				// Test with regular values, given a default value
				var model = new this.TestModel( {
					field2 : "initial value"
				} );
				
				this.assertFieldAcceptsAll( model, 'field2' );  // field2 has a given value in this test ("initial value")
			},
			
			
			// ------------------------
			
			
			"After the successful set() of a field, the Model should be considered 'dirty'" : function() {
				var TestModel = Kevlar.Model.extend( {
					addFields: [ 'field1' ]
				} );
				var model = new TestModel();
				
				Y.Assert.isFalse( model.isDirty(), "Initially, the model should not be considered 'dirty'" );
				
				model.set( 'field1', 'value1' );
				Y.Assert.isTrue( model.isDirty(), "After a set, the model should now be considered 'dirty'" );
			},
			
			
			"After a set() of a field to the same value from a clean state, the Model should NOT be considered 'dirty' (as the value didn't change)" : function() {
				var TestModel = Kevlar.Model.extend( {
					addFields: [ 'field1' ]
				} );
				var model = new TestModel( { field1: 'value1' } );  // initial data, model not considered dirty
				
				Y.Assert.isFalse( model.isDirty(), "Initially, the model should not be considered 'dirty'" );
				
				// Set to the same value
				model.set( 'field1', 'value1' );
				Y.Assert.isFalse( model.isDirty(), "After a set to the *same value*, the model should not be considered 'dirty' (as the value didn't change)" );
			},
			
			
			// ------------------------
			
			
			"set() should not re-set a field to the same value from the initial value provided to the constructor" : function() {
				var changeCount = 0;
				
				var TestModel = Kevlar.Model.extend( {
					addFields: [ 'field1' ]
				} );
				
				var model = new TestModel( { field1: 'value1' } );
				model.addListener( 'change:field1', function() { changeCount++; } );
				
				// Set to the same value
				model.set( 'field1', 'value1' );
				Y.Assert.areSame( 0, changeCount, "The field should not have been registered as 'changed' when providing the same value" );
			},
			
			
			"set() should not re-set a field to the same value" : function() {
				var changeCount = 0;
				
				var TestModel = Kevlar.Model.extend( {
					addFields: [ 'field1' ]
				} );
				
				var model = new TestModel();
				model.addListener( 'change:field1', function() { changeCount++; } );
				
				// Set for the first time
				model.set( 'field1', 'value1' );
				Y.Assert.areSame( 1, changeCount, "Initially, the field should have been changed exactly once." );
				
				// Set the second time to the same value
				model.set( 'field1', 'value1' );
				Y.Assert.areSame( 1, changeCount, "The field should not have been registered as 'changed' the second time. Should still only have '1 change'." );
			},
			
			
			// ------------------------------
			
			
			// Test set() with Field-specific set() functions			
			
			"set() should run the Field's set() method on a field that has initial data of its own" : function() {
				var TestModel = Kevlar.extend( Kevlar.Model, {
					addFields: [
						{ name: 'field1' },
						{ name: 'field2', set : function( value, model ) { return value + " " + model.get( 'field1' ); } }
					]
				} );
				var model = new TestModel( {
					field1 : "field1val",
					field2 : "field2val"
				} );
				
				Y.Assert.areSame( "field2val field1val", model.get( 'field2' ), "field2 should be the concatenation of its own value, a space, and field1" );
			},
			
			
			"set() should convert a field with a 'set' function when it is set() again" : function() {
				var TestModel = Kevlar.extend( Kevlar.Model, {
					addFields: [
						{ name: 'field1' },
						{ name: 'field2', set : function( value, model ) { return value + " " + model.get( 'field1' ); } }
					]
				} );
				var model = new TestModel( {
					field1 : "field1val",
					field2 : "field2val"
				} );
				
				// This call should cause field2's set() function to run
				model.set( 'field2', "newfield2value" );
				
				Y.Assert.areSame( "newfield2value field1val", model.get( 'field2' ), "field2 should be the concatenation of its own value, a space, and field2" );
			},
			
			
			// ------------------------
			
			// Test the 'change' event
			
			"When a field is set, a generalized 'change' event should be fired" : function() {
				var TestModel = Kevlar.extend( Kevlar.Model, {
					addFields: [ 'field1', 'field2' ]
				} );
				var model = new TestModel(),
				    changeEventFired = false,
				    fieldNameChanged = "",
				    newValue = "";
				    
				model.addListener( 'change', function( model, fieldName, value ) {
					changeEventFired = true;
					fieldNameChanged = fieldName;
					newValue = value;
				} );
				
				model.set( 'field2', "brandNewValue" );
				Y.Assert.isTrue( changeEventFired, "The 'change' event was not fired" );
				Y.Assert.areSame( "field2", fieldNameChanged, "The fieldName that was changed was not provided to the event correctly." );
				Y.Assert.areSame( "brandNewValue", newValue, "The value for field2 that was changed was not provided to the event correctly." );
			},
			
			
			"When a field is set, a 'change:xxx' event should be fired for the changed field" : function() {
				var TestModel = Kevlar.extend( Kevlar.Model, {
					addFields: [ 'field1', 'field2' ]
				} );
				var model = new TestModel(),
				    changeEventFired = false,
				    newValue = "";
				    
				model.addListener( 'change:field2', function( model, value ) {
					changeEventFired = true;
					newValue = value;
				} );
				
				model.set( 'field2', "brandNewValue" );
				Y.Assert.isTrue( changeEventFired, "The 'change:field2' event was not fired" );
				Y.Assert.areSame( "brandNewValue", newValue, "The value for field2 that was changed was not provided to the event correctly." );
			},
			
			
			"When a field with a `set()` function of its own is set, the 'change' events should be fired" : function() {
				var TestModel = Kevlar.extend( Kevlar.Model, {
					addFields: [ 
						{ 
							// Field with a set() function that returns a new value
							name : 'field1',
							set : function( value ) { 
								return value;
							}
						},
						{ 
							// Field with a set() function that does not return a new value (presumably modifying some other Field in the model),
							// and therefore does not have a new value set to the underlying data
							name : 'field2', 
							set : function( value, model ) {
								// Presumably updating some other Field in the model
							}
						} 
					]
				} );
				
				var model = new TestModel(),
				    field1ChangeEventCount = 0,
				    field1ChangeEventValue,
				    field2ChangeEventCount = 0,
				    field2ChangeEventValue;
				    
				model.addListener( 'change:field1', function( model, value ) {
					field1ChangeEventCount++;
					field1ChangeEventValue = value;
				} );
				model.addListener( 'change:field2', function( model, value ) {
					field2ChangeEventCount++;
					field2ChangeEventValue = value;
				} );
				
				
				// Test changing the field with a set() function that returns a new value
				model.set( 'field1', 'field1value1' );
				Y.Assert.areSame( 1, field1ChangeEventCount, "The field1 change event count should now be 1, with the initial value" );
				Y.Assert.areSame( 0, field2ChangeEventCount, "The field2 change event count should still be 0, as no set has been performed on it yet" );
				Y.Assert.areSame( 'field1value1', field1ChangeEventValue, "The field1 change event value was not correct" );
				
				model.set( 'field1', 'field1value2' );
				Y.Assert.areSame( 2, field1ChangeEventCount, "The field1 change event count should now be 2, with a new value" );
				Y.Assert.areSame( 0, field2ChangeEventCount, "The field2 change event count should still be 0, as no set has been performed on it yet" );
				Y.Assert.areSame( 'field1value2', field1ChangeEventValue, "The field1 change event value was not correct" );
				
				model.set( 'field1', 'field1value2' );  // setting to the SAME value, to make sure a new 'change' event has not been fired
				Y.Assert.areSame( 2, field1ChangeEventCount, "The field1 change event count should still be 2, being set to the same value" );
				Y.Assert.areSame( 0, field2ChangeEventCount, "The field2 change event count should still be 0, as no set has been performed on it yet" );
				
				
				// Test changing the field with a set() function that does *not* return a new value (which makes the model not store
				// any new value on its underlying data hash)
				model.set( 'field2', 'field2value1' );
				Y.Assert.areSame( 2, field1ChangeEventCount, "The field1 change event count should still be 2, as no new set has been performed on it" );
				Y.Assert.areSame( 1, field2ChangeEventCount, "The field2 change event count should now be 1, since a set has been performed on it" );
				Y.Assert.isUndefined( field2ChangeEventValue, "The field2 change event value should have been undefined, as its set() function does not return anything" );
				
				model.set( 'field2', 'field2value2' );
				Y.Assert.areSame( 2, field1ChangeEventCount, "The field1 change event count should still be 2, as no new set has been performed on it (2nd time)" );
				Y.Assert.areSame( 2, field2ChangeEventCount, "The field2 change event count should now be 2, since a set has been performed on it" );
				Y.Assert.isUndefined( field2ChangeEventValue, "The field2 change event value should still be undefined, as its set() function does not return anything" );				
			},
			
			
			"When a field with only a `get()` function is set, the 'change' events should be fired with the value from the get function, not the raw value" : function() {
				var TestModel = Kevlar.extend( Kevlar.Model, {
					addFields: [
						{
							name : 'myField',
							get : function( value, model ) { return value + 10; } // add 10, to make sure we're using the getter
						}
					]
				} );
				
				var model = new TestModel(),
				    changeEventValue,
				    fieldSpecificChangeEventValue;
				
				model.on( {
					'change' : function( model, fieldName, newValue ) {
						changeEventValue = newValue;
					},
					'change:myField' : function( model, newValue ) {
						fieldSpecificChangeEventValue = newValue;
					}
				} );
				
				model.set( 'myField', 42 );  // the `get()` function on the Field will add 10 to this value when the field is retrieved
				
				Y.Assert.areSame( 52, changeEventValue, "The value provided with the change event should have come from myField's `get()` function" );
				Y.Assert.areSame( 52, fieldSpecificChangeEventValue, "The value provided with the field-specific change event should have come from myField's `get()` function" );
			},
			
			
			"When a field with both a `set()` function, and `get()` function of its own is set, the 'change' events should be fired with the value from the `get()` function, not the raw value" : function() {
				var TestModel = Kevlar.extend( Kevlar.Model, {
					addFields: [ 
						'baseField',
						{
							// Computed Field with both a set() function and a get() function, which simply uses 'baseField' for its value
							// (which in practice, would probably be composed of two or more fields, and possible does calculations as well)
							name : 'computedField',
							set : function( value, model ) { model.set( 'baseField', value ); },
							get : function( value, model ) { return model.get( 'baseField' ) + 10; }   // add 10, to make sure we're using the getter
						}
					]
				} );
				
				var model = new TestModel(),
				    changeEventValue,
				    fieldSpecificChangeEventValue;
				
				model.on( {
					'change' : function( model, fieldName, newValue ) {
						changeEventValue = newValue;
					},
					'change:computedField' : function( model, newValue ) {
						fieldSpecificChangeEventValue = newValue;
					}
				} );
				
				model.set( 'computedField', 42 );  // the `get()` function will add 10 to this value when the field is retrieved
								
				Y.Assert.areSame( 52, changeEventValue, "The value provided with the change event should have come from the computedField's `get()` function" );
				Y.Assert.areSame( 52, fieldSpecificChangeEventValue, "The value provided with the field-specific change event should have come from the computedField's `get()` function" );
			},
			
			
			
			// ------------------------
			
			
			"for compatibility with Backbone's Collection, set() should set the id property to the Model object itself with the idField is changed" : function() {
				var TestModel = Kevlar.Model.extend( {
					addFields: [
						{ name: 'field1' },
						{ name: 'field2', set : function( value, model ) { return value + " " + model.get( 'field1' ); } }
					],
					idField: 'field1'
				} );
				
				var model = new TestModel( {
					field1 : "field1val",
					field2 : "field2val"
				} );
				
				Y.Assert.areSame( 'field1val', model.id, "The model's `id` property should have been set to field1's value, as that is the idField." );
				
				model.set( 'field1', 'newValue' );
				Y.Assert.areSame( 'newValue', model.id, "The model's `id` property should have been set to field1's value after another set(), as that is the idField." );
			}
		},
		
		
		{
			/*
			 * Test getDefault()
			 */
			name: 'Test getDefault()',
	
	
			setUp : function() {
				this.TestModel = Kevlar.extend( Kevlar.Model, {
					addFields: [
						{ name: 'field1' },
						{ name: 'field2', defaultValue: "field2's default" },
						{ name: 'field3', defaultValue: function() { return "field3's default"; } },
						{ name: 'field4', set : function( value, model ) { return model.get( 'field1' ) + " " + model.get( 'field2' ); } },
						{ name: 'field5', set : function( value, model ) { return value + " " + model.get( 'field2' ); } }
					]
				} );
			},
			
			
			// Test that the default values of fields can be retrieved
			
			"A field with no defaultValue should return undefined when trying to retrieve its default value" : function() {
				var model = new this.TestModel();
				Y.Assert.isUndefined( model.getDefault( 'field1' ) );  // field1 has no default value
			},
			
			"A defaultValue should be able to be retrieved directly when the field has one" : function() {
				var model = new this.TestModel();
				Y.Assert.areSame( "field2's default", model.getDefault( 'field2' ) );  // field2 has a defaultValue of a string
			},
			
			"A defaultValue should be able to be retrieved directly when the defaultValue is a function that returns its default" : function() {
				var model = new this.TestModel();
				Y.Assert.areSame( "field3's default", model.getDefault( 'field3' ) );  // field2 has a defaultValue that is a function that returns a string
			}
		},	
			
		
		
		{
			/*
			 * Test isDirty()
			 */
			name: 'Test isDirty()',
	
	
			setUp : function() {
				this.TestModel = Kevlar.extend( Kevlar.Model, {
					addFields: [
						{ name: 'field1' },
						{ name: 'field2', defaultValue: "field2's default" },
						{ name: 'field3', defaultValue: function() { return "field3's default"; } },
						{ name: 'field4', set : function( value, model ) { return model.get( 'field1' ) + " " + model.get( 'field2' ); } },
						{ name: 'field5', set : function( value, model ) { return value + " " + model.get( 'field2' ); } }
					]
				} );
			},
			
			
			
			"isDirty() should return false after instantiating a Model with no data" : function() {
				var model = new this.TestModel();
				Y.Assert.isFalse( model.isDirty() );
			},
			
			"isDirty() should return false after instantiating a Model with initial data" : function() {
				var model = new this.TestModel( { field1: 1, field2: 2 } );
				Y.Assert.isFalse( model.isDirty() );
			},
			
			"isDirty() should return true after setting a field's data" : function() {
				var model = new this.TestModel();
				model.set( 'field1', 1 );
				Y.Assert.isTrue( model.isDirty() );
			},
			
			"isDirty() should return false after setting a field's data, and then rolling back the data" : function() {
				var model = new this.TestModel();
				model.set( 'field1', 1 );
				model.rollback();
				Y.Assert.isFalse( model.isDirty() );
			},
			
			"isDirty() should return false after setting a field's data, and then committing the data" : function() {
				var model = new this.TestModel();
				model.set( 'field1', 1 );
				model.commit();
				Y.Assert.isFalse( model.isDirty() );
			}
		},
		
		
		
		{
			/*
			 * Test isModified()
			 */
			name: 'Test isModified()',
	
	
			setUp : function() {
				this.TestModel = Kevlar.extend( Kevlar.Model, {
					addFields: [
						{ name: 'field1' },
						{ name: 'field2', defaultValue: "field2's default" },
						{ name: 'field3', defaultValue: function() { return "field3's default"; } },
						{ name: 'field4', set : function( value, model ) { return model.get( 'field1' ) + " " + model.get( 'field2' ); } },
						{ name: 'field5', set : function( value, model ) { return value + " " + model.get( 'field2' ); } }
					]
				} );
			},
			
			
			"isModified() should return false for fields that have not been changed" : function() {
				var model = new this.TestModel();
				Y.Assert.isFalse( model.isModified( 'field1' ), "field1, with no defaultValue, should not be modified" );
				Y.Assert.isFalse( model.isModified( 'field2' ), "field2, with a defaultValue, should not be modified" );
			},
			
			
			"isModified() should return true for fields that have been changed" : function() {
				var model = new this.TestModel();
				
				model.set( 'field1', "new value 1" );
				model.set( 'field2', "new value 2" );
				Y.Assert.isTrue( model.isModified( 'field1' ), "field1 should be marked as modified" );
				Y.Assert.isTrue( model.isModified( 'field2' ), "field2 should be marked as modified" );
			},
			
			
			"isModified() should return false for fields that have been changed, but then committed" : function() {
				var model = new this.TestModel();
				
				model.set( 'field1', "new value 1" );
				model.set( 'field2', "new value 2" );
				model.commit();
				Y.Assert.isFalse( model.isModified( 'field1' ), "field1 should have been committed, and therefore not marked as modified" );
				Y.Assert.isFalse( model.isModified( 'field2' ), "field2 should have been committed, and therefore not marked as modified" );
			},
			
			
			"isModified() should return false for fields that have been changed, but then rolled back" : function() {
				var model = new this.TestModel();
				
				model.set( 'field1', "new value 1" );
				model.set( 'field2', "new value 2" );
				model.rollback();
				Y.Assert.isFalse( model.isModified( 'field1' ), "field1 should have been rolled back, and therefore not marked as modified" );
				Y.Assert.isFalse( model.isModified( 'field2' ), "field2 should have been rolled back, and therefore not marked as modified" );
			}
		},
		
		
		{
			/*
			 * Test getData()
			 */
			name: 'Test getData()',
	
	
			setUp : function() {
				this.TestModel = Kevlar.extend( Kevlar.Model, {
					addFields: [
						{ name: 'field1' },
						{ name: 'field2', defaultValue: "field2's default" },
						{ name: 'field3', defaultValue: function() { return "field3's default"; } },
						{ name: 'field4', set : function( value, model ) { return model.get( 'field1' ) + " " + model.get( 'field2' ); } },
						{ name: 'field5', get : function( value, model ) { return "field5 " + model.get( 'field2' ); } }
					]
				} );
			},
			
			
			"getData() should return a deep copy of the data, so that the returned object may be modified without messing up the Model" : function() {
				var testModel = new this.TestModel( {
					field1: "field1data",
					field2: { nested: "nestedfield2data" }
				} );
				
				// Retrieve all the data, and modify a field
				var allData = testModel.getData();
				allData.field1 = "newfield1data";
				allData.field2.nested = "newnestedfield2data";
				
				// Make sure that the original field data in the Model was not modified
				Y.Assert.areSame( "field1data", testModel.get( 'field1' ), "field1 in the testModel should not have been modified. getData() not returning a copy of the data?" );
				Y.Assert.areSame( "nestedfield2data", testModel.get( 'field2' ).nested, "field2 in the testModel should not have been modified. getData() not returning a copy of the data?" );
			},
			
			
			"getData() should return a key for each of the Fields in the Model, whether or not any data has been set to them" : function() {
				var Model = Kevlar.Model.extend( {
					addFields : [ 'field1', 'field2' ]
				} );
				var model = new Model( { field1: 'value1' } );
				
				var data = model.getData();
				Y.ObjectAssert.hasKey( 'field1', data, "The data returned should have field1" );
				Y.Assert.areSame( 'value1', data.field1, "field1 should be 'value1'" );
				Y.ObjectAssert.hasKey( 'field2', data, "The data returned should have field2, even though no value has been set to it" );
				Y.Assert.isUndefined( data.field2, "field2 should be undefined in the returned data" );
			},
			
			
			"getData() should return the data by running fields' `get` functions (not just returning the raw data)" : function() {
				var Model = Kevlar.Model.extend( {
					addFields : [ 
						'field1', 
						{ name: 'field2', get: function( value, model ) { return "42 " + model.get( 'field1' ); } }
					]
				} );
				var model = new Model( { field1: 'value1', field2: 'value2' } );
				
				var data = model.getData();
				Y.Assert.areSame( 'value1', data.field1, "field1 should be 'value1'" );
				Y.Assert.areSame( '42 value1', data.field2, "field2 should have had its `get` function run, and that used as the value in the data" );
			},
			
			
			// -------------------------------
			
			// Test with `persistedOnly` option set to true
			
			"getData() should only retrieve the data for the persisted fields (i.e. fields with persist: true) with the `persistedOnly` option set to true" : function() {
				var Model = Kevlar.Model.extend( {
					addFields : [
						{ name : 'field1', persist: true },
						{ name : 'field2', persist: false },
						{ name : 'field3', persist: true },
						{ name : 'field4', persist: false }
					]
				} );
				
				var model = new Model();
				
				var persistedData = model.getData( { persistedOnly: true } );
				Y.Assert.areSame( 2, Kevlar.util.Object.length( persistedData ), "The persisted data should only have 2 properties" );
				Y.ObjectAssert.ownsKeys( [ 'field1', 'field3' ], persistedData, "The persisted data should have 'field1' and 'field3'" );
			}
		},
		
		
		{
			/*
			 * Test getChanges()
			 */
			name: 'Test getChanges()',
	
	
			setUp : function() {
				this.TestModel = Kevlar.extend( Kevlar.Model, {
					addFields: [
						{ name: 'field1' },
						{ name: 'field2', defaultValue: "field2's default" },
						{ name: 'field3', defaultValue: function() { return "field3's default"; } },
						{ name: 'field4', set : function( value, model ) { return model.get( 'field1' ) + " " + model.get( 'field2' ); } },
						{ name: 'field5', set : function( value, model ) { return value + " " + model.get( 'field2' ); } }
					]
				} );
			},
			
			
			"getChanges() should return a single field that has had its value changed" : function() {
				var model = new this.TestModel();
				model.set( 'field1', "new value" );
				
				var changes = model.getChanges();
				Y.Assert.areSame( 1, Kevlar.util.Object.length( changes ), "The changes hash retrieved should have exactly 1 property" );
				Y.Assert.areSame( "new value", changes.field1, "The change to field1 should have been 'new value'." );
			},
			
			"getChanges() should return multiple fields that have had their values changed" : function() {
				var model = new this.TestModel();
				model.set( 'field1', "new value 1" );
				model.set( 'field2', "new value 2" );
				
				var changes = model.getChanges();
				Y.Assert.areSame( 2, Kevlar.util.Object.length( changes ), "The changes hash retrieved should have exactly 2 properties" );
				Y.Assert.areSame( "new value 1", changes.field1, "The change to field1 should have been 'new value 1'." );
				Y.Assert.areSame( "new value 2", changes.field2, "The change to field2 should have been 'new value 2'." );
			},
			
			
			"getChanges() should return the data by running fields' `get` functions (not just returning the raw data)" : function() {
				var Model = Kevlar.Model.extend( {
					addFields : [ 
						'field1', 
						{ name: 'field2', get: function( value, model ) { return "42 " + model.get( 'field1' ); } }
					]
				} );
				var model = new Model();
				model.set( 'field1', 'value1' );
				model.set( 'field2', 'value2' ); 
				
				var data = model.getData();
				Y.Assert.areSame( 'value1', data.field1, "field1 should be 'value1'" );
				Y.Assert.areSame( '42 value1', data.field2, "field2 should have had its `get` function run, and that used as the value in the data" );
			},
			
			
			// -------------------------------
			
			// Test with `persistedOnly` option set to true
			
			"getChanges() should only retrieve the data for the persisted fields (i.e. fields with persist: true) that have been changed when the `persistedOnly` option is set to true" : function() {
				var Model = Kevlar.Model.extend( {
					addFields : [
						{ name : 'field1', persist: true },
						{ name : 'field2', persist: false },
						{ name : 'field3', persist: true },
						{ name : 'field4', persist: false }
					]
				} );
				
				var model = new Model();
				model.set( 'field1', 'value1' );
				model.set( 'field2', 'value2' );
				
				var persistedChanges = model.getChanges( { persistedOnly: true } );
				Y.Assert.areSame( 1, Kevlar.util.Object.length( persistedChanges ), "The persisted changes should only have 1 property" );
				Y.ObjectAssert.ownsKeys( [ 'field1' ], persistedChanges, "The persisted changes should only have 'field1'" );
			}
		},
		
		
		{
			/*
			 * Test commit()
			 */
			name: 'Test commit()',
	
	
			setUp : function() {
				this.TestModel = Kevlar.extend( Kevlar.Model, {
					addFields: [
						{ name: 'field1' },
						{ name: 'field2', defaultValue: "field2's default" },
						{ name: 'field3', defaultValue: function() { return "field3's default"; } },
						{ name: 'field4', set : function( value, model ) { return model.get( 'field1' ) + " " + model.get( 'field2' ); } },
						{ name: 'field5', set : function( value, model ) { return value + " " + model.get( 'field2' ); } }
					]
				} );
			},
				
			
			"committing changed data should cause the 'dirty' flag to be reset to false, and getChanges() to return an empty object" : function() {
				var model = new this.TestModel();
				model.set( 'field1', "new value 1" );
				model.set( 'field2', "new value 2" );
				model.commit();
				
				var changes = model.getChanges();
				Y.Assert.areSame( 0, Kevlar.util.Object.length( changes ), "The changes hash retrieved should have exactly 0 properties" );
				
				Y.Assert.isFalse( model.isDirty(), "The model should no longer be marked as 'dirty'" );
			},
			
			
			"committing changed data should cause rollback() to have no effect" : function() {
				var model = new this.TestModel();
				model.set( 'field1', "new value 1" );
				model.set( 'field2', "new value 2" );
				model.commit();
				
				// Attempt a rollback, even though the data was committed. Should have no effect.
				model.rollback();
				Y.Assert.areSame( "new value 1", model.get( 'field1' ), "field1 should have been 'new value 1'. rollback() should not have had any effect." );
				Y.Assert.areSame( "new value 2", model.get( 'field2' ), "field2 should have been 'new value 2'. rollback() should not have had any effect." );
			}
		},
			
			
		
		{
			/*
			 * Test rollback()
			 */
			name: 'Test rollback()',
	
	
			setUp : function() {
				this.TestModel = Kevlar.extend( Kevlar.Model, {
					addFields: [
						{ name: 'field1' },
						{ name: 'field2', defaultValue: "field2's default" },
						{ name: 'field3', defaultValue: function() { return "field3's default"; } },
						{ name: 'field4', set : function( value, model ) { return model.get( 'field1' ) + " " + model.get( 'field2' ); } },
						{ name: 'field5', set : function( value, model ) { return value + " " + model.get( 'field2' ); } }
					]
				} );
			},
				
				
			"rollback() should revert the model's values back to default values if before any committed set() calls" : function() {
				// No initial data. 
				// field1 should be undefined
				// field2 should have the string "field2's default"
				var model = new this.TestModel();
				
				// Set, and then rollback
				model.set( 'field1', "new value 1" );
				model.set( 'field2', "new value 2" );
				Y.Assert.isTrue( model.isDirty(), "The 'dirty' flag should be true." );
				model.rollback();
				
				// Check that they have the original values
				Y.Assert.isUndefined( model.get( 'field1' ) );
				Y.Assert.areSame( "field2's default", model.get( 'field2' ) );
				
				// Check that isDirty() returns false
				Y.Assert.isFalse( model.isDirty(), "The 'dirty' flag should be false after rollback." );
			},
			
			
			"rollback() should revert the model's values back to their pre-set() values" : function() {
				var model = new this.TestModel( {
					field1 : "original field1",
					field2 : "original field2"
				} );
				
				// Set, check the 'dirty' flag, and then rollback
				model.set( 'field1', "new value 1" );
				model.set( 'field2', "new value 2" );
				Y.Assert.isTrue( model.isDirty(), "The 'dirty' flag should be true." );
				model.rollback();
				
				// Check that they have the original values
				Y.Assert.areSame( "original field1", model.get( 'field1' ) );
				Y.Assert.areSame( "original field2", model.get( 'field2' ) );
				
				// Check that isDirty() returns false
				Y.Assert.isFalse( model.isDirty(), "The 'dirty' flag should be false after rollback." );
			},
			
			
			"rollback() should revert the model's values back to their pre-set() values, when more than one set() call is made" : function() {
				var model = new this.TestModel( {
					field1 : "original field1",
					field2 : "original field2"
				} );
				
				// Set twice, and then rollback
				model.set( 'field1', "new value 1" );
				model.set( 'field2', "new value 2" );
				model.set( 'field1', "new value 1 - even newer" );
				model.set( 'field2', "new value 2 - even newer" );
				Y.Assert.isTrue( model.isDirty(), "The 'dirty' flag should be true." );
				model.rollback();
				
				// Check that they have the original values after rollback (that the 2nd set of set() calls didn't overwrite the original values) 
				Y.Assert.areSame( "original field1", model.get( 'field1' ) );
				Y.Assert.areSame( "original field2", model.get( 'field2' ) );
				
				// Check that isDirty() returns false
				Y.Assert.isFalse( model.isDirty(), "The 'dirty' flag should be false after rollback." );
			}
			
		},
		
		
		
		{
			/*
			 * Test load()
			 */
			name: 'Test load()',
			
			setUp : function() {
				this.TestModel = Kevlar.extend( Kevlar.Model, {
					addFields: [
						{ name: 'field1' },
						{ name: 'field2', defaultValue: "field2's default" },
						{ name: 'field3', defaultValue: function() { return "field3's default"; } },
						{ name: 'field4', set : function( value, model ) { return model.get( 'field1' ) + " " + model.get( 'field2' ); } },
						{ name: 'field5', set : function( value, model ) { return value + " " + model.get( 'field2' ); } }
					]
				} );
			},
		
			
			// Special instructions
			_should : {
				error : {
					"load() should throw an error if there is no configured proxy" : "Kevlar.Model::load() error: Cannot load. No proxy."
				}
			},
			
			
			"load() should throw an error if there is no configured proxy" : function() {
				var model = new this.TestModel( {
					// note: no configured proxy
				} );
				model.load();
				Y.Assert.fail( "load() should have thrown an error with no configured proxy" );
			},
			
			
			"load() should delegate to its proxy's read() method to retrieve the data" : function() {
				var readCallCount = 0;
				var MockProxy = Kevlar.persistence.Proxy.extend( {
					read : function( model, options ) {
						readCallCount++;
					}
				} );
				
				var MyModel = this.TestModel.extend( {
					proxy : new MockProxy()
				} );
				
				var model = new MyModel();
				
				// Run the load() method to delegate 
				model.load();
				
				Y.Assert.areSame( 1, readCallCount, "The proxy's read() method should have been called exactly once" );
			}
		},
		
		
		{
			/*
			 * Test save()
			 */
			name: 'Test save()',
			ttype: 'testsuite',
			
			items : [
				{
					name : "General save() tests",
					
					// Special instructions
					_should : {
						error : {
							"save() should throw an error if there is no configured proxy" : "Kevlar.Model::save() error: Cannot save. No proxy."
						}
					},
					
					
					"save() should throw an error if there is no configured proxy" : function() {
						var Model = Kevlar.Model.extend( {
							// note: no proxy
						} );
						var model = new Model();
						model.save();
						Y.Assert.fail( "save() should have thrown an error with no configured proxy" );
					},
					
					
					"save() should delegate to its proxy's create() method to persist changes when the Model does not have an id set" : function() {
						var mockProxy = JsMockito.mock( Kevlar.persistence.Proxy );
						
						var Model = Kevlar.Model.extend( {
							addFields : [ 'id' ],
							idField : 'id',
							
							proxy : mockProxy
						} );
						
						var model = new Model();  // note: no 'id' set
						
						// Run the save() method to delegate 
						model.save();
						
						try {
							JsMockito.verify( mockProxy ).create();
						} catch( message ) {
							Y.Assert.fail( "The proxy's update() method should have been called exactly once. " + message );
						}
					},
					
					
					"save() should delegate to its proxy's update() method to persist changes, when the Model has an id" : function() {
						var mockProxy = JsMockito.mock( Kevlar.persistence.Proxy );
						
						var Model = Kevlar.Model.extend( {
							addFields : [ 'id' ],
							idField : 'id',
							
							proxy : mockProxy
						} );
						
						var model = new Model( { id: 1 } );
						
						// Run the save() method to delegate 
						model.save();
						
						try {
							JsMockito.verify( mockProxy, JsMockito.Verifiers.once() ).update();
						} catch( message ) {
							Y.Assert.fail( "The proxy's update() method should have been called exactly once. " + message );
						}
					}
				},
					
				
				{
					name : "save() callbacks tests",
					
					setUp : function() {
						this.mockProxy = JsMockito.mock( Kevlar.persistence.Proxy );
						
						// Note: setting both create() and update() methods here
						this.mockProxy.create = this.mockProxy.update = function( model, options ) {
							if( options.success ) { options.success.call( options.scope || window ); }
							if( options.error ) { options.error.call( options.scope || window ); }
							if( options.complete ) { options.complete( options.scope || window ); }
						};
						
						this.Model = Kevlar.Model.extend( {
							addFields : [ 'id', 'field1' ],
							proxy  : this.mockProxy
						} );
					},
					
					
					"save should call its 'success' and 'complete' callbacks if the proxy successfully creates" : function() {
						var successCallCount = 0,
						    completeCallCount = 0;
						    
						var model = new this.Model();
						model.save( {
							success  : function() { successCallCount++; },
							complete : function() { completeCallCount++; },
							scope    : this
						} );
						
						Y.Assert.areSame( 1, successCallCount, "The 'success' function should have been called exactly once" );
						Y.Assert.areSame( 1, completeCallCount, "The 'complete' function should have been called exactly once" );
					},
					
					
					"save should call its 'error' and 'complete' callbacks if the proxy encounters an error while creating" : function() {
						var errorCallCount = 0,
						    completeCallCount = 0;
						
						var model = new this.Model();
						model.save( {
							error    : function() { errorCallCount++; },
							complete : function() { completeCallCount++; },
							scope    : this
						} );
						
						Y.Assert.areSame( 1, errorCallCount, "The 'error' function should have been called exactly once" );
						Y.Assert.areSame( 1, completeCallCount, "The 'complete' function should have been called exactly once" );
					},
					
					
					"save should call its 'success' and 'complete' callbacks if the proxy successfully updates" : function() {
						var successCallCount = 0,
						    completeCallCount = 0;
						    
						var model = new this.Model( { id: 1 } );
						model.save( {
							success  : function() { successCallCount++; },
							complete : function() { completeCallCount++; },
							scope    : this
						} );
						
						Y.Assert.areSame( 1, successCallCount, "The 'success' function should have been called exactly once" );
						Y.Assert.areSame( 1, completeCallCount, "The 'complete' function should have been called exactly once" );
					},
					
					
					"save should call its 'error' and 'complete' callbacks if the proxy encounters an error while updating" : function() {
						var errorCallCount = 0,
						    completeCallCount = 0;
						
						var model = new this.Model( { id: 1 } );
						model.save( {
							error    : function() { errorCallCount++; },
							complete : function() { completeCallCount++; },
							scope    : this
						} );
						
						Y.Assert.areSame( 1, errorCallCount, "The 'error' function should have been called exactly once" );
						Y.Assert.areSame( 1, completeCallCount, "The 'complete' function should have been called exactly once" );
					}
				},
					
					
				{
					name : "Test concurrent persistence and model updates",
					
					setUp : function() {
						this.Model = Kevlar.Model.extend( {
							addFields : [ 'id', 'field1', 'field2' ],
							proxy  : this.mockProxy
						} );
					},
					
					// ---------------------------------
					
					// TODO: Test that if a model attribute is modified twice after a persistence operation is started, it should be able to be reverted to its original value
					
					
					// Test that model attributes that are updated during a persistence request do not get marked as committed
					
					"Model attributes that are updated (via set()) while a persistence request is in progress should not be marked as committed when the persistence request completes" : function() {
						var test = this;
						var MockProxy = Kevlar.extend( Kevlar.persistence.Proxy, {
							update : function( model, options ) {
								// update method just calls 'success' callback in 50ms
								window.setTimeout( function() {
									options.success.call( options.scope || window );
								}, 50 );
							}
						} );
						
						var MyModel = this.Model.extend( {
							proxy : new MockProxy()
						} );
						
						var model = new MyModel( { id: 1 } );
						
						// Initial set
						model.set( 'field1', "origValue1" );
						model.set( 'field2', "origValue2" );
						
						// Begin persistence operation, defining a callback for when it is complete
						model.save( {
							success : function() {
								test.resume( function() {
									Y.Assert.isTrue( model.isDirty(), "The model should still be dirty after the persistence operation. field1 was set after the persistence operation began." );
									
									Y.Assert.isTrue( model.isModified( 'field1' ), "field1 should be marked as modified (dirty). It was updated (set) after the persistence operation began." );
									Y.Assert.isFalse( model.isModified( 'field2' ), "field2 should not be marked as modified. It was not updated after the persistence operation began." );
									
									Y.Assert.areSame( "newValue1", model.get( 'field1' ), "a get() operation on field1 should return the new value." );
									Y.Assert.areSame( "origValue2", model.get( 'field2' ), "a get() operation on field2 should return the persisted value. It was not updated since the persistence operation began." );
								} );
							}
						} );
						
						
						// Now set the field while the async persistence operation is in progress. Test will resume when the timeout completes
						model.set( 'field1', "newValue1" );
						// note: not setting field2 here
						
						// Wait for the setTimeout in the MockProxy
						test.wait( 100 );
					},
					
					
					
					"Model attributes that have been persisted should not be persisted again if they haven't changed since the last persist" : function() {
						var dataToPersist;
						var MockProxy = Kevlar.persistence.Proxy.extend( {
							update : function( model, options ) {
								dataToPersist = model.getChanges();
								options.success.call( options.scope );
							}
						} );
						var MyModel = this.Model.extend( {
							proxy : new MockProxy()
						} );
						var model = new MyModel( { id: 1 } );
						
						
						// Change field1 first (so that it has changes), then save
						model.set( 'field1', 'newfield1value' );
						model.save();
						
						Y.Assert.areSame( 1, Kevlar.util.Object.length( dataToPersist ), "The dataToPersist should only have one key after field1 has been changed" );
						Y.ObjectAssert.ownsKeys( [ 'field1' ], dataToPersist, "The dataToPersist should have 'field1'" );
						
						
						// Now change field2. The dataToPersist should not include field1, since it has been persisted
						model.set( 'field2', 'newfield2value' );
						model.save();
						
						Y.Assert.areSame( 1, Kevlar.util.Object.length( dataToPersist ), "The dataToPersist should only have one key after field2 has been changed" );
						Y.ObjectAssert.ownsKeys( [ 'field2' ], dataToPersist, "The dataToPersist should have 'field2'" );
					}
				}
			]
		},
		
		
		{
			/*
			 * Test destroy()
			 */
			name: 'Test destroy()',
			ttype : 'testsuite',
			
			items : [
				{
					name : "General destroy() tests",
					
					// Special instructions
					_should : {
						error : {
							"destroy() should throw an error if there is no configured proxy" : "Kevlar.Model::destroy() error: Cannot destroy. No proxy."
						}
					},
					
					
					"destroy() should throw an error if there is no configured proxy" : function() {
						var Model = Kevlar.Model.extend( {
							addFields : [ 'field1', 'field2' ]
							// note: no proxy
						} );
						
						var model = new Model();
						model.destroy();
						Y.Assert.fail( "destroy() should have thrown an error with no configured proxy" );
					},
					
					
					"destroy() should delegate to its proxy's destroy() method to persist the destruction of the model" : function() {
						var mockProxy = JsMockito.mock( Kevlar.persistence.Proxy );				
						var Model = Kevlar.Model.extend( {
							proxy : mockProxy
						} );
						
						var model = new Model();
						
						// Run the destroy() method to delegate 
						model.destroy();
						
						try {
							JsMockito.verify( mockProxy, JsMockito.Verifiers.once() ).destroy();
						} catch( e ) {
							Y.Assert.fail( "The model should have delegated to the destroy method exactly once." );
						}
					},
					
					
					"upon successful destruction of the Model, the Model should fire its 'destroy' event" : function() {
						var mockProxy = JsMockito.mock( Kevlar.persistence.Proxy );
						mockProxy.destroy = function( model, options ) {
							options.success.call( options.scope );
						};
						
						var Model = Kevlar.Model.extend( {
							proxy : mockProxy
						} );
						
						var model = new Model();
						
						var destroyEventFired = false;
						model.addListener( 'destroy', function() {
							destroyEventFired = true;
						} );
						
						// Run the destroy() method to delegate 
						model.destroy();
						Y.Assert.isTrue( destroyEventFired, "Should have fired its destroy event" );
					}
				},
			
			
				{
					name : "destroy() callbacks tests",
					
					setUp : function() {
						this.mockProxy = JsMockito.mock( Kevlar.persistence.Proxy );
						this.mockProxy.destroy = function( model, options ) {
							if( options.success )  { options.success.call( options.scope ); }
							if( options.error )    { options.error.call( options.scope ); }
							if( options.complete ) { options.complete( options.scope ); }
						};
					},
					
			
					"destroy() should call its 'success' and 'complete' callbacks if the proxy is successful" : function() {
						var successCallCount = 0,
						    completeCallCount = 0;
						
						var Model = Kevlar.Model.extend( {
							fields : [ 'field1' ],
							proxy  : this.mockProxy
						} );
						var model = new Model();
						
						model.destroy( {
							success  : function() { successCallCount++; },
							complete : function() { completeCallCount++; },
							scope    : this
						} );
						
						Y.Assert.areSame( 1, successCallCount, "The 'success' function should have been called exactly once" );
						Y.Assert.areSame( 1, completeCallCount, "The 'complete' function should have been called exactly once" );
					},
					
					
					"destroy() should call its 'error' and 'complete' callbacks if the proxy encounters an error" : function() {
						var errorCallCount = 0,
						    completeCallCount = 0;
						    
						var mockProxy = JsMockito.mock( Kevlar.persistence.Proxy );
						mockProxy.destroy = function( model, options ) {
							options.error.call( options.scope );
							options.complete( options.scope );
						};
						
						var Model = Kevlar.Model.extend( {
							fields : [ 'field1' ],
							proxy  : this.mockProxy
						} );
						var model = new Model();
						
						model.destroy( {
							error    : function() { errorCallCount++; },
							complete : function() { completeCallCount++; },
							scope    : this
						} );
						
						Y.Assert.areSame( 1, errorCallCount, "The 'error' function should have been called exactly once" );
						Y.Assert.areSame( 1, completeCallCount, "The 'complete' function should have been called exactly once" );
					}
				}
			]
		}
	]
	
} );
