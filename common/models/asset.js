'use strict';
var SomeClass = require('./some-class.js');

module.exports = function(Asset) {

    // standard set of validators
    Asset.validatesUniquenessOf('serialNumber', {
      message: 'serialNumber is not unique'
    });

    // custom validator
    Asset.validate('description', customValidator, {
      message: 'Bad name'
    });

    function customValidator(err) {
      if (this.description === 'description') err();
    };


    // override built-in CRUD function
    Asset.on('dataSourceAttached', function(obj) {
      Asset.deleteById = function(id, cb) {
        let someClass = new SomeClass();
        someClass.sayName();
        console.log("override!");
        cb(null);
      }
    });

};
