"use strict";
var Inflector = require('inflected');
var Base = require('./base');

class HasMany extends Base {
  buildRelatedData (relatedRecords) {
    return relatedRecords.map((relatedRecord) => {
      return new this.klass(relatedRecord);
    });
  }

  get recordKey () {
    return Inflector.pluralize(this.klass.key);
  }

  filterFn (foreignKeyValue, potentialRelatedRecord) {
    return foreignKeyValue.indexOf(potentialRelatedRecord.id) > -1;
  }

  get foreignKey () {
    return this.klass.foreignKey + 's';
  }
}

module.exports = HasMany;