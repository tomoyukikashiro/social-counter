'use strict';


/**
 * google plus one button directive
 *
 * @class
 * @version 0.1.0
 * @author Tomoyuki Kashiro <kashiro@github>
 * @license MIT
 */

angular.module('socialCounterApp')
  .directive('plusone', [function () {
    return {
      restrict: 'E',
      template:'<div class="g-plusone" data-size="medium" data-href="%url%"></div>',
      link: function(scope, elm, attrs){
        var url = attrs.url;
        elm[0].outerHTML = elm[0].outerHTML.replace('%url%', url);

        if(scope.$last){
          elm.ready(function(){
            gapi.plusone.go('result');
          });
        }
      }
    };
  }]);
