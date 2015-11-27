"use strict";

var ApiResource = require('./vericred/api_resource');
var Resources = require('./vericred/resources');
var config = require('./vericred/config');


module.exports = {
  config: config,
  County: Resources.County,
  Plan: Resources.Plan,
  Provider: Resources.Provider,
  State: Resources.State,
  ZipCode: Resources.ZipCode,
  ZipCounty: Resources.ZipCounty
}
