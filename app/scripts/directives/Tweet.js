'use strict';


/**
 * tweet button directive
 *
 * @class
 * @version 0.1.0
 * @author Tomoyuki Kashiro <kashiro@github>
 * @license MIT
 */

angular.module('socialCounterApp')
  .directive('tweet', ['$sanitize', function ($sanitize) {
    return {
      restrict: 'E',
      template:'<a data-url="%url%" href="https://twitter.com/share" class="twitter-share-button" data-lang="en">Tweet</a>',
      link: function(scope, elm, attrs){
        var url = attrs.url;
        elm[0].outerHTML = $sanitize(elm[0].outerHTML.replace('%url%', url));

        if(scope.$last){
          elm.ready(function(){
            twttr.widgets.load();
          });
        }
      }
    };
  }]);
