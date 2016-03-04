import DS from 'ember-data';
import Ember from 'ember';


/**
 * Get a promise resolving to the contacts lib if present
 *
 * @function contactsLib
 * @return {Promise}
 */
function contactsLib() {
  if (typeof navigator.contacts !== 'undefined') {
    return Ember.RSVP.resolve(navigator.contacts);
  }
  else {
    return Ember.RSVP.reject(new Error('No device contact library found.'));
  }
}

/**
 * Parse a store query to extract the fields and filter
 *
 * @function parseQuery
 * @param {Object} query
 * @param {Object} cdvContacts
 * @return {{filter: string, fields: Array.<string>}}
 */
function parseQuery(query, cdvContacts) {
  var keys = [], value, fieldTypes = cdvContacts.fieldType;
  for (var k in query) {
    if (query.hasOwnProperty(k)) {
      if (keys.length) {
        Ember.warn(
          'You can\'t query contacts on multiple fields with different search values, only the first one will be used: ' + value,
          value === query[k]
        );
      }
      else {
        value = query[k];
      }
      keys.push(k);
    }
  }
  return {
    fields: keys,
    filter: value
  };
}

/**
 * @class CordovaContactAdapter
 * @extends DS.Adapter
 */
export default DS.Adapter.extend({
  /**
   * @inheritDoc
   */
  find: function (store, type, id) {
    return contactsLib().then(function (cdvContacts) {
      var options = {filter: '' + id, multiple: false};
      return new Ember.RSVP.Promise(function (resolve, reject) {
        cdvContacts.find(
          [cdvContacts.fieldType.id],
          function (contacts) {
            Ember.run(null, resolve, contacts[0]);
          },
          Ember.run.bind(null, reject),
          options);
      });
    });
  },

  /**
   * @inheritDoc
   */
  createRecord: function (store, type, record) {
    var _this = this;
    return contactsLib().then(function (cdvContacts) {
      return new Ember.RSVP.Promise(function (resolve, reject) {
        var data = _this.serialize(record, {includeId: true});
        cdvContacts.create(data).save(Ember.run.bind(null, resolve), Ember.run.bind(null, reject));
      });
    });
  },

  /**
   * @inheritDoc
   */
  updateRecord: function (store, type, record) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      record.get('content').save(Ember.run.bind(null, resolve), Ember.run.bind(null, reject));
    });
  },

  /**
   * @inheritDoc
   */
  deleteRecord: function (store, type, record) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      record.get('content').remove(Ember.run.bind(null, resolve), Ember.run.bind(null, reject));
    });
  },

  /**
   * @inheritDoc
   */
  findAll: function (store, type, sinceToken) {
    return contactsLib().then(function (cdvContacts) {
      var options = {filter: '', multiple: true, desiredFields: ['displayName', 'phoneNumbers'], hasPhoneNumber: true};
      return new Ember.RSVP.Promise(function (resolve, reject) {
        cdvContacts.find(
          [cdvContacts.fieldType.id],
          function (contacts) {
            Ember.run(null, resolve, contacts);
          },
          Ember.run.bind(null, reject),
          options);
      });
    });
  },

  /**
   * @inheritDoc
   */
  findQuery: function (store, type, query/*, recordArray*/) {
    return contactsLib().then(function (cdvContacts) {
      return new Ember.RSVP.Promise(function (resolve, reject) {
        var options, parsedQuery;
        parsedQuery = parseQuery(query, cdvContacts);
        options = {filter: parsedQuery.filter, multiple: true, desiredFields: ['displayName', 'phoneNumbers'], hasPhoneNumber: true};
        cdvContacts.find(
          parsedQuery.fields,
          function (contacts) {
            Ember.run(null, resolve, contacts);
          },
          Ember.run.bind(null, reject),
          options);
      });
    });
  }
});
