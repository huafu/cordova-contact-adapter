import DS from 'ember-data';
import Ember from 'ember';

/**
 * @class BasicArrayTransform
 */
export default DS.Transform.extend({
  deserialize: function (serialized) {
    return Ember.ArrayProxy.create({
      content: Ember.EnumerableUtils.map(serialized, function (item) {
        return Ember.ObjectProxy.create({content: item});
      })
    });
  },

  serialize: function (deserialized) {
    return deserialized.map(function (item) {
      return item instanceof Ember.ObjectProxy ? item.get('content') : item;
    });
  }
});
