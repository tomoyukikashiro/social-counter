'use strict';

angular.module('socialCounterApp')
  .controller('ErrorController', ['$scope', function ($scope) {

    $scope.isError = false;

    $scope.$on('onError', function(){
      $scope.isError = true;
    });
    $scope.$on('onSuccess', function(){
      $scope.isError = false;
    });

  }]);
