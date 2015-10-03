'use strict';

var Q = require('q');

var googleService = require('./google.service');

var passport = require('passport');


exports.callback = function(req, res){
  console.log('callback');


  return res.status(200).json({data:'callback'})
}

exports.success = function(req, res){
  console.log('success:', req.user);
  res.status(200).json({data:'success'});
}

exports.fail = function(req, res){
  console.log('fail');
  res.status(200).json({data:'fail'});
}

