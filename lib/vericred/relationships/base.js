"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function () {
  function Base(klass, owner, opts) {
    _classCallCheck(this, Base);

    this.klass = klass;
    this.owner = owner;
    this.opts = opts || {};
  }

  _createClass(Base, [{
    key: "populateRecord",
    value: function populateRecord(record, relatedRecords) {
      record[this.recordKey] = this.buildRelatedData(relatedRecords);
    }
  }, {
    key: "relatedRecords",
    value: function relatedRecords(record, otherData) {
      var data = otherData[this.relatedRecordKey];
      var foreignKeyValue = record[this.foreignKey];
      if (data && foreignKeyValue) {
        return data.filter(this.filterFn.bind(this, foreignKeyValue));
      }
    }
  }, {
    key: "sideloadData",
    value: function sideloadData(record, otherData) {
      var relatedRecords = this.relatedRecords(record, otherData);
      if (relatedRecords) this.populateRecord(record, relatedRecords);
    }
  }, {
    key: "relatedRecordKey",
    get: function get() {
      return this.klass.path;
    }
  }]);

  return Base;
}();

module.exports = Base;