import DS from 'ember-data';
import Ember from 'ember';

/**
 * @class CordovaContactNameTransform
 */
export default DS.Transform.extend({
  deserialize: function (serialized) {
    return Ember.ObjectProxy.create({content: serialized});
  },

  serialize: function (deserialized) {
    return deserialized instanceof Ember.ObjectProxy ? deserialized.get('content') : deserialized;
  }
});
