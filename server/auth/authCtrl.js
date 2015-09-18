'use strict'

exports.callback = function(req, res) {
  console.log('no authCtrl callback');
  return require('./' + req.param.social).callback;
};

exports.authenticate = function(req, res) {
  console.log('no authCtrl authenticate');
  //console.log(req);
  return require('./' + req.params.social).authenticate();
};
