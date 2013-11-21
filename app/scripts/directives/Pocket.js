'use strict';


/**
 * pocket button directive
 *
 * @class
 * @version 0.1.0
 * @author Tomoyuki Kashiro <kashiro@github>
 * @license MIT
 */

angular.module('socialCounterApp')
  .directive('pocket', ['$sanitize', function ($sanitize) {
    return {
      restrict: 'E',
      template: '<a data-pocket-label="pocket" data-pocket-count="horizontal" class="pocket-btn" data-save-url="%url%" data-lang="en"></a>',
      link: function(scope, elm, attrs){
        var url = attrs.url;
        elm[0].outerHTML = $sanitize(elm[0].outerHTML.replace('%url%', url));

        if(scope.$last){
          elm.ready(function(){
            var d = document,
                i = 'pocket-btn-js',
                j = d.createElement('script'),
                w;
            j.id=i;
            j.src='https://widgets.getpocket.com/v1/j/btn.js?v=1';
            w = d.getElementById(i);
            d.body.appendChild(j);
          });
        }
      }
    };
  }]);
