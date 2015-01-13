'use strict';

describe('Controller: ErrorController', function () {

  // load the controller's module
  beforeEach(module('socialCounterApp'));

  var errorCtrl,scope, _$rootScope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    _$rootScope = $rootScope;
    scope = $rootScope.$new();
    errorCtrl = $controller('ErrorController', {
      $scope: scope
    });
  }));

  describe('event onError', function () {
    it('isError change true', function(){
      _$rootScope.$broadcast('onError');
      expect(scope.isError).to.be.ok();
    });
  });
  describe('event onSuccess', function () {
    it('isError change false', function(){
      _$rootScope.$broadcast('onSuccess');
      expect(scope.isError).to.not.be.ok();
    });
  });

});


