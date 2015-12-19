/**
 * Directive appBookShop.bookrecord convertImageData
 * (João Carvalho, 16-12-2015)
 * Criado com base em angular design style de John Papa
 * (https://github.com/johnpapa/angular-styleguide)
 *
 * Description: Sets image data from uploaded file to field model
 */
(function() {
  'use strict';
  /*jshint validthis: true */
  angular
    .module('appBookShop.bookrecord')
    .directive('convertImageData', convertImageData)
    .controller('convertImageDataCtrl', convertImageDataCtrl);

  /* @ngInject */
  function convertImageData() {
    /*
    * Private Block for private vars
    */

    /*
    * Public Interface
    */
    //<Any convert-image-data="field key on model"/>

    var directive = {
      restrict: 'EA',
      controller: 'convertImageDataCtrl',
      controllerAs: '_convertImageData',
      link: link
    };
    return directive;
    ///////////////
    //just put private functions below this point
    function link( scope, element, attrs, controllers ) {

      var attrsOptions = scope.$eval(attrs.convertImageData || attrs.convertImageDataOptions);
      var options = angular.extend({keyFiles: 'files', fnUpdate: 'update', noDropTag: false}, attrsOptions || {});

      if ((dropAvailable() && options.noDropTag) || (!dropAvailable() && !options.noDropTag)) {
        element.css('display', 'none');
        return;
      }

      controllers.init(options);

      function dropAvailable() {
        var div = document.createElement('div');
        return ('draggable' in div) && ('ondrop' in div) && !/Edge\/12./i.test(navigator.userAgent);
      }
    }
  }

  function convertImageDataCtrl( $scope, Upload, Q ) {
    var model = this;

    model.init = function( options ) {
      //console.log($scope[options.keyFiles], arguments);

      model.options = options;

      $scope.$watch(options.keyFiles, function() {
        model.convert();
        //$scope.upload($scope.files);
      });
    };
    model.convert = function() {
      var files = $scope[model.options.keyFiles];
      if ( files && files.length ) {

        var readFileData = function( theFile ) {
          var defer = Q.defer();

          var reader = new FileReader();
          reader.onloadend = function() {
            defer.resolve(reader.result);
          };
          reader.onabort = function() {
            defer.reject(null);
          };
          reader.onerror = function() {
            defer.reject(null);
          };
          reader.readAsDataURL(theFile);

          return defer.promise;
        };

        var resizeFile = function( theFile ) {
          return function( fileDataOriginal ) {
            //fileDataOriginal = data of original file

            var defer = Q.defer();

            Upload.resize(theFile, 195, null, 1)
              .then(function( fileResized ) {
                readFileData(fileResized)
                  .then(function( fileDataResized ) {
                    defer.resolve({data: fileDataOriginal, resized: fileDataResized});
                  })
                  .catch(function(){
                    defer.reject(null);
                  });

              })
              .catch(function() {
                defer.reject(null);
              });

            return defer.promise;
          };
        };

        var updateModel = function( value ) {
          $scope.model[model.options.fnUpdate].apply(null, [value.data, value.resized]);
        };
        var err = function( err ) {
          console.log(err);
        };

        for ( var i = 0; i < files.length; i++ ) {
          var file = files[i];
          console.log('file:', file);

          if ( !file.$error ) {

            readFileData(file)
              .then(resizeFile(file))
              .then(updateModel)
              .catch(err);
          }
        }
      }
    };
  }


}());
