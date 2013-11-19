'use strict';

/**
 * like button directive
 *
 * @class
 * @version 0.1.0
 * @author Tomoyuki Kashiro <kashiro@github>
 * @license MIT
 */

angular.module('socialCounterApp')
  .directive('like', [function () {
    return {
      restrict: 'E',
      template: '<iframe src="//www.facebook.com/plugins/like.php?href=%url%&amp;width=100&amp;layout=button_count&amp;action=like&amp;show_faces=true&amp;share=false&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:21px;" allowTransparency="true"></iframe>',
      link: function(scope, elm, attrs){
        var url = encodeURIComponent(attrs.url);
        elm[0].outerHTML = elm[0].outerHTML.replace('%url%', url);
      }
    };
  }]);
