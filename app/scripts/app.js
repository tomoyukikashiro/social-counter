'use strict';

angular.module('socialCounterApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {})
      .when('/:targetUrl', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      });
  });
