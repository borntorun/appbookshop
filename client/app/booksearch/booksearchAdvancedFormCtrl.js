/**
 * Controller appBookShop.booksearch BookSearchAdvancedFormCtrl
 * (João Carvalho, 12-03-2015)
 *
 * Descrição: Controla pesquisa avançada de livros
 */
(function () {
    'use strict';
    angular.module('appBookShop.booksearch').controller('BookSearchAdvancedFormCtrl', BookSearchAdvancedFormCtrl);
    /* @ngInject */
    function BookSearchAdvancedFormCtrl($rootScope, $scope, $interval, $timeout, BookSearch, notifier) {
        /*jshint validthis: true */
        var
            vm = this,
            onstateChangeSuccess = $scope.$on('$stateChangeSuccess', setInputSearch);





        //notifier.info('Procura Livros Activa');
        vm.criteria = {};
//        vm.urlRemote = '/api/categories/search/%QUERY';
//        vm.urlPrefetch = '/assets/data/categories.json';
        vm.limit = BookSearch.getSearchLimit();

        vm.options = {
            showLog: true
        }
        vm.ttoptions = {
            name: 'categories',
            limit: BookSearch.getSearchLimit(),
            remote: '/api/categories/search/%QUERY',
            prefetch: '/assets/data/categories.json',
            classNames: {
                input: 'searchadvcat'
            }
        }


        setFields(BookSearch.getSearchAdvancedTerm());
        /*vm.onSelected = function (item) {
          vm.criteria.categories = item.name;
        };
        vm.onClosed = function (item) {
          vm.criteria.categories = item.name;
        };

        $scope.$on('typeahead:opened', function(event, data) {
          alert('on scope opened');
          vm.onSelected(data);
        });
        $scope.$on('typeahead:closed', function(event, data) {
          alert('on scope closed');
          vm.onClosed(data);
        });*/
        vm.search = function search() {
            //console.log(vm.criteria);
            vm.criteria.edition = vm.firstEdition ? "1" : "";
            $rootScope.$state.go('main.search.advresults', {
                type: "advanced",
                limit: vm.limit,
                title: vm.criteria.title || "-",
                authors: vm.criteria.authors || "-",
                subject: vm.criteria.subject || "-",
                collection: vm.criteria.collection || "-",
                categories: vm.criteria.categories || "-",
                edition: vm.firstEdition ? "1" : "-"
            });
        }
        vm.empty = function (/*form*/) {
            return vm.firstEdition === false && (vm.criteria.title + vm.criteria.authors + vm.criteria.subject + vm.criteria.collection + vm.criteria.categories).trim().length === 0;
        }
        function setFields(obj) {
            vm.criteria.title = obj.title === "-" ? "" : obj.title;
            vm.criteria.authors = obj.authors === "-" ? "" : obj.authors;
            vm.criteria.subject = obj.subject === "-" ? "" : obj.subject;
            vm.criteria.collection = obj.collection === "-" ? "" : obj.collection;
            vm.criteria.categories = obj.categories === "-" ? "" : obj.categories;
            vm.firstEdition = obj.edition === "1" ? true : false;
        }

        function setInputSearch(event, toState, toParams, fromState, fromParams) {
            if (toState.name === 'main.search.advresults') {
                setFields({
                    title: toParams.title,
                    authors: toParams.authors,
                    subject: toParams.subject,
                    collection: toParams.collection,
                    categories: toParams.categories,
                    edition: toParams.edition
                })
                event.preventDefault();
            }
        }

        //    $scope.$on('typeahead:opened', function(event, data) {
        //      alert(data);
        //    });
        $scope.$on('$destroy', function () {
            onstateChangeSuccess(); //unregister the listenner 'onstateChangeSuccess'
        });
    }
}());
