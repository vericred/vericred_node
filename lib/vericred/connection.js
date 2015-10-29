var Promise = require('promise');
var request = require('request');
var querystring = require('querystring');
var Vericred = require('../vericred');

var Connection = function (requestLib) {
  this.request = requestLib || request;
};

Connection.prototype = {
  buildQueryString: function (obj) {
    return querystring.stringify(obj);
  },
  get: function (path, query) {
    return this.makeRequest({
      uri:
        Vericred.config.baseUrl +
        path + '?' +
        this.buildQueryString(query || {}),
      headers: {
        'Vericred-Api-Key' : Vericred.config.apiKey
      }
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
