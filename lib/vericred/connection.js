var Promise = require('promise');
var request = require('request');
var qs = require('qs');
var util = require('util');

var Vericred = require('../vericred');

var Connection = function (requestLib) {
  this.request = requestLib || request;
};

Connection.prototype = {
  buildQueryString: function (obj) {
    return qs.stringify(obj);
  },
  buildUrl: function(path, query) {
    return Vericred.config.baseUrl +
      path + '?' +
      this.buildQueryString(query || {});
  },
  defaultHeaders: function () {
    return {
      'Vericred-Api-Key' : Vericred.config.apiKey
    };
  },
  get: function (path, query) {
    return this.makeRequest({
      uri: this.buildUrl(path, query),
      headers: this.defaultHeaders()
    });
  },
  makeRequest: function (opts) {
    var _this = this;
    return new Promise(function (resolve, reject) {
      _this.request(opts, function (error, res, body) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body));
        } else {
          reject(JSON.parse(body));
        }
      });
    });
  }
}

module.exports = Connection;
