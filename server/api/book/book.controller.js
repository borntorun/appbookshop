'use strict';
var _ = require('lodash');
var Book = require('./book.model');
var BookFields = require('./book.fields');
var searchLib = require('./book.search.lib');
//var ObjectId = require('mongoose').Types.ObjectId;


function bookListResults( res ) {
  return function( err, Books ) {
    if ( err ) {
      return handleError(err, res);
    }
    return res.json(200, Books);
  };
}

function bookListLimit( limit ) {
  var value = Number(limit);
  return value === 0 || value > 100 ? 100 : value;
}

// Get list of Books
exports.read = function( req, res ) {
  Book.find(bookListResults(res));
};
exports.search = function( req, res ) {
  //{"$or" : [{"ticket_no" : 725}, {"winner" : true}]}
  //Book.find((req.params.filter && JSON.parse(req.params.filter)) || {}).limit(req.params.limit || 10).exec(function(err, Books) {
  //Book.find({"$or" : [{"title" : /Blue/}, {"yearEdition" : 1930}]}).limit(req.params.limit || 100).exec(function(err, Books) {
  //console.log(require("./book.search.lib").filter(req.params.filter));

  Book
    .find(searchLib.filter(req.params.filter), BookFields.storeSearch)
    .limit(bookListLimit(req.params.limit))
    .exec(bookListResults(res));
};
exports.advancedSearch = function( req, res ) {
  Book.find(searchLib.advfilter(req.params), BookFields.storeSearch)
    .limit(bookListLimit(req.params.limit))
    .exec(bookListResults(res));
};
exports.store = function( req, res ) {
  Book.findById(req.params.id || '', BookFields.storeDetail, result(res));
};
exports.get = function( req, res ) {
  Book.findById(req.params.id || '', result(res));
};
exports.edit = function( req, res ) {
  Book.findById(req.params.id || '', result(res));
};

// Save a Book in the DB.
exports.save = function( req, res ) {
  //console.log('req.body:-----------------', req.body);
  if ( req.body._id ) {
    Book.findById(req.body._id, function( err, found ) {
      if ( err ) {
        return handleError(err, res);
      }
      if ( !found ) {
        return res.send(404);
      }
      console.log('req.body before merge----------------------',req.body);
      delete req.body._id;
      delete req.body.reference;
      delete req.body.dateResgistration;
      delete req.body.dateUpdate;

      /*var foundjson = found.toObject();

      for ( var k in foundjson ) {
        if ( k!== '_id' && k!== 'dateResgistration' && k!== 'reference' && k!== '__v' && foundjson.hasOwnProperty(k) && !req.body[k] ) {
          console.log('---delete----',k, found[k], '----', delete found[k]);
          //delete found[k];
          console.log('---depois----',k, found[k]);
        }
      }
*/

      console.log('found before merge----------------------',found);
      found = _.merge(found, req.body);
      console.log('found after merge----------------------',found);
      updateArrays(found, req.body);

      found.dateUpdate = Date.now();

      found.save(function( err, data ) {
        console.log('data after save----------------------',data);
        if ( err ) {
          return handleError(err, res);
        }

        return res.json(200, {
          _id: data._id,
          reference: data.reference,
          title: data.title
        });
      });
    });
  }
  else {
    //novo
    new Book(req.body)
      .save(function( err, data ) {

        if ( err ) {

          return handleError(err, res);
        }

        console.log('novo: ', new Date());

        return res.json(201, {
          _id: data.id,
          reference: data.reference,
          title: data.title
        });
      });
  }

};

function result(res){
  return function(err, data){
    if ( err ) {
      return handleError(err, res);
    }
    if ( !data ) {
      return res.send(404);
    }
    return res.json(200, data);
  };
}

function isArray( obj ) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

function updateArrays(toObj, fromObj) {

  for ( var k in fromObj ) {
    //console.log(k,'-',fromObj[k],'-',toObj[k]);
    if ( fromObj.hasOwnProperty(k) && isArray(fromObj[k]) ) {
      toObj[k].pop();
      toObj[k] = fromObj[k];
    }
  }
}



function handleError( err, res ) {
  console.log(err);
  return res.send(500, err);
}

//// Updates an existing Book in the DB.
//exports.update = function( req, res ) {
//  console.log(req.body);
//  if ( req.body._id ) {
//    delete req.body._id;
//  }
//  Book.findById(req.params.id, function( err, Book ) {
//    if ( err ) {
//      return handleError(err, res);
//    }
//    if ( !Book ) {
//      return res.send(404);
//    }
//    var updated = _.merge(Book, req.body);
//    updated.save(function( err ) {
//      if ( err ) {
//        return handleError(err, res);
//      }
//      return res.json(200, Book);
//    });
//  });
//};
//// Deletes a Book from the DB.
//exports.destroy = function( req, res ) {
//  Book.findById(req.params.id, function( err, Book ) {
//    if ( err ) {
//      return handleError(err, res);
//    }
//    if ( !Book ) {
//      return res.send(404);
//    }
//    Book.remove(function( err ) {
//      if ( err ) {
//        return handleError(err, res);
//      }
//      return res.send(204);
//    });
//  });
//};




/*
{
"$or": [
  {"title" : {"$in" : [/Blue/, /Catcher/, /1930/]}},
  {"yearEdition" : 1930}
]
}
*/
