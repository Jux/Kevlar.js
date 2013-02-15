Kevlar.Error = Kevlar.extend(Object, {

  statics: {
    // Used to determine whether any errors can be thrown or simply logged
    ableToThrowError: true,

    // Globally set whether any Kevlar Errors can throw an error or not
    setAbleToThrowError: function( value ){
      value = !!value;
      Kevlar.Error.ableToThrowError = value;
    }
  },

  defaultMessage: "Kevlar::Error message required to throw a Kevlar error.",

  constructor: function(msg){
    this._super(arguments);

    // If a message is not passed in, throw an error about not being provided one.
    if(!msg){
      new Kevlar.Error(this.defaultMessage);
      return;
    } else {
      this.message = msg;
    }


    // Check if throwing errors is allowed, if it is then throw it.  OTherwise, pass it to the logging error
    // method
    if(this.canThrowError()){
      this.throwError();
    } else {
      this.logError(this.message);
    }
  },

  canThrowError: function(){
    return Kevlar.Error.ableToThrowError;
  },

  throwError: function(){
    throw new Error(this.message);
  },

  logError: (function(){
    if ( window.console && window.console.error ) {
      return function( msg ){
        console.error( msg ); 
      };
    } else if ( window.console && window.console.log ){
      return function( msg ){
        console.log( msg );     
      };
    } else {
      return Jux.emptyFn;
    }
  }())
});