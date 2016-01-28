"use strict";

var ApiResource = require('./api_resource');

class County extends ApiResource {
  static get className () { return 'County'; }
};
class Plan extends ApiResource {
  static get className () { return 'Plan'; }
};
class Provider extends ApiResource {
  static get className () { return 'Provider'; }
};
class State extends ApiResource {
  static get className () { return 'State'; }
};
class ZipCode extends ApiResource {
  static get className () { return 'ZipCode'; }
};
class ZipCounty extends ApiResource {
  static get className () { return 'ZipCounty'; }
};

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
