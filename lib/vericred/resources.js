"use strict";

var ApiResource = require('./api_resource');

class County extends ApiResource {};
class Plan extends ApiResource {};
class Provider extends ApiResource {};
class State extends ApiResource {};
class ZipCode extends ApiResource {};
class ZipCounty extends ApiResource {};

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
}