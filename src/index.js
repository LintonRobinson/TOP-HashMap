// See all nested objects
import util from 'util';
util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.colors = true;

import HashMap from './HashMap.js';

const hashMap = new HashMap();

 hashMap.setKey('apple', 'red')
 hashMap.setKey('banana', 'yellow')
 hashMap.setKey('carrot', 'orange')
 hashMap.setKey('dog', 'brown')
 hashMap.setKey('elephant', 'gray')
 hashMap.setKey('frog', 'green')
 hashMap.setKey('grape', 'purple')
 hashMap.setKey('hat', 'black')
 hashMap.setKey('ice cream', 'white')
 hashMap.setKey('jacket', 'blue')
 hashMap.setKey('kite', 'pink')
hashMap.setKey('apple', 'blue')
hashMap.setKey('moon', 'silver')
hashMap.setKey('myPet', 'Niloo')
console.log(hashMap.setKey('zebra', 'striped'));
console.log('This is the length', hashMap.lengthOfHashMap())



