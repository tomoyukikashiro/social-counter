'use strict';

describe('Controller: InputController', function () {

  // load the controller's module
  beforeEach(module('socialCounterApp'));

  var inputCtrl, $scope, $location;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, _$rootScope_, _$location_) {
    $scope = _$rootScope_.$new();
    $location = _$location_;
    inputCtrl = _$controller_('InputController', {
      $scope: $scope,
      $location: _$location_
    });
  }));

  describe('#onSubmit', function () {
    it('called goResultPage function', function(){
      var spy = sinon.spy($scope, 'goResultPage');
      $scope.onSubmit('hoge');
      expect(spy.called).to.be.ok();
      spy.restore();
    });
  });
  describe('#onKeyUp', function () {
    it('called goResultPage function', function(){
      var spy = sinon.spy($scope, 'goResultPage');
      $scope.onKeyUp({keyCode: 13}, 'hoge');
      expect(spy.called).to.be.ok();
      spy.restore();
    });
    it('is not called goResultPage function if keycode is not 13', function(){
      var spy = sinon.spy($scope, 'goResultPage');
      $scope.onKeyUp({keyCode: 10}, 'hoge');
      expect(spy.called).to.not.be.ok();
      spy.restore();
    });
  });
  describe('#isGss', function () {
    it('return true if url has google docs url', function(){
      var url = 'https://docs.google.com';
      expect($scope.isGss(url)).to.be.ok();
    });
    it('return false if url dose not have google docs url', function(){
      var url = 'https://google.com';
      expect($scope.isGss(url)).to.not.be.ok();
    });
  });
  describe('#queryToObj', function () {
    it('convert string to object', function(){
      var ex = {hoge: 'hoge', foo: 'foo'},
          res = $scope.queryToObj('?hoge=hoge&foo=foo');
      expect(res).to.eql(ex);
      // dose not have ?
      res = $scope.queryToObj('hoge=hoge&foo=foo');
      expect(res).to.eql(ex);
    });
  });
  describe('#goResultPage', function () {
    it('is not called $location.path if you pass empty string', function(){
      var spy = sinon.spy($location, 'path');
      $scope.goResultPage('');
      expect(spy.called).to.not.be.ok();
      spy.restore();
    });
    it('is called $location.path with key string', function(){
      var url = 'https://docs.google.com?key=hoge',
          spy = sinon.spy($location, 'path');
      $scope.goResultPage(url);
      expect(spy.calledWith('hoge')).to.be.ok();
      spy.restore();
    });
    it('is called $location.path with encoded url string', function(){
      var url = 'https://google.com?key=hoge',
          encodedUrl = encodeURIComponent(url),
          spy = sinon.spy($location, 'path');
      $scope.goResultPage(url);
      expect(spy.calledWith(encodedUrl)).to.be.ok();
      spy.restore();
    });
  });

});


