"use strict";

var ApiResource = require('../../lib/vericred/api_resource');

class Subclass extends ApiResource {

}

describe('ApiResource', function () {
  describe('constructor', function () {
    it('camelizes data passed in', function () {
      var resource = new Subclass({foo_bar: 'baz'});
      expect(resource.fooBar).to.eql('baz');
    });
  });
});