/**
 * Created by Joao Carvalho on 12-03-2015.
 */
(function () {
    'use strict';
    angular
        .module('appBookShop.main')
        .controller('Main', Main);
    /* @ngInject */
    function Main($scope, notifier, bookconfig) {
        /*jshint validthis: true */
        var vm = this;


        vm.options = null;//{opcao1: "teste", opcao2: {sub1: true}};

        //    if (bookconfig.data.labels) {
        //      console.log(bookconfig.data.labels);
        //    }
        //    if (xpto.data.labels) {
        //      console.log(xpto.data.labels);
        //    }
        //notifier.info('Activated Main View');
    }
}());

