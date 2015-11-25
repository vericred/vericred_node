"use strict";
var Vericred = require('../vericred');
var HasMany = require('./relationships/has_many');
var BelongsTo = require('./relationships/belongs_to');
var Inflector = require('inflected');

class ApiResource {
  static belongsTo (klass, opts) {
    this.relationships.belongsTo.push(new BelongsTo(klass, this, opts));
  }
  static hasMany (klass, opts) {
    this.relationships.hasMany.push(new HasMany(klass, this, opts));
  }

  static get relationships () {
    this._relationships =
      this._relationships || { hasMany: [], belongsTo: [] };
    return this._relationships;
  }

  constructor(opts) {
    this.data = opts || {};
    this.defineMethods();
  }

  static buildUri(id) {
    return this.path + '/' + (id || '');
  }

  static get className() {
    return this
      .toString()
      .match(/class (\w+)/)[1];
  }

  static find(id) {
    return ApiResource
      .connection
      .get(this.buildUri(id))
      .then( (data)=> {
        return new this(data[this.key]);
      })
  }

  static get foreignKey() {
    return this.key + '_id';
  }

  static get key() {
    return Inflector.underscore(this.className)
  }

  static get path() {
    return Inflector.pluralize(
      Inflector.underscore(this.className)
    );
  }

  static sideloadData (record, otherData) {
    for(var relationshipType in this.relationships) {
      this.relationships[relationshipType].forEach(function (relationship) {
        relationship.sideloadData(record, otherData);
      });
    }
  }

  static search(query){
    query = query || {};
    return ApiResource.connection.get(this.path, query)
      .then((response)=> {
        return response[Inflector.pluralize(this.key)].map((record)=> {
          this.sideloadData(record, response);
          return new this(record);
        })
      })
  }

  defineMethods(){
    for(var originalKey in this.data) {
      var key = Inflector.camelize(originalKey, false);
      if(typeof(this[key]) === 'undefined') {
        this.defineMethod(key, originalKey)
      }
    }
  }

  defineMethod(methodName, keyName){
    Object.defineProperty(this.constructor.prototype, methodName, {
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

