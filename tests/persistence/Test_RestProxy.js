/*global window, Ext, Y, JsMockito, Kevlar */
Ext.test.Session.addSuite( 'Kevlar.persistence', {
                                                 
	name: 'Kevlar.persistence.RestProxy',
	
	
	items : [
	
		{
			/*
			 * Test load()
			 */

			name: 'Test load',
			
			"load() should populate the model data upon a successful ajax request" : function() {
				var testData = { field1: 'value1', field2: 'value2' };
				var ajaxFn = function( options ) { 
					options.success( testData );
				};
				var TestProxy = Kevlar.persistence.RestProxy.extend( {
					ajax : ajaxFn
				} );
				var proxy = new TestProxy();
				
				var mockModel = JsMockito.mock( Kevlar.Model );
				proxy.read( mockModel );
				
				try {
					JsMockito.verify( mockModel ).set( testData );
				} catch( e ) {
					Y.Assert.fail( "The model should have had its data set to the testData" );
				}
			}
		},
		
		
		
		{
			/*
			 * Test update()
			 */
			name: "Test update()",
			ttype: 'testsuite',
			
			items : [
				{
					name : "General tests",
					
					setUp : function() {
						this.MockModel = Kevlar.Model.extend( {
							addFields : [ 'id', 'field1', 'field2' ]
						} );
					},
					
					
					"update() should NOT actually call the ajax method when no fields have been changed" : function() {
						var ajaxCallCount = 0;
						var ajaxFn = function() { ajaxCallCount++; };
						
						var TestProxy = Kevlar.persistence.RestProxy.extend( {
							ajax : ajaxFn
						} );
						var proxy = new TestProxy();
						
						var model = new this.MockModel();
						
						// Note: do not change any fields before calling save()
						proxy.update( model );
						
						Y.Assert.areSame( 0, ajaxCallCount, "The proxy's ajax() method should not have not been called, since there are no changes" );
					},
					
					"update() should in fact call the ajax method when fields have been changed" : function() {
						var ajaxCallCount = 0;
						var ajaxFn = function() { ajaxCallCount++; };
						 
						var TestProxy = Kevlar.persistence.RestProxy.extend( {
							ajax : ajaxFn
						} );
						var proxy = new TestProxy();
						
						var model = new this.MockModel( { id : 1 } );
						
						// Change a field
						model.set( 'field1', 'value1' );
						proxy.update( model );
						
						Y.Assert.areSame( 1, ajaxCallCount, "The proxy's ajax() method should have been called, since there are changes to persist" );
					},
					
					
					"The 'success' and 'complete' callbacks provided to update() should be called if no fields have been changed, and it does not need to do its ajax request" : function() {
						var ajaxCallCount = 0;
						var ajaxFn = function() { ajaxCallCount++; };
						var TestProxy = Kevlar.extend( Kevlar.persistence.RestProxy, {
							ajax: ajaxFn
						} );
						
						var model = JsMockito.mock( Kevlar.Model );
						JsMockito.when( model ).getChanges().thenReturn( {} );
						
						var proxy = new TestProxy();
						
						var successCallCount = 0,
						    completeCallCount = 0;
						proxy.update( model, {
							success : function() { successCallCount++; },
							complete : function() { completeCallCount++; }
						} );
						
						Y.Assert.areSame( 0, ajaxCallCount, "The ajax method should not have been called" );
						Y.Assert.areSame( 1, successCallCount, "The 'success' callback provided update() should have been called even though there are no changes and the proxy didn't need to persist anything" );
						Y.Assert.areSame( 1, completeCallCount, "The 'complete' callback provided update() should have been called even though there are no changes and the proxy didn't need to persist anything" );
					}
				},
				
				
				
				{
					name : "Test incremental updates",
					
					setUp : function() {						
						this.mockModel = JsMockito.mock( Kevlar.Model );
						JsMockito.when( this.mockModel ).getPersistedData().thenReturn( { field1: 'value1', field2: 'value2' } );
						JsMockito.when( this.mockModel ).getPersistedChanges().thenReturn( { field2: 'value2' } );  // 'field2' is the "change"
					},
					
					
					"update() should provide the full set of data to the ajax method if the proxy is not set to do incremental updates" : function() {
						var dataPersisted;
						var ajaxFn = function( options ) {
							dataPersisted = JSON.parse( options.data );  // the data is fed as a JSON encoded string
						};
						var TestProxy = Kevlar.persistence.RestProxy.extend( {
							ajax : ajaxFn,
							incremental: false
						} );
						var proxy = new TestProxy();
						
						proxy.update( this.mockModel );
						
						Y.Assert.areEqual( 2, Kevlar.util.Object.length( dataPersisted ), "The dataPersisted have exactly 2 keys, one for each of the fields in the model" );
						Y.ObjectAssert.ownsKeys( [ 'field1', 'field2' ], dataPersisted );
						Y.Assert.areEqual( 'value1', dataPersisted.field1 );
						Y.Assert.areEqual( 'value2', dataPersisted.field2 );
					},
					
					
					"update() should provide only the changed data if the proxy is set to do incremental updates" : function() {
						var dataPersisted;
						var ajaxFn = function( options ) {
							dataPersisted = JSON.parse( options.data );  // the data is fed as a JSON encoded string
						};
						var TestProxy = Kevlar.persistence.RestProxy.extend( {
							ajax : ajaxFn,
							incremental: true
						} );
						var proxy = new TestProxy();
						
						proxy.update( this.mockModel );
						
						Y.Assert.areEqual( 1, Kevlar.util.Object.length( dataPersisted ), "The dataPersisted have exactly 1 key, the one that was changed" );
						Y.ObjectAssert.ownsKeys( [ 'field2' ], dataPersisted );
						Y.Assert.areEqual( 'value2', dataPersisted.field2 );
					}
				}
			]
		},
		
		
		{
			/*
			 * Test buildUrl()
			 */
			name: 'Test buildUrl()',
			
			
			"buildUrl() should return the configured url if the 'appendId' config is false" : function() {
				var proxy = new Kevlar.persistence.RestProxy( {
					urlRoot : '/testUrl',
					appendId : false
				} );
				
				Y.Assert.areSame( '/testUrl', proxy.buildUrl(), "buildUrl() should have simply returned the url" );
				Y.Assert.areSame( '/testUrl', proxy.buildUrl( 42 ), "buildUrl() should have simply still returned the url, even with providing an `id` argument" );
			},
			
			
			"buildUrl() should return the configured url if the 'appendId' config is true, but no id is provided" : function() {
				var proxy = new Kevlar.persistence.RestProxy( {
					urlRoot : '/testUrl',
					appendId : true
				} );
				
				Y.Assert.areSame( '/testUrl', proxy.buildUrl(), "buildUrl() should have simply returned the url" );
			},
			
			
			"buildUrl() should return the configured url with the model's id, if the 'appendId' config is true, and an id is provided" : function() {
				// Try with no trailing slash on the url
				var proxy1 = new Kevlar.persistence.RestProxy( {
					urlRoot : '/testUrl',  // note: no trailing slash
					appendId : true
				} );
				
				Y.Assert.areSame( '/testUrl/42', proxy1.buildUrl( 42 ), "buildUrl() should have returned the url with the id appended" );
				
				// Try with a trailing slash on the url
				var proxy2 = new Kevlar.persistence.RestProxy( {
					urlRoot : '/testUrl/',  // note: trailing slash exists
					appendId : true
				} );
				
				Y.Assert.areSame( '/testUrl/42', proxy2.buildUrl( 42 ), "buildUrl() should have returned the url with the id appended" );
			}
		}
	]
} );