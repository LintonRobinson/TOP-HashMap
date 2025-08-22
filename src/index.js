// See all nested objects
import util from 'util';
util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.colors = true;

import HashMap from './HashMap.js';

const hashMap = new HashMap();

hashMap.setKey('people','Linton Joshua Robinson');
hashMap.setKey('coding','Linton Joshua Robinson');
//hashMap.removeKey('people')
console.log(hashMap.setKey('amazing','Hannah Rutti'));
console.log('getting people',hashMap.getKey('test'));
console.log('hash map has Josh',hashMap.hasKey('amazing'));
console.log('len',hashMap.lengthOfHashMap())
console.log('key array',hashMap.returnKeysArray())