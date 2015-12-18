'use strict'

var myUtil = {}

function printf( name ) {
  return vsprintf('->%s..... [%s]', [name, '%s']);
}

myUtil.title = {
  module: function( name ) {
    return vsprintf(printf('Module'), [name]);
  },
  controller: function( name ) {
    return vsprintf(printf('Controller'), [name]);
  },
  directive: function( name ) {
    return vsprintf(printf('Directive'), [name]);
  },
  describe: function( frase ) {
    return vsprintf('%s.....:', [frase]);
  },
  it: function( frase, vars ) {
    return vsprintf(vsprintf('....>should %s', [frase]), vars || []);
  }
};
myUtil.config = {
  module: []
};

myUtil.config.module.push(
  function( _$provide_ ) {
    _$provide_.decorator('$rootScope', [
      '$delegate', function( $delegate ) {
        $delegate.safeApply = function( fn ) {
          var phase = $delegate.$$phase;
          if ( phase === '$apply' || phase === '$digest' ) {
            if ( fn && typeof fn === 'function' ) {
              fn();
            }
          }
          else {
            $delegate.$apply(fn);
          }
        };
        return $delegate;
      }
    ]);
  }
);
