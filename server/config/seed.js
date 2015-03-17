/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var Thing = require('../api/thing/thing.model');
/*
Thing.find({}).remove(function () {

  Thing.create({
    //name: 'Development Tools X',
    info: 'Integration with ....',
    opt: '2'
  }, {
    //name: 'Server and Client integration',
    info: 'Powerful and fun stack: MongoDB, Express, AngularJS, and Node.',
    opt: '1'
  }, {
    //name: 'Smart Build System',
    info: 'Build system ignores...',
    opt: '2'
  }, {
    //name: 'Modular Structure',
    info: 'Best practice client...',
    opt: '2'
  }, {
    //name: 'Optimized Build',
    info: 'Build process ...',
    opt: '3'
  }, {
    //name: 'Deployment Ready',
    info: 'Easily deploy ...',
    opt: '1'
  });

});
*/
/*
Thing.findOne({info: /^Build/}, function (err, thing) {
  console.log('- Log findOne obey regex  before -');
  console.log(thing);
  console.log('--------');
});
*/

/*
Thing.find({opt: '2'}).exec(function (err, thing) {
  console.log('opt 2');
  console.log(thing);
});
Thing.find({opt: '2'}).limit(1).exec(function (err, thing) {
  console.log('opt 2 limit 1');
  console.log(thing);
});
*/
/*
Thing.find({info: /^Build/}).limit(1).exec(function (err, thing) {
  console.log('regex');
  console.log(thing);
}).remove(function (err, data) {
  console.log('- Log remove after -');
  console.log(data);
});
/*
Thing.find({info: 'Build system ignores...'}, function (err, thing) {
  console.log('no regex');
  console.log(thing);
}).limit(1);
*/

/*
Thing.find({}, function (err, thing) {
  console.log('- Log find all after -');
  console.log(thing);
  console.log('--------');
});

Thing.find({info: /^Build/}, function(err, thing) {
  console.log('- Log find all obey regex before -');
  console.log(thing);
  console.log('--------');
  Thing.findOne({info: /^Build/}, function (err, thing) {
    console.log('- Log findOne obey regex  before -');
    console.log(thing);
    console.log('--------');
  }).remove(function (err, data) {
    console.log('- Log remove after -');
    if (err) {
      console.log(err);
    }
    console.log(data);
    console.log('shows 2... should be 1!')
    console.log('--------');
    Thing.find({info: /^Build/}, function (err, thing) {
      console.log('- Log find all obey regex after -');
      console.log(thing);
      console.log('--------');
    });
  });
});
*/



