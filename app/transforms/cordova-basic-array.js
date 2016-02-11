import DS from 'ember-data';
import Ember from 'ember';
import map from 'lodash/collection/map';

/**
 * @class CordovaBasicArrayTransform
 * @extends DS.Transform
 */
export default DS.Transform.extend({
  deserialize: function (serialized) {
    return Ember.ArrayProxy.create({
      content: serialized ? map(serialized, function (item) {
        return Ember.ObjectProxy.create({content: item || {}});
      }) : []
    });
  },

  serialize: function (deserialized) {
    return deserialized.map(function (item) {
      return (item instanceof Ember.ObjectProxy ? item.get('content') : item) || [];
    });
  }
});
