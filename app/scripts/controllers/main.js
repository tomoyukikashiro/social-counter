'use strict';

angular.module('socialCounterApp')
  .controller('MainCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {

    var targetUrl = $scope.targetUrl = decodeURIComponent($routeParams.targetUrl);

    $scope.$watch('targetUrl', function(){

      if(isGss(targetUrl)){
      }else{
        $scope.data = makeDataFromUrl(targetUrl);
      }

    });

    function isGss(url){
      return url.indexOf('https://docs.google.com/spreadsheet/ccc?key=') !== -1;
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
