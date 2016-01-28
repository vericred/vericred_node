"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ApiResource = require('./api_resource');

var County = function (_ApiResource) {
  _inherits(County, _ApiResource);

  function County() {
    _classCallCheck(this, County);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(County).apply(this, arguments));
  }

  _createClass(County, null, [{
    key: 'className',
    get: function get() {
      return 'County';
    }
  }]);

  return County;
}(ApiResource);

;

var Plan = function (_ApiResource2) {
  _inherits(Plan, _ApiResource2);

  function Plan() {
    _classCallCheck(this, Plan);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Plan).apply(this, arguments));
  }

  _createClass(Plan, null, [{
    key: 'className',
    get: function get() {
      return 'Plan';
    }
  }]);

  return Plan;
}(ApiResource);

;

var Provider = function (_ApiResource3) {
  _inherits(Provider, _ApiResource3);

  function Provider() {
    _classCallCheck(this, Provider);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Provider).apply(this, arguments));
  }

  _createClass(Provider, null, [{
    key: 'className',
    get: function get() {
      return 'Provider';
    }
  }]);

  return Provider;
}(ApiResource);

;

var State = function (_ApiResource4) {
  _inherits(State, _ApiResource4);

  function State() {
    _classCallCheck(this, State);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(State).apply(this, arguments));
  }

  _createClass(State, null, [{
    key: 'className',
    get: function get() {
      return 'State';
    }
  }]);

  return State;
}(ApiResource);

;

var ZipCode = function (_ApiResource5) {
  _inherits(ZipCode, _ApiResource5);

  function ZipCode() {
    _classCallCheck(this, ZipCode);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ZipCode).apply(this, arguments));
  }

  _createClass(ZipCode, null, [{
    key: 'className',
    get: function get() {
      return 'ZipCode';
    }
  }]);

  return ZipCode;
}(ApiResource);

;

var ZipCounty = function (_ApiResource6) {
  _inherits(ZipCounty, _ApiResource6);

  function ZipCounty() {
    _classCallCheck(this, ZipCounty);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ZipCounty).apply(this, arguments));
  }

  _createClass(ZipCounty, null, [{
    key: 'className',
    get: function get() {
      return 'ZipCounty';
    }
  }]);

  return ZipCounty;
}(ApiResource);

;

Provider.belongsTo(State);
ZipCounty.belongsTo(County);
ZipCounty.belongsTo(ZipCode);

module.exports = {
  County: County,
  Plan: Plan,
  Provider: Provider,
  State: State,
  ZipCode: ZipCode,
  ZipCounty: ZipCounty
};