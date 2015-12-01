/**
 * Controller appBookShop.bookrecord BookrecordSimilarTitle
 * (João Carvalho, 04-09-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: Book record SimilarTitle controller - Search similar titles view manager
 */
(function() {
  'use strict';

  angular
    .module('appBookShop.bookrecord')
    .controller('BookrecordSimilarTitleCtrl', BookrecordSimilarTitleCtrl);

  /* @ngInject */
  function BookrecordSimilarTitleCtrl( $scope, $stateParams, Q, _lodash, bookrecord, booksearch, SignalsService ) {
    /*jshint validthis: true */
    var model = this;

    model.mustHide = $stateParams.reference !== 'new';

    if (model.mustHide === false) {
      model.book = bookrecord.book;

      SignalsService.bookrecordtitlechanged.listen(search);

      $scope.$on('$destroy', function(){
        SignalsService.bookrecordtitlechanged.unlisten(search);
      });
    }

    function search( done ) {
      if ( !model.book.title || !model.book.title.trim() ) {
        model.results = [];
        done.call();
        return;
      }

      var aWords = model.book.title.trim().split(' ');
      var aPromiseSearch = [];

      for ( var i = 0; i < aWords.length; i++ ) {
        var word = aWords[i].trim();

        if ( word.length > 2 ) {

          aPromiseSearch.push(booksearch.queryAdvanced({
            limit: 15, title: word, authors: '-', subject: '-', collection: '-', categories: '-', edition: '-'
          }).execute());

          //          aPromiseSearch.push(booksearch.searchAdvanced({
          //            title: word, authors: '-', subject: '-', collection: '-', categories: '-', edition: '-'
          //          }, 15));
        }
      }
      if (aPromiseSearch.length==0) {
        done();
        return;
      }
      Q.allSettled(aPromiseSearch)
        .then(function( results ) {
          var dataAll = [];

          function removeIfCurrent( item ) {
            return bookrecord.setReference(item.reference) === model.book.reference;
          }

          for ( var i = 0; i < results.length; i++ ) {
            if ( results[i].state === 'fulfilled' ) {
              var data = results[i].value;
              //_lodash.remove(data, removeIfCurrent);
              dataAll = dataAll.concat(data);
            }
          }
          dataAll.sort(function( a, b ) {
            //return a.reference < b.reference?-1: a.reference>b.reference? 1:0;
            var a1 = a.title.toLowerCase();
            var b1 = b.title.toLowerCase();
            return a1 < b1 ? -1 : a1 > b1 ? 1 : 0;
          });

          dataAll = _lodash.uniq(dataAll, function( n ) {
            return n.reference;
          }, Math);

          $scope.$apply(function() {
            model.results = dataAll;
          });
        })
        .finally(function() {
          //done is a callback function to call
          done.call();
        });
    }

  }
}());
