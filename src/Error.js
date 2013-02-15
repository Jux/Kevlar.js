Kevlar.Error = Kevlar.extend(Object, {

  statics: {
    ableToThrowError: true,

    setAbleToThrowError: function( value ){
      value = !!value;
      Kevlar.Error.ableToThrowError = value;
    }
  },

  defaultMessage: "Kevlar::Error message required to throw a Kevlar error.",

  constructor: function(msg){
    this._super(arguments);

    if(!msg){
      new Kevlar.Error(this.defaultMessage);
      return;
    } else {
      this.message = msg;
    }

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