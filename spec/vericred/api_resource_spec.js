"use strict";

var ApiResource = require('../../lib/vericred/api_resource');

class Bar extends ApiResource {}
class Baz extends ApiResource {}

class Subclass extends ApiResource {};

Subclass.belongsTo(Bar);
Subclass.hasMany(Baz);

describe('ApiResource', function () {
  describe('.find', function () {
    beforeEach(function () {
      ApiResource.connection = {
        get: sinon.stub().returns(new Promise(function (resolve) {
          resolve({ subclass: { foo_bar: 'baz' } });
        }))
      }
    });

    it('finds the correct resource', function () {
      return Subclass.find(1).then(function (resource) {
        var called = ApiResource.connection.get.calledWith('/subclasses/1');
        expect(called).to.eql(true);
        expect(resource.fooBar).to.eql('baz');
      });
    });
  });

  describe('.search', function () {
    beforeEach(function () {
      ApiResource.connection = {
        get: sinon.stub().returns(new Promise(function (resolve) {
          resolve({
            subclasses: [
              { id: 1, foo_bar: 'baz', bar_id: 3, baz_ids: [5, 6] },
              { id: 2, foo_bar: 'qux', bar_id: 4, baz_ids: [7] },
            ],
            bars: [
              { id: 3, name_thing: 'Bar 3' },
              { id: 4, name_thing: 'Bar 4' }
            ],
            bazs: [
              { id: 5, name_thing: 'Bar 5' },
              { id: 6, name_thing: 'Baz 6' },
              { id: 7, name_thing: 'Bar 7' },
            ]
          });
        }))
      }
    });
    it('searches for multiple records', function (done) {
      return Subclass.search({ foo: 'bar' })
        .then(function (resources) {
          var called =
            ApiResource.connection.get
              .calledWith('/subclasses/', { foo: 'bar' });
          expect(called).to.eql(true);
          expect(resources.length).to.eql(2);
          expect(resources[0].fooBar).to.eql('baz');
          expect(resources[1].fooBar).to.eql('qux');
          expect(resources[0].bar.nameThing).to.eql('Bar 3');
          expect(resources[1].bar.nameThing).to.eql('Bar 4');
          expect(resources[0].bazs.length).to.eql(2);
          expect(resources[1].bazs.length).to.eql(1);
          done();
        });
    });
  });

  describe('constructor', function () {
    it('camelizes data passed in', function () {
      var resource = new Subclass({foo_bar: 'baz'});
      expect(resource.fooBar).to.eql('baz');
    });
  });
});