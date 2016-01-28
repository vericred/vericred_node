'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var expect = require('chai').expect;
var Vericred = require('../index');

describe('Vericred', function () {
  it('has an apiKey', function () {
    Vericred.config.apiKey = 'foo';
    expect(Vericred.config.apiKey).to.eql('foo');
  });

  describe('resources', function () {
    it('defines the resources', function () {
      expect(_typeof(Vericred.County)).to.eql('function');
      expect(_typeof(Vericred.Plan)).to.eql('function');
      expect(_typeof(Vericred.Provider)).to.eql('function');
      expect(_typeof(Vericred.State)).to.eql('function');
      expect(_typeof(Vericred.ZipCode)).to.eql('function');
      expect(_typeof(Vericred.ZipCounty)).to.eql('function');
    });
  });
});