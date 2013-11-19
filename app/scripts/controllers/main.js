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
  .controller('MainCtrl', ['$scope', '$routeParams', 'GssManip', '$rootScope', function ($scope, $routeParams, GssManip, $rootScope) {

    var targetUrl = $scope.targetUrl = decodeURIComponent($routeParams.targetUrl),
        gssManip;

    $scope.$watch('targetUrl', function(){

      if(hasJs(targetUrl)){
        return;
      }

      if(hasHttp(targetUrl)){
        $scope.data = makeDataFromUrl(targetUrl);
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
    });

    function hasHttp(url){
      return url.indexOf('http') !== -1;
    }

    function hasJs(url){
      return url.indexOf('javascript:') !== -1;
    }

    function makeDataFromUrl(url) {
      return [
        {
          title: '',
          url: url
        }
      ];
    }

  }]);
