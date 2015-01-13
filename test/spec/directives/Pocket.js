'use strict';

describe('Directive: Pocket', function () {

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
    var url = $sanitize('http://example.com'),
        template = '<a data-pocket-label="pocket" data-pocket-count="horizontal" class="pocket-btn" data-save-url="%url%" data-lang="en"></a>',
        html = template.replace('%url%', url),
        element = $compile('<div><pocket url="http://example.com"></pocket></div>')($rootScope),
        ex;
    $rootScope.$digest();
    ex = element[0].querySelectorAll('a')[0].outerHTML;
    expect(ex).to.contain(html);
  });

});


