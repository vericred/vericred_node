var expect = require('chai').expect;
var Vericred = require('../index');

describe('Vericred', function () {
  it('has an apiKey', function () {
    Vericred.config.apiKey = 'foo';
    expect(Vericred.config.apiKey).to.eql('foo');
  });

  describe('resources', function () {
    it('defines the resources', function () {
      expect(typeof(Vericred.County)).to.eql('function');
      expect(typeof(Vericred.Plan)).to.eql('function');
      expect(typeof(Vericred.Provider)).to.eql('function');
      expect(typeof(Vericred.State)).to.eql('function');
      expect(typeof(Vericred.ZipCode)).to.eql('function');
      expect(typeof(Vericred.ZipCounty)).to.eql('function');
    });
  });
});
