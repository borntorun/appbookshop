/**
 * Created by Joao Carvalho on 19-10-2015.
 */
'use strict'
module.exports = function(table, objects) {

  function count(callback) {
    table.obj.count({}, function( err, count ) {
      callback(err, count);
    });
  }
  function seed(callback) {
    table.obj.create(objects, callback);
  }

  count( function(err, num) {
    if ( err ) {return;}
    if (num === 0) {
      console.log('seeding ' +  table.name + '...');

      seed(function(err) {
        if ( err ) {return;}
        count(function(err, num) {
          if ( err ) {return;}
          console.log(table.name + ' seeded: ', num);
        });
      });
    }
    console.log(table.name + ': ', num);
  });

};
