/*global window, jQuery, Ext, Y, tests, Kevlar */
/*jslint evil:true */
tests.unit.add( new Ext.test.TestSuite( {
	
	name: 'Kevlar.Error',
	
	items : [
		
		/*
		 * Test Kevlar.isArray()
		 */
		{
			name : "Test will throw an error when creating a Kevlar Error class normally",
			
			test_willThrowError: function() {
				var err = 0;
				try {
					new Kevlar.Error("error");
				} catch(e){
					err+= 1;
				} finally {
					Y.Assert.areEqual(err,1);
				}
			}
		},
		{
			name : "Test will throw an error when creating a Kevlar Error class without a message",
			
			test_willThrowError: function() {
				var err = 0;
				try {
					new Kevlar.Error();
				} catch(e){
					err+= 1;
				} finally {
					Y.Assert.areEqual(err,1);
				}
			}
		},	

		{
			name : "Test will not throw an error when the class is value of canThrowError is false",
			
			test_willThrowError: function() {
				Kevlar.Error.setAbleToThrowError(false);

				var err = 0;
				try {
					new Kevlar.Error();
				} catch(e){
					err+= 1;
				} finally {
					Y.Assert.areEqual(err,0);
				}
			}
		},	

		{
			name : "Test will not throw an error when the class is value of canThrowError is false",
			
			test_willThrowError: function() {
				Kevlar.Error.setAbleToThrowError(false);

				var err = 0;
				try {
					new Kevlar.Error();
					new Kevlar.Error();
					new Kevlar.Error();
					new Kevlar.Error();
				} catch(e){
					err+= 1;
				} finally {
					Y.Assert.areEqual(err,0);
				}
			}
		},


		// Has to run in order to allow other tests which rely on KEvlar.Error class to throw an error to run 
		{
			name: "Test will reset can throw error to true",
			test_resetsValue: function(){
				Kevlar.Error.setAbleToThrowError(true);
				Y.Assert.areEqual(Kevlar.Error.ableToThrowError, true)
			}
		}
			
		
	]
	
} ) );
