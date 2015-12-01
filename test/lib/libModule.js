'use strict'
var testModule = function(moduleName, depsTest) {

  describe(myUtil.title.module(moduleName), function() {
    var module;

    beforeEach(function() {
      module = angular.module(moduleName);
    });

    it(myUtil.title.it('be registered'), function() {
      expect(module).not.to.equal(null);
    });

    describe(myUtil.title.describe('Dependencies'), function() {

      var deps;

      var hasModule = function( m ) {
        return deps.indexOf(m) >= 0;
      };

      before(function() {
        deps = module.value(moduleName).requires;

      });

      depsTest.forEach(function( item ) {
        it(myUtil.title.it('have \'%s\' as a dependendy',[item]), function() {
          expect(hasModule(item)).to.equal(true);
        });
      })


      it(myUtil.title.it('have same number of dependencies'), function(){
        expect(deps.length === depsTest.length).to.equal(true)
      });
    });

  });

};
