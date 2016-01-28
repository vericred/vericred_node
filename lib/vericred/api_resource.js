"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HasMany = require('./relationships/has_many');
var BelongsTo = require('./relationships/belongs_to');
var Connection = require('./connection');
var Inflector = require('inflected');

var ApiResource = function () {
  _createClass(ApiResource, null, [{
    key: 'belongsTo',
    value: function belongsTo(klass, opts) {
      this.relationships.belongsTo.push(new BelongsTo(klass, this, opts));
    }
  }, {
    key: 'hasMany',
    value: function hasMany(klass, opts) {
      this.relationships.hasMany.push(new HasMany(klass, this, opts));
    }
  }, {
    key: 'connection',
    get: function get() {
      return this._connection = this._connection || new Connection();
    },
    set: function set(val) {
      return this._connection = val;
    }
  }, {
    key: 'relationships',
    get: function get() {
      this._relationships = this._relationships || { hasMany: [], belongsTo: [] };
      return this._relationships;
    }
  }]);

  function ApiResource(opts) {
    _classCallCheck(this, ApiResource);

    this.data = opts || {};
    this.defineMethods();
  }

  _createClass(ApiResource, [{
    key: 'defineMethods',
    value: function defineMethods() {
      for (var originalKey in this.data) {
        var key = Inflector.camelize(originalKey, false);
        if (typeof this[key] === 'undefined') {
          this.defineMethod(key, originalKey);
        }
      }
    }
  }, {
    key: 'defineMethod',
    value: function defineMethod(methodName, keyName) {
      Object.defineProperty(this.constructor.prototype, methodName, {
        set: function set(newVal) {
          this.data[keyName] = newVal;
        },
        get: function get() {
          return this.data[keyName];
        }
      });
    }
  }], [{
    key: 'buildUri',
    value: function buildUri(id) {
      return '/' + this.path + '/' + (id || '');
    }
  }, {
    key: 'find',
    value: function find(id) {
      var _this = this;

      return ApiResource.connection.get(this.buildUri(id)).then(function (data) {
        return new _this(data[_this.key]);
      });
    }
  }, {
    key: 'sideloadData',
    value: function sideloadData(record, otherData) {
      for (var relationshipType in this.relationships) {
        this.relationships[relationshipType].forEach(function (relationship) {
          relationship.sideloadData(record, otherData);
        });
      }
    }
  }, {
    key: 'search',
    value: function search(query) {
      var _this2 = this;

      query = query || {};
      return ApiResource.connection.get(this.buildUri(), query).then(function (response) {
        return response[Inflector.pluralize(_this2.key)].map(function (record) {
          _this2.sideloadData(record, response);
          return new _this2(record);
        });
      });
    }
  }, {
    key: 'foreignKey',
    get: function get() {
      return this.key + '_id';
    }
  }, {
    key: 'key',
    get: function get() {
      return Inflector.underscore(this.className);
    }
  }, {
    key: 'path',
    get: function get() {
      return Inflector.pluralize(Inflector.underscore(this.className));
    }
  }]);

  return ApiResource;
}();

module.exports = ApiResource;