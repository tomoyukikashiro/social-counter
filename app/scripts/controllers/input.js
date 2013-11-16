'use strict';

angular.module('socialCounterApp')
  .controller('InputCtrl', ['$scope','$location', function ($scope, $location) {

    var targetUrl = '';

    $scope.onSubmit = function(url) {
      targetUrl = url.trim();
      $location.path(encodeURIComponent(targetUrl));
    };

  }]);
