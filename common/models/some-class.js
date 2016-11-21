'use strict';

class SomeClass {
  constructor() {
    this.name = 'good example of an ES6 class';
  }

  sayName() {
    console.log('Hi, I am a ', this.name + '.');
  }
}

module.exports = SomeClass;
