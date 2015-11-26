"use strict";

class Base {
  constructor(klass, owner, opts){
    this.klass = klass;
    this.owner = owner;
    this.opts = opts || {};
  }

  populateRecord(record, relatedRecords) {
    record[this.recordKey] = this.buildRelatedData(relatedRecords);
  }

  get relatedRecordKey () {
    return this.klass.path;
  }

  relatedRecords(record, otherData) {
    var data = otherData[this.relatedRecordKey];
    var foreignKeyValue = record[this.foreignKey];
    if (data && foreignKeyValue) {
      return data.filter(this.filterFn.bind(this, foreignKeyValue));
    }
  }

  sideloadData(record, otherData) {
    var relatedRecords = this.relatedRecords(record, otherData);
    if (relatedRecords) this.populateRecord(record, relatedRecords);
  }
}
module.exports = Base;