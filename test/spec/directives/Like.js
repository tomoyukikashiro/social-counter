'use strict';

describe('Directive: Like', function () {

  // load the controller's module
  beforeEach(module('socialCounterApp'));

  var $rootScope, $compile, $sanitize;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$compile_, _$rootScope_, _$sanitize_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $sanitize = _$sanitize_;
  }));

  it('Replaces the element with the appropriate content', function(){
    var url = $sanitize(encodeURIComponent('http://example.com')),
        template = '<iframe src="//www.facebook.com/plugins/like.php?href=%url%&amp;width=120&amp;layout=button_count&amp;action=like&amp;show_faces=true&amp;share=false&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100px; height:21px;" allowtransparency="true"></iframe>',
        html = template.replace('%url%', url),
        element = $compile('<div><like url="http://example.com"></like></div>')($rootScope),
        ex;
    $rootScope.$digest();
    ex = element[0].querySelectorAll('iframe')[0].outerHTML;
    expect(ex).to.contain(html);
  });

});


