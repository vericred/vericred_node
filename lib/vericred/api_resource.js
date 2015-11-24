"use strict";
var Vericred = require('../vericred');

class ApiResource {
  constructor(opts) {
    console.log('constructor');
    this.data = opts || {};
    this.defineMethods();
  }

  camelize(string) {
    return string.replace(/_(\w)/, function (r) {
      return r.replace(/_/,'').toUpperCase();
    });
  }

  defineMethods(){
    for(var originalKey in this.data) {
      var key = this.camelize(originalKey);
      if(typeof(this[key]) !== 'function') {
        this.defineMethod(key, originalKey)
      }
    }
  }

  defineMethod(methodName, keyName){
    Object.defineProperty(this, methodName, {
      set: function (newVal) {
        this.data[keyName] = newVal;
      },
      get: function () {
        return this.data[keyName];
      }
    });
  }

}

module.exports = ApiResource;

