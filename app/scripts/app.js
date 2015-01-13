'use strict';

angular
  .module('socialCounterApp', [
      'ngRoute',
      'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {})
      .when('/:targetUrl', {
        templateUrl: 'views/main.html',
        controller: 'MainController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
