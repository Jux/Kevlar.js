/**
 * @abstract
 * @class Kevlar.persistence.Proxy
 * @extends Kevlar.util.Observable
 * 
 * Proxy is the base class for subclasses that perform CRUD (Create, Read, Update, and Delete) operations on the server.
 * 
 * @param {Object} config The configuration options for this class, specified in an object (hash).
 */
/*global Class, Kevlar */
Kevlar.persistence.Proxy = Kevlar.extend( Kevlar.util.Observable, {
	
	abstractClass : true,
	
	
	constructor : function( config ) {
		// Apply the config
		Kevlar.apply( this, config );
	},
	
	
	/**
	 * Creates a Model on the server.
	 * 
	 * @abstract
	 * @method create
	 * @param {Kevlar.Model} model The Model instance to create on the server.
	 */
	create : Class.abstractMethod,
	
	
	/**
	 * Reads a Model from the server.
	 * 
	 * @abstract
	 * @method read
	 * @param {Kevlar.Model} model The Model instance to read from the server.
	 */
	read : Class.abstractMethod,
	
	
	/**
	 * Updates the Model on the server, using the provided `data`.  
	 * 
	 * @abstract
	 * @method update
	 * @param {Kevlar.Model} model The model to persist to the server. 
	 */
	update : Class.abstractMethod,
	
	
	/**
	 * Destroys (deletes) the Model on the server. This method is not named "delete" as "delete" is a JavaScript reserved word.
	 * 
	 * @abstract
	 * @method destroy
	 * @param {Kevlar.Model} model The Model instance to delete on the server.
	 */
	destroy : Class.abstractMethod
	
} );


// Apply Static Properties
Kevlar.apply( Kevlar.persistence.Proxy, {
	
	/**
	 * An object (hashmap) of persistence proxy name -> Proxy class key/value pairs, used to look up
	 * a Proxy subclass by name.
	 * 
	 * @private
	 * @static
	 * @property {Object} proxies
	 */
	proxies : {},
	
	/**
	 * Registers a Proxy subclass by name, so that it may be created by an anonymous object
	 * with a `type` attribute when set to the prototype of a {@link Kevlar.Model}.
	 *
	 * @static  
	 * @method register
	 * @param {String} type The type name of the persistence proxy.
	 * @param {Function} proxyClass The class (constructor function) to register.
	 */
	register : function( type, proxyClass ) {
		var Proxy = Kevlar.persistence.Proxy;  // quick reference to this class's constructor
		
		type = type.toLowerCase();
		if( typeof proxyClass !== 'function' ) {
			new Kevlar.Error( "A Proxy subclass constructor function must be provided to registerProxy()" );
		}
		
		if( !Proxy.proxies[ type ] ) { 
			Proxy.proxies[ type ] = proxyClass;
		} else {
			new Kevlar.Error( "Error: Proxy type '" + type + "' already registered." );
		}
	},
	
	
	/**
	 * Creates (instantiates) a {@link Kevlar.persistence.Proxy} based on its type name, given
	 * a configuration object that has a `type` property. If an already-instantiated 
	 * {@link Kevlar.persistence.Proxy Proxy} is provided, it will simply be returned unchanged.
	 * 
	 * @static
	 * @method create
	 * @param {Object} config The configuration object for the Proxy. Config objects should have the property `type`, 
	 *   which determines which type of {@link Kevlar.persistence.Proxy} will be instantiated. If the object does not
	 *   have a `type` property, an error will be thrown. Note that already-instantiated {@link Kevlar.persistence.Proxy Proxies} 
	 *   will simply be returned unchanged. 
	 * @return {Kevlar.persistence.Proxy} The instantiated Proxy.
	 */
	create : function( config ) {
		var Proxy = Kevlar.persistence.Proxy;  // quick reference to this class's constructor
		var type = config.type ? config.type.toLowerCase() : undefined;
		
		if( config instanceof Kevlar.persistence.Proxy ) {
			// Already a Proxy instance, return it
			return config;
			
		} else if( Proxy.proxies[ type ] ) {
			return new Proxy.proxies[ type ]( config );
			
		} else if( !( 'type' in config ) ) {
			// No `type` property provided on config object
			new Kevlar.Error( "Kevlar.persistence.Proxy.create(): No `type` property provided on persistenceProxy config object" );
			 
		} else {
			// No registered Proxy type with the given type, throw an error
			new Kevlar.Error( "Kevlar.persistence.Proxy.create(): Unknown Proxy type: '" + type + "'" );
		}
	}

} );