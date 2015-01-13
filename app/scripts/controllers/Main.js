'use strict';

/**
 * main controller
 *
 * @class
 * @version 0.1.0
 * @author Tomoyuki Kashiro <kashiro@github>
 * @license MIT
 */

angular.module('socialCounterApp')
  .controller('MainController', ['$scope', '$routeParams', 'GssManip', '$rootScope', function ($scope, $routeParams, GssManip, $rootScope) {

    $scope.targetUrl = decodeURIComponent($routeParams.targetUrl);
    var gssManip;

    $scope.updateData = function(targetUrl){

      if($scope.hasJs(targetUrl)){
        return;
      }

      if($scope.hasHttp(targetUrl)){
        $scope.data = $scope.makeDataFromUrl(targetUrl);
        $rootScope.$broadcast('onSuccess');
      }else{
        gssManip = new GssManip(targetUrl, 'od6');
        gssManip.load(function(data){

          if(data){
            $rootScope.$broadcast('onSuccess');
          }else{
            $rootScope.$broadcast('onError');
          }

          $scope.data = data;
        });
      }
    };

    $scope.hasHttp = function(url){
      return url.indexOf('http') !== -1;
    };

    $scope.hasJs = function(url){
      return url.indexOf('javascript:') !== -1; // jshint ignore:line
    };

    $scope.makeDataFromUrl = function(url){
      return [
        {
          title: '',
          url: url
        }
      ];
    };

    // event
    $scope.$watch('targetUrl', angular.bind($scope, $scope.updateData));

  }]);
