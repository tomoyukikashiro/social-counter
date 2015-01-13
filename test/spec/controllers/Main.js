'use strict';

describe('Controller: MainController', function () {

  // load the controller's module
  beforeEach(module('socialCounterApp'));

  var mainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    mainCtrl = $controller('MainController', {
      $scope: scope
    });
  }));

  describe('#hasHttp', function () {
    it('return true if the value has http head of', function(){
      expect(scope.hasHttp('http')).to.be.ok();
      expect(scope.hasHttp('https')).to.be.ok();
    });
    it('return false if the value has http head of', function(){
      expect(scope.hasHttp('hoge')).to.not.be.ok();
    });
  });

  describe('#hasJs', function () {
    it('return true if the value has javascript head of', function(){
      expect(scope.hasJs('javascript:')).to.be.ok(); // jshint ignore:line
    });
    it('return false if the value has http head of', function(){
      expect(scope.hasJs('http')).to.not.be.ok();
    });
  });

  describe('#makeDataFromUrl', function(){
    it('return data object', function(){
      var url = 'http://example.com',
          expectData = [{title: '', url: url}];
      expect(scope.makeDataFromUrl(url)).to.eql(expectData);
    });
  });

});
