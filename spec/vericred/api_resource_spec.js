"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApiResource = require('../../lib/vericred/api_resource');
var Promise = require('require-promise');

var Bar = function (_ApiResource) {
  _inherits(Bar, _ApiResource);

  function Bar() {
    _classCallCheck(this, Bar);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Bar).apply(this, arguments));
  }

  _createClass(Bar, null, [{
    key: "className",
    get: function get() {
      return "Bar";
    }
  }]);

  return Bar;
}(ApiResource);

var Baz = function (_ApiResource2) {
  _inherits(Baz, _ApiResource2);

  function Baz() {
    _classCallCheck(this, Baz);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Baz).apply(this, arguments));
  }

  _createClass(Baz, null, [{
    key: "className",
    get: function get() {
      return "Baz";
    }
  }]);

  return Baz;
}(ApiResource);

var Subclass = function (_ApiResource3) {
  _inherits(Subclass, _ApiResource3);

  function Subclass() {
    _classCallCheck(this, Subclass);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Subclass).apply(this, arguments));
  }

  _createClass(Subclass, null, [{
    key: "className",
    get: function get() {
      return "Subclass";
    }
  }]);

  return Subclass;
}(ApiResource);

;

Subclass.belongsTo(Bar);
Subclass.hasMany(Baz);

describe('ApiResource', function () {
  describe('.find', function () {
    beforeEach(function () {
      ApiResource.connection = {
        get: sinon.stub().returns(new Promise(function (resolve) {
          resolve({ subclass: { foo_bar: 'baz' } });
        }))
      };
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
            subclasses: [{ id: 1, foo_bar: 'baz', bar_id: 3, baz_ids: [5, 6] }, { id: 2, foo_bar: 'qux', bar_id: 4, baz_ids: [7] }],
            bars: [{ id: 3, name_thing: 'Bar 3' }, { id: 4, name_thing: 'Bar 4' }],
            bazs: [{ id: 5, name_thing: 'Bar 5' }, { id: 6, name_thing: 'Baz 6' }, { id: 7, name_thing: 'Bar 7' }]
          });
        }))
      };
    });
    it('searches for multiple records', function (done) {
      return Subclass.search({ foo: 'bar' }).then(function (resources) {
        var called = ApiResource.connection.get.calledWith('/subclasses/', { foo: 'bar' });
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
      var resource = new Subclass({ foo_bar: 'baz' });
      expect(resource.fooBar).to.eql('baz');
    });
  });
});
