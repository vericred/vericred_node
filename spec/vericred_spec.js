var expect = require('chai').expect;
var Vericred = require('../index');

describe('Vericred', function () {
  it('has an apiKey', function () {
    Vericred.config.apiKey = 'foo';
    expect(Vericred.config.apiKey).to.eql('foo');
  });
});
