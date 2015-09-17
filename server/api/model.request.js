//'use strict';
//
//module.exports = function( omodel ) {
//
//  return {
//    findById: findById
//  };
//
//  function findById( res, id, fields, options ) {
//    omodel.findById(id || '', fields, options, function( err, data ) {
//      console.log('----------------------------:', data, data.constructor.name);
//      return result(err, res, data);
//    });
//  }
//
//  function result( err, res, data ) {
//    if ( err ) {
//      return handleError(err, res);
//    }
//    if ( !data ) {
//      return res.send(404);
//    }
//    return res.json(200, data);
//  }
//
//  function handleError( err, res ) {
//    console.log(err);
//    return res.send(500, err);
//  }
//
//}
//
///*Book.findById(req.params.id || '', 'title authors', function( err, Book ) {
//    console.log('1----------------------------:', Book, Book.constructor.name)
//  });
//  Book.findById(req.params.id || '', '-price -qt -priceCost', function( err, Book ) {
//    console.log('2----------------------------:', Book)
//  });
//  Book.findById(req.params.id || '', null, function( err, Book ) {
//    console.log('3----------------------------:', Book)
//  });
//  Book.findById(req.params.id || '', 'title authors', {lean: true}, function( err, Book ) {
//    console.log('4----------------------------:', Book, Book.constructor.name)
//  });*/
