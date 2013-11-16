'use strict';

angular.module('socialCounterApp')
  .directive('like', [function () {
    return {
      restrict: 'E',
      template: [
        '<iframe src="//www.facebook.com/plugins/like.php?',
        'href={{url}}&amp;',
        'width&amp;',
        'layout=button_count&amp;',
        'action=like&amp;',
        'show_faces=true&amp;',
        'share=false&amp;',
        'height=21"',
        ' scrolling="no" frameborder="0" style="border:none; overflow:hidden; height:21px;" allowTransparency="true"></iframe>'
      ].join(''),
      link: function(scope, elm, attrs){
        console.log(attrs);
        scope.url = encodeURIComponent(attrs.url);
        console.log(scope.url);
      }
    };
  }]);
