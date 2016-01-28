"use strict";
var Inflector = require('inflected');
var Base = require('./base');

class BelongsTo extends Base {
  buildRelatedData (relatedRecords) {
    return new this.klass(relatedRecords[0]);
  }

  get recordKey () {
    return this.klass.key;
  }

  filterFn (foreignKeyValue, potentialRelatedRecord) {
    return foreignKeyValue == potentialRelatedRecord.id;
  }

  get foreignKey () {
    return this.klass.foreignKey;
  }
}

module.exports = BelongsTo;