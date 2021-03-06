/**
 * @private
 * @abstract
 * @class Kevlar.DataComponent
 * 
 * Base class for data-holding classes ({@link Kevlar.Model} and {@link Kevlar.Collection}), that abstracts out some
 * of the commonalities between them.
 * 
 * This class is used internally by the framework, and shouldn't be used directly.
 */
/*global Class, Kevlar */
Kevlar.DataComponent = Kevlar.util.Observable.extend( {
	
	abstractClass : true,
	
	
	/**
	 * @protected
	 * @property {String} clientId (readonly)
	 * 
	 * A unique ID for the Model on the client side. This is used to uniquely identify each Model instance.
	 * Retrieve with {@link #getClientId}.
	 */
	
	
	constructor : function() {
		// Call the superclass's constructor (Observable)
		this._super( arguments );
		
		// Create a client ID for the DataComponent
		this.clientId = 'c' + Kevlar.newId();
	},
	
	
	/**
	 * Retrieves the DataComponent's unique {@link #clientId}.
	 * 
	 * @method getClientId
	 * @return {String} The DataComponent's unique {@link #clientId}. 
	 */
	getClientId : function() {
		return this.clientId;
	},
	
	
	/**
	 * Retrieves the native JavaScript value for the DataComponent.
	 * 
	 * @abstract
	 * @method getData
	 * @param {Object} [options] An object (hash) of options to change the behavior of this method. This object is sent to
	 *   the {@link Kevlar.data.NativeObjectConverter#convert NativeObjectConverter's convert method}, and accepts all of the options
	 *   that the {@link Kevlar.data.NativeObjectConverter#convert} method does. See that method for details.
	 * @return {Object} A hash of the data, where the property names are the keys, and the values are the {@link Kevlar.attribute.Attribute Attribute} values.
	 */
	getData : Class.abstractMethod,
	
	
	/**
	 * Determines if the DataComponent has any modifications.
	 * 
	 * @abstract
	 * @method isModified
	 * 
	 * @param {Object} [options] An object (hash) of options to change the behavior of this method.  Options may include:
	 * @param {Boolean} [options.persistedOnly=false] True to have the method only return true if a {@link Kevlar.attribute.Attribute#persist persisted} 
	 *   attribute of a Model is modified within the DataComponent. 
	 * 
	 * @return {Boolean}
	 */
	isModified : Class.abstractMethod,
	
	
	/**
	 * Commits the data in the DataComponent, so that it is no longer considered "modified".
	 * 
	 * @abstract
	 * @method commit
	 */
	commit : Class.abstractMethod,
	
	
	/**
	 * Rolls the data in the DataComponent back to its state before the last {@link #commit}
	 * or rollback.
	 * 
	 * @abstract
	 * @method rollback
	 */
	rollback : Class.abstractMethod
	
} );