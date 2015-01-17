# cordova-contact-adapter

An adapter and model for use with cordova contact plugin

## Installation

* `npm install --save-dev cordova-contact-adapter`
* or with the latest `ember-cli`: `ember install:addon cordova-contact-adapter`

## Using

* Simply use the `cordova-contact` model as you'd simply do with any other `ember-data` model:
    ```js
    // file: app/routes/contacts.js
    import Ember from 'ember';

    export default Ember.Route.extend({
      model: function () {
        return this.store.find('cordova-contact');
      }
    });
    ```
* When querying for specific contacts on multiple fields, be sure to use the same filter value for all the query parameters:
    ```js
    this.store.find('cordova-contact', {name: 'huafu', nickname: 'huafu', displayName: 'huafu'});
    ```
    Available fields for searching are the same as `cordova.contacts.fieldType`:
    - addresses
    - birthday
    - categories
    - country
    - department
    - displayName
    - emails
    - familyName
    - formatted
    - givenName
    - honorificPrefix
    - honorificSuffix
    - id
    - ims
    - locality
    - middleName
    - name
    - nickname
    - note
    - organizations
    - phoneNumbers
    - photos
    - postalCode
    - region
    - streetAddress
    - title
    - urls

## Running Tests

* `ember test`
* `ember test --server`



---
For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
