import DS from 'ember-data';
import Ember from 'ember';

var get = Ember.get;

/**
 * @class CordovaContact
 * @extends DS.Model
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
   * Any name, using the first available non empty name
   * @property anyName
   * @type {string}
   */
  anyName: Ember.computed.or('displayName', 'nickname', 'name.formatted'),

  /**
   * First available picture
   * @property anyPhotoUrl
   * @type {string}
   */
  anyPhotoUrl: Ember.computed('photos.@each.value', 'photos.@each.type', function () {
    var url = this.get('photos').findBy('type', 'url');
    if (url && (url = get(url, 'value')) && /^\//.test(url)) {
      url = 'file://' + url;
    }
    return url;
  }).readOnly(),

  /**
   * Phone numbers of the contact
   * @property phoneNumbers
   * @type {Ember.ArrayProxy}
   */
  phoneNumbers: DS.attr('cordova-contact-fields'),

  /**
   * The first available phone number
   * @property anyPhoneNumber
   * @type {string}
   */
  anyPhoneNumber: Ember.computed('phoneNumbers.@each.value', function () {
    var tel = this.get('phoneNumbers').findBy('value');
    return tel ? get(tel, 'value') : null;
  }).readOnly(),


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
   * The first available URL
   * @property anyURL
   * @type {string}
   */
  anyURL: Ember.computed('urls.@each.value', function () {
    var url = this.get('urls').findBy('value');
    return url ? get(url, 'value') : null;
  }).readOnly(),

  /**
   * Email addresses of the contact
   * @property emails
   * @type {Ember.ArrayProxy}
   */
  emails: DS.attr('cordova-contact-fields'),

  /**
   * The first available email
   * @property anyEmail
   * @type {string}
   */
  anyEmail: Ember.computed('emails.@each.value', function () {
    var email = this.get('emails').findBy('value');
    return email ? get(email, 'value') : null;
  }).readOnly(),

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
   * @property organizations
   * @type {Ember.ArrayProxy}
   */
  organizations: DS.attr('cordova-contact-organizations'),

  /**
   * The note
   * @property note
   * @type {string}
   */
  note: DS.attr('string'),

  /**
   * Internal RAW ID
   * @property rawId
   * @type {string}
   */
  rawId: DS.attr('string')
});
