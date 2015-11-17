/**
 * Service appBookShop.booksearch booksearch
 * (João Carvalho, 03-11-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Descrição: Search for books calling api endpoint '/api/search/free|advanced/...'
 */
(function() {
  'use strict';
  /*jshint validthis: true */
  angular
    .module('appBookShop.booksearch')
    .factory('booksearch', booksearch);

  /* @ngInject */
  function booksearch( Q, httpRequest ) {
    /*
    * Private Block
    */
    var defaults = {
      search: {
        free: {
          url: '/api/books/search/free',
          parameters: ['term']
        },
        advanced: {
          url: '/api/books/search/advanced',
          parameters: ['title', 'authors', 'subject', 'collection', 'categories', 'edition']
        },
        paginate: {
          parameters: {names: ['from'], keys: ['title']}

        },
        limit: 25,
        limitMax: 50
      }
    };
    /*
    * Public Interface
    */
    var service = {
      /**
       * Free Search
       * @param criteria
       * @returns {booksearch.BookSearchQuery}
       */
      queryFree: function( criteria ) {
        return searchFactory('free', criteria);
      },
      /**
       * Advanced Search
       * @param criteria
       * @returns {booksearch.BookSearchQuery}
       */
      queryAdvanced: function( criteria ) {
        return searchFactory('advanced', criteria);
      },
      defaults: {
        limit: defaults.search.limit
      }
    };
    return service;
    ///////////////

    /*
    * Private Block Interface
    */
    /**
     * Creates a BookSearchQuery object
     * @param type
     * @param criteria
     * @returns {booksearch.BookSearchQuery}
     */
    function searchFactory( type, criteria ) {

      criteria = criteria || {};
      type = type || 'free';

      return new BookSearchQuery(type, criteria);
    }

    /**
     * BookSearchQuery
     * @param type
     * @param criteria
     * @constructor
     */
    function BookSearchQuery( type, criteria ) {
      var oldCriteriaEdition;
      var oldParameteresBeforePaginate;
      var parametersObject = {limit: 0};
      var paginationMng = {
        index: undefined,
        direction: 1
      };

      var _self = this;

      if ( type === 'advanced' && criteria.edition != null ) {
        oldCriteriaEdition = criteria.edition;
        criteria.edition = _goodValue('edition', oldCriteriaEdition);
      }

      /**
       * @property {String} type
       */
      this.type = type;
      /**
       * @property {String} urlEndPoint
       */
      this.urlEndPoint = defaults.search[type].url;
      /**
       * @property {Array} parameters
       */
      this.parameters = _getParameters(criteria);

      if ( criteria.edition != null ) {
        criteria.edition = oldCriteriaEdition;
      }

      defaults.search[type].parameters.forEach(function( item, index ) {
        parametersObject[item] = index + 1;//limit is 0 so we add 1
      });

      /**
       * @property {String} queryPath
       */
      this.queryPath = _getQueryString();
      /**
       * @property {String} criteria
       */
      this.criteria = _getCriteria();

      /**
       * Set a value for a viewport
       * Viewport: maximun number of items that is visible on a view.
       * The viewport number and 'limit' must be multiples.
       * Pagination:
       * - scrolling down - next() - a 'limit' number of items is returned;
       * - scrolling up - previous() - is only active when the viewport is reached and returns the previous 'limit' items
       * before the first item in the actual viewport
       * - In the view: Items are removed on top when scrolling down or on bottom when scrolling up - previous() -
       * mantaining the number in the viewport
       * Example:
       * - data=[1,2,3,4,5,6,7,8,9,10,11,12] for a viewport=6; limit=3
       * - on execute(): [1,2,3] previous() is undefined; view will be:[1,2,3]
       * - on next():    [4,5,6] previous() is undefined; view will be:[1,2,3,4,5,6]
       * - on next():    [7,8,9] viewport reached; previous() is defined; view will be:[4,5,6,7,8,9]
       * - on next():    [10,11,12] previous() is defined; view will be:[7,8,9,10,11,12]
       * - on previous():[4,5,6]; view will be:[4,5,6,7,8,9]
       * - on previous():[1,2,3] previous() is undefined; view will be:[1,2,3,4,5,6]
       * @param {Number} value
       * @returns {booksearch.BookSearchQuery}
       */
      this.setViewport = function viewport(value) {

        if (typeof value !== 'number') {
          throw new Error('Invalid type for viewport value. Type should be a \'Number\'.');
        }

        var limit = this.parameters[parametersObject.limit];

        if (value <= limit) {
          throw new Error('Invalid viewport value. Must be greater than ' + limit);
        }
        if (value % limit !== 0) {
          throw new Error('Invalid viewport value. Must be multiple of ' + limit);
        }

        this.paginate();

        paginationMng.viewport = value/limit;
        paginationMng.first = [];

        return this;
      };
      /**
       *
       */
      this.cancelViewport = function cancelViewport() {
        delete paginationMng.viewport;
        delete paginationMng.idxFirst;
        delete paginationMng.first;
      };


      /**
       * Allows to retrieve results in a paginated way
       * @returns {booksearch.BookSearchQuery}
       */
      this.paginate = function paginate() {
        if ( paginationMng.index ) {
          return this;
        }
        oldParameteresBeforePaginate = this.parameters.concat([]);

        var parsLen = this.parameters.length;

        defaults.search.paginate.parameters.names.forEach(function( item, index ) {
          parametersObject[item] = paginationMng.index = (parsLen + index);
          _self.parameters.push('-');
        });

        this.queryPath = _getQueryString();
        this.criteria = _getCriteria();

        paginationMng.init = true;
        paginationMng.next = [];

        return this;
      };

      /**
       * Cancels paginate
       * @returns {booksearch.BookSearchQuery}
       */
      this.unpaginate = function unpaginate() {
        if ( !paginationMng.index ) {
          return this;
        }

        defaults.search.paginate.parameters.names.forEach(function( item ) {
          delete parametersObject[item];
        });

        this.parameters = oldParameteresBeforePaginate.concat([]);
        this.queryPath = _getQueryString();
        this.criteria = _getCriteria();

        delete this.next;
        delete this.previous;

        paginationMng = {
          index: undefined,
          direction: 1
        };

        this.cancelViewport();

        return this;
      };

      /**
       * Modify a search parameter
       * @param obj
       * @returns {booksearch.BookSearchQuery}
       */
      this.modifyParameter = function modifyParameter( obj ) {
        for ( var k in obj ) {
          if ( obj.hasOwnProperty(k) ) {
            var index = parametersObject[k];
            if ( index != null ) {
              _self.parameters[index] = _goodValue(k, obj[k]);
            }
          }
        }
        this.queryPath = _getQueryString();
        this.criteria = _getCriteria();
        return this;
      };
      /**
       * Execute a search and retrieve results from the api backend
       * @returns {deferred.promise|*}
       */
      this.execute = function execute() {
        var deferred = Q.defer();
        var options = {};

        options.url = _getQueryString();
        //console.log(options.url);
        if ( paginationMng.index ) {
          paginationMng.limit = _self.parameters[parametersObject.limit];
        }

        httpRequest.get(options)
          .then(function( response ) {
            if ( paginationMng.index ) {
              _mngPagination(response.data);
            }

            deferred.resolve(response.data);
          })
          .catch(function( error ) {
            deferred.reject(error);
          });
        return deferred.promise;
      };

      ////////////////////////////private block

      function _mngPagination( data ) {
        var fromParameter, viewportReached = false;

        if ( paginationMng.init ) {
          paginationMng.init = false;

          if (paginationMng.viewport) {
            //the index to the previous item that will be stored in paginationMng.first

            //paginationMng.viewport=number of pages - next()'s - to reach the viewport;
            //we subtract one because this is the first time and we'll add one later
            //if viewport=2 idxFirst=-3 and after execute() - init - will be -2 which reflect's that after 2+1 next() previous() will be active
            paginationMng.idxFirst = (paginationMng.viewport * -1) - 1;

            //the previous item will be extracted from the sequence of 'next' items
            paginationMng.idxFirstInNext = -1;
          }
          paginationMng.nextIdx = -2;

          //the first next is the 'from' parameter (default='-')
          fromParameter = _item(_self.parameters[paginationMng.index]);
          paginationMng.next.push(fromParameter);//get from parameter
        }

        var numItems = data.length;
        var scrollDown = paginationMng.direction === 1;
        var scrollUp = paginationMng.direction === -1;

        if (!numItems) {
          delete _self.next;
          return;
        }
        //we're responding to a next()
        if ( scrollDown ) {
          //store the next item which is tha last item returned
          paginationMng.next.push(_item(data[numItems - 1]));
          //increment the index for next items
          paginationMng.nextIdx++;

          //if viewport is active
          if (paginationMng.viewport) {
            //increment index's and store the previous items
            paginationMng.idxFirst++;
            paginationMng.idxFirstInNext++;
            paginationMng.first.push(paginationMng.next[paginationMng.idxFirstInNext]);
          }
        }
        //we're responding to a previous()
        if ( scrollUp ) {
          //removing the last next and decrement index
          paginationMng.next.pop();
          paginationMng.nextIdx--;

          //if viewport is active
          if (paginationMng.viewport) {
            //removing the last previous and decrement index
            paginationMng.first.pop();
            paginationMng.idxFirst--;
            paginationMng.idxFirstInNext--;
          }
        }
        if (paginationMng.viewport) {
          //verify if viewport is reached
          viewportReached = paginationMng.idxFirst>-1;
        }

        //verify conditions for pagination
        var hasNext = numItems === paginationMng.limit;
        var hasPrevious = (!paginationMng.viewport && paginationMng.next.length > 2) || viewportReached;

        //if can go 'down'
        if ( hasNext ) {
          //set the method with next value
          _self.next = _next(paginationMng.next.slice(-1)[0]);
        }
        else {
          //remove the method
          delete _self.next;
        }

        //if can go 'up'
        if ( hasPrevious ) {
          var thePrevious;
          //set previous value
          if (!paginationMng.viewport) {
            //normal pagination
            thePrevious = paginationMng.next[paginationMng.nextIdx];
          }
          else {
            //viewport pagination
            thePrevious = paginationMng.first[paginationMng.idxFirst];
          }
          //set the method with previous value
          _self.previous = _previous(thePrevious/*paginationMng.next[paginationMng.nextIdx]*/);
        }
        else {
          //remove the method
          delete _self.previous;
        }

        //console.log(paginationMng.first);
        //console.log('Next-->', !theNext || theNext.from, 'Prev-->', paginationMng.nextIdx, !thePrevious || thePrevious.from, paginationMng.next, _self.previous != null, _self.next != null);

      }

//      function _old_mngPagination( data ) {
//
//        console.log(_self.parameters);
//        console.log(paginationMng);
//
//        var scrollDown = paginationMng.direction === 1;
//        var scrollUp = paginationMng.direction === -1;
//        var numItems = data.length;
//        var hasNext = numItems === paginationMng.limit;
//
//        var next, prev;
//        if ( numItems ) {
//          if ( hasNext ) {
//            next = data[numItems - 1];
//            paginationMng.next.push(_item(data[numItems - 1]));
//
//          }
//
//          if ( scrollDown ) {//next
//            paginationMng.previous.push(_item(data[0]));
//          }
//
//          if ( scrollUp ) {//previous
//            paginationMng.previous.pop();
//          }
//
//          if ( hasNext ) {
//            _self.next = _next(paginationMng.next.slice(-1)[0]);
//          }
//          else {
//            delete _self.next;
//          }
//
//          if ( paginationMng.previous.length > 1 ) {
//            prev = paginationMng.previous.slice(-2)[0].from;
//            _self.previous = _previous(paginationMng.previous.slice(-2)[0]);
//          }
//          else {
//            delete _self.previous;
//          }
//        }
//
//        console.log('Next-->', paginationMng.next, 'Prev-->', paginationMng.previous);
//        console.log('Next-->', next, 'Prev-->', prev);
//        console.log('===========================');
//      }

      function _item( item ) {

        var obj = {};
        var parKeys = defaults.search.paginate.parameters.keys;
        defaults.search.paginate.parameters.names.forEach(function( par, index ) {
          var key;
          if ( parKeys && parKeys.length && index < parKeys.length ) {
            key = parKeys[index];
          }
          if ( key && item.hasOwnProperty(key) ) {
            obj[par] = item[key];
            //ex: obj={'from': 'a book title'}
          }
          else if ( typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean' ) {
            obj[par] = item;
          }
          //          else if (key){
          //            //transform key idea: some special chars for pages? hummm....
          //          }
        });
        return obj;
      }

      function _move( direction, value, overrideValue ) {
        paginationMng.direction = direction;
        if ( overrideValue ) {
          value = _item(overrideValue);
        }
        _self.modifyParameter(value);
        return _self.execute();
      }

      function _next( value ) {
        return function( /*overrideValue*/ ) {
          return _move(1, value/*, overrideValue*/);
        };
      }

      function _previous( value ) {
        return function( /*overrideValue*/ ) {
          return _move(-1, value/*, overrideValue*/);
        };
      }

      function _getParameters( criteria ) {
        var obj = [];

        obj.push(_getLimit(criteria.limit));

        if ( !defaults.search[type] ) {
          throw new Error('Invalid search type');
        }

        defaults.search[type].parameters.forEach(function( item ) {
          obj.push((typeof criteria[item] === 'string' ? criteria[item] : undefined) || '-');
        });
        return obj;
      }

      function _getQueryString() {
        return [_self.urlEndPoint].concat(_self.parameters).join('/');
      }

      function _getCriteria() {
        var obj = {};
        defaults.search[_self.type].parameters.forEach(function( item ) {
          obj[item] = _self.parameters[parametersObject[item]];
          obj[item] = obj[item] === '-' ? '' : obj[item];
        });
        return obj;
      }

      function _getLimit( value ) {
        var lim = parseInt(value);
        return isNaN(lim) ? defaults.search.limit : (lim > defaults.search.limitMax ? defaults.search.limitMax : lim);
      }

      function _goodValue( k, value ) {
        if ( k === 'limit' ) {
          return _getLimit(value);
        }
        if ( k === 'edition' ) {
          if ( value === 1 || value === 0 ||
            value === '1' || value === '0' ||
            value === true || value === false ) {
            return (typeof value === 'string' ? parseInt(value) : value) ? '1' : '0';
          }
          return '-';
        }
        return value;
      }
    }

  }
}());
