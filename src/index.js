// See all nested objects
import util from 'util';
util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.colors = true;

import HashMap from './HashMap.js';

const hashMap = new HashMap();

hashMap.set('people','Linton Joshua Robinson');
hashMap.remove('people')
console.log(hashMap.set('amazing','Hannah Rutti'));
console.log('getting people',hashMap.get('test'));
console.log('hash map has Josh',hashMap.has('amazing'));