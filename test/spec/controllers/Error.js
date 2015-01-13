'use strict';

describe('Controller: ErrorController', function () {

  // load the controller's module
  beforeEach(module('socialCounterApp'));

  var errorCtrl,$scope, $rootScope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, _$rootScope_) {
    $rootScope = _$rootScope_;
    $scope = _$rootScope_.$new();
    errorCtrl = _$controller_('ErrorController', {
      $scope: $scope
    });
  }));

  describe('event onError', function () {
    it('isError change true', function(){
      $rootScope.$broadcast('onError');
      expect($scope.isError).to.be.ok();
    });
  });
  describe('event onSuccess', function () {
    it('isError change false', function(){
      $rootScope.$broadcast('onSuccess');
      expect($scope.isError).to.not.be.ok();
    });
  });

});


