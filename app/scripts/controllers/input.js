'use strict';

/**
 * input controller
 *
 * @class
 * @version 0.1.0
 * @author Tomoyuki Kashiro <kashiro@github>
 * @license MIT
 */

angular.module('socialCounterApp')
  .controller('InputCtrl', ['$scope','$location', function ($scope, $location) {

    var targetUrl = '';

    $scope.onSubmit = function(url) {
      var ssid, path;
      targetUrl = url.trim();

      if(url === ''){
        return;
      }

      if(isGss(url)){
        path = url.split('?')[1];
        ssid = queryToObj(path).key;
        $location.path(ssid);
      }else{
        $location.path(encodeURIComponent(targetUrl));
      }
    };

    function isGss(url){
      return url.indexOf('https://docs.google.com') !== -1;
    }

    function queryToObj(query){
      var params, i = 0,
          q,
          kv,
          length,
          result = {};

      if(query === ''){
        return result;
      }

      query = query.replace(/^\?/, '');
      params = query.split('&');
      length = params.length;

      for (; i < length; i++) {
        q = params[i];
        kv = q.split('=');
        result[kv[0]] = decodeURIComponent(kv[1]);
      }
      return result;
    }

  }]);
