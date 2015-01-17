import DS from 'ember-data';

/**
 * @class CordovaContact
 */
export default DS.Model.extend({
  /**
   * Display name of the contact
   * @property displayName
   * @type {string}
   */
  displayName: DS.attr('string'),

  /**
   * Nick-name of the contact
   * @property nickname
   * @type {string}
   */
  nickname: DS.attr('string'),

  /**
   * Birthday of the contact
   * @property birthday
   * @type {string}
   */
  birthday: DS.attr('string'),

  /**
   * Name of the contact
   * @property name
   * @type {Ember.ObjectProxy}
   */
  name: DS.attr('cordova-contact-name'),

  /**
   * Phone numbers of the contact
   * @property phoneNumbers
   * @type {Ember.ArrayProxy}
   */
  phoneNumbers: DS.attr('cordova-contact-fields'),

  /**
   * Photos of the contact
   * @property photos
   * @type {Ember.ArrayProxy}
   */
  photos: DS.attr('cordova-contact-fields'),

  /**
   * Categories of the contact
   * @property categories
   * @type {Ember.ArrayProxy}
   */
  categories: DS.attr('cordova-contact-fields'),

  /**
   * URLs (websites) of the contact
   * @property urls
   * @type {Ember.ArrayProxy}
   */
  urls: DS.attr('cordova-contact-fields'),

  /**
   * Email addresses of the contact
   * @property emails
   * @type {Ember.ArrayProxy}
   */
  emails: DS.attr('cordova-contact-fields'),

  /**
   * Instant messaging ids of the contact
   * @property ims
   * @type {Ember.ArrayProxy}
   */
  ims: DS.attr('cordova-contact-fields'),

  /**
   * Addresses of the contact
   * @property addresses
   * @type {Ember.ArrayProxy}
   */
  addresses: DS.attr('cordova-contact-addresses'),

  /**
   * Organisations of the contact
   * @property organisations
   * @type {Ember.ArrayProxy}
   */
  organisations: DS.attr('cordova-contact-organizations')
});
