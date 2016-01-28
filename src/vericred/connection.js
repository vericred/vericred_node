var Promise = require('require-promise');
var qs = require('qs');
var util = require('util');

var config = require('../vericred/config');

var Connection = function (requestLib) {
  this.request = requestLib || Vericred.config.requestLib;
};

Connection.prototype = {
  buildQueryString: function (obj) {
    return qs.stringify(obj);
  },
  buildUrl: function(path, query) {
    return config.baseUrl +
      path + '?' +
      this.buildQueryString(query || {});
  },
  defaultHeaders: function () {
    return {
      'Vericred-Api-Key' : config.apiKey
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
        if (error) {
          reject(error);
        } else if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body));
        } else {
          reject(JSON.parse(body));
        }
      });
    });
  }
}

module.exports = Connection;
