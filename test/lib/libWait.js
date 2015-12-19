'use strict';
// Credits: https://gist.github.com/abreckner/110e28897d42126a3bb9
var waitsForAndThenRun = function( escapeFunction, runFunction, escapeTime ) {

  if (escapeFunction!=null) {
    if ( escapeFunction() ) {
      runFunction();
      return;
    }
  }

  // check the escapeFunction every millisecond so as soon as it is met we can escape the function
  var interval = setInterval(function() {
    if ( escapeFunction!=null && escapeFunction() ) {
      clearMe();

      runFunction();
    }
  }, 1);
  // in case we never reach the escapeFunction, we will time out
  // at the escapeTime
  var timeOut = setTimeout(function() {
    clearMe();

    runFunction();
  }, escapeTime);
  // clear the interval and the timeout
  function clearMe() {
    clearInterval(interval);
    clearTimeout(timeOut);
  }
};
