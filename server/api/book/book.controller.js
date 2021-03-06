"use strict";
var _ = require("lodash");
var Book = require("./book.model");
var BookFields = require("./book.fields");
var searchLib = require("./book.search.lib");
var util = require("../../util");
var nodeutil = require("util");
var mongosanitize = require("mongo-sanitize");
//var ObjectId = require('mongoose').Types.ObjectId;

//List of Books
exports.read = function (req, res) {
  Book.find(bookListResults(res));
};

//Simple search
exports.search = function (req, res) {
  //console.log(req.params);
  var filter = searchLib.filter(req.params.filter);

  searchBook(req, res, filter);

  /*Book
    .find(filter, BookFields.storeSearch)
    .sort({title: 1})
    .limit(bookListLimit(req.params.limit))
    .exec(bookListResults(res));*/
};

//Advanced search
exports.advancedSearch = function (req, res) {
  //console.log(req.params);
  var filter = searchLib.advfilter(req.params);
  //console.log(filter);
  searchBook(req, res, filter);

  /*Book
    .find(filter, BookFields.storeSearch)
    .sort({title: 1})
    .limit(bookListLimit(req.params.limit))
    .exec(bookListResults(res));*/
};

function searchBook(req, res, filter) {
  //console.log(filter);
  if (req.params.loadfrom && req.params.loadfrom !== "-") {
    filter.title = { $gt: req.params.loadfrom };
  }

  Book.find(filter, BookFields.storeSearch)
    .sort({ title: 1 })
    .limit(bookListLimit(req.params.limit))
    .exec(bookListResults(req, res));
}
//Get number of books
exports.count = function (req, res) {
  Book.count({}, result(res));
};

//Get one book
exports.store = function (req, res) {
  var ref = mongosanitize(req.params.reference);
  var search = { reference: ref || "" };

  Book.findOne(search, BookFields.storeDetail, result(res));
};

//Get one book for editing
exports.edit = function (req, res) {
  var ref = mongosanitize(req.params.reference);
  var search = { reference: ref || "" };
  Book.findOne(search, result(res));
};

//Save a book (new or existing)
exports.save = function (req, res) {
  req.checkBody("title", "Error in title.").notEmpty();
  req.checkBody("reference", "Error in reference.").notEmpty();

  var errors = req.validationErrors();
  if (errors) {
    return handleError(
      new Error("Error(s): " + nodeutil.inspect(errors)),
      res,
      400
    );
  }

  function updateArrays(toObj, fromObj) {
    for (var k in fromObj) {
      if (fromObj.hasOwnProperty(k) && util.isArray(fromObj[k])) {
        toObj[k].pop();
        toObj[k] = fromObj[k];
      }
    }
  }
  
  if (req.body._id) {
    req.checkBody("_id", "Error in id.").notEmpty().isAlphanumeric();

    var id = mongosanitize(req.body._id);
    var _ref = mongosanitize(req.body.reference);
    
    Book.findOne({'reference': _ref}, function (err, found) {
      if (err) {
        return handleError(err, res);
      }
      if (!found) {
        return handleErrorNotFound(res);
      }

      if (found.__v !== req.body.__v) {
        return handleErrorVersionConflict(res);
      }

      if (parseInt(req.body.reference) !== found.reference) {
        return handleError(new Error("Reference does not match."), res, 409);
      }

      delete req.body._id;
      delete req.body.reference;
      delete req.body.dateResgistration;
      delete req.body.dateUpdate;

      found = _.merge(found, req.body);

      //TODO: compress images in req.body.images array

      updateArrays(found, req.body);

      //found.dateUpdate = Date.now();

      found.save(function (err, data) {
        if (err) {
          return handleError(err, res);
        }

        return res.status(200).json({
          _id: data._id,
          reference: data.reference,
          title: data.title,
          slug: data.slug,
        });
      });
    });
  } else {
    new Book(req.body).save(function (err, data) {
      if (err) {
        return handleError(err, res);
      }
      return res.json(201, {
        _id: data.id,
        reference: data.reference,
        title: data.title,
        slug: data.slug,
      });
    });
  }
};

function bookListResults(req, res) {
  return function (err, Books) {
    if (err) {
      return handleError(err, res);
    }
    //    console.log(Books);
    //    var last = Books.slice(-1);
    //    if ( last && last.length > 0 ) {
    //      res.append('loadfrom', last[0].title);
    //    }
    return res.status(200).json(Books);
  };
}

function bookListLimit(limit) {
  var value = Number(limit);
  return value === 0 || value > 100 ? 100 : value;
}

function result(res) {
  return function (err, data) {
    if (err) {
      return handleError(err, res);
    }
    if (data == null) {
      return res.send(404);
    }
    console.log(data);
    return res.status(200).json(data);
  };
}
function handleError(err, res, code) {
  console.log(err);
  return res.status(code || 500).json({ error: err.message });
}
function handleErrorNotFound(res) {
  return handleError(new Error("Not found."), res, 404);
}
function handleErrorVersionConflict(res) {
  return handleError(
    new Error(
      "Conflito de versão.\nExiste uma versão mais recente do registo.\n"
    ),
    res,
    409
  );
}

//
//function responseError(type, message, detail, info, code) {
//
//}
