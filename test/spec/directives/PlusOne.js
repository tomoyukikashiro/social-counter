'use strict';

describe('Directive: PlusOne', function () {

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
        template = '<div class="g-plusone" data-size="medium" data-href="%url%"></div>',
        html = template.replace('%url%', url),
        element = $compile('<div><plusone url="http://example.com"></plusone></div>')($rootScope),
        ex;
    $rootScope.$digest();
    ex = element[0].querySelectorAll('div')[0].outerHTML;
    expect(ex).to.contain(html);
  });

});


