"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inflector = require('inflected');
var Base = require('./base');

var HasMany = function (_Base) {
  _inherits(HasMany, _Base);

  function HasMany() {
    _classCallCheck(this, HasMany);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(HasMany).apply(this, arguments));
  }

  _createClass(HasMany, [{
    key: 'buildRelatedData',
    value: function buildRelatedData(relatedRecords) {
      var _this2 = this;

      return relatedRecords.map(function (relatedRecord) {
        return new _this2.klass(relatedRecord);
      });
    }
  }, {
    key: 'filterFn',
    value: function filterFn(foreignKeyValue, potentialRelatedRecord) {
      return foreignKeyValue.indexOf(potentialRelatedRecord.id) > -1;
    }
  }, {
    key: 'recordKey',
    get: function get() {
      return Inflector.pluralize(this.klass.key);
    }
  }, {
    key: 'foreignKey',
    get: function get() {
      return this.klass.foreignKey + 's';
    }
  }]);

  return HasMany;
}(Base);

module.exports = HasMany;