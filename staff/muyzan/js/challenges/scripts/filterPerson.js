"use strict";

/**
 * Create a polyfill: Imagine that the filter function does not exist.
 * Create a person construction function that contains the followinf properties: name, height, weight, age, gender.
 * Create two new constructor functions that separate the objects by the civil status property, One that is married, and the another single.
 * Create 6 types that simulate real values of people.
 * Create prototypes for properties that can be shared.
 * Make a function that returns the types that have a weight over 70 kg, a height above 1.65.
 *
 *
 */

/**
 * Constructor Person.
 *
 * @param {string} name - The name for the person.
 * @param {number} height - The height for the person.
 * @param {number} weight - The weight for the person.
 * @param {number} age - The age for the person.
 * @param {string} gender - The gender for the person.
 *
 *
 */

function Person(name, height, weight, age, gender) {
  this.name = name;
  this.height = height;
  this.weight = weight;
  this.age = age;
  this.gender = gender;
  this.alive = true;
}

function Married(name, height, weight, age, gender) {
  Person.call(this, name, height, weight, age, gender);
}

Married.prototype = new Person();

function Single(name, height, weight, age, gender) {
  Person.call(this, name, height, weight, age, gender);
}

Single.prototype = new Person();

 
Array.prototype.filterPerson = function() {
  var res = [];
  for (var i = 0; i < this.length; i++) {
    var val = this[i]; 
    if (val.weight > 70 && val.height > 1.65){
        res.push(val);
    }   
  }
  return res;
};


