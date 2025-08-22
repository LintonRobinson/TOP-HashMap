import LinkedList from "hashmap-linked-list";
// import Node from "hashmap-linked-list/Node.js";

const linkedList = new LinkedList().appendNode()
class HashMap {
    constructor() {
        this.buckets = new Array(16).fill(null);
        this.loadFactor = 0.75;
        this.capacity = 16;
        this.size = 0;
    };

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.capacity;
        };
        return hashCode;
    }

    setKey(key, value) {
        const bucketIndex = this.hash(key);
        // If the keys bucket index  is empty, create and insert linked list and add node with bucketIndex, key and value and update size
        if(!this.buckets[bucketIndex]) {     
            this.buckets[bucketIndex] = new LinkedList();
            this.buckets[bucketIndex].prependNode(bucketIndex,key,value);
            this.size++;
        } else { // If there is a collision, check for duplicate keys and and add node with bucketIndex, key and value and update size
            if (this.buckets[bucketIndex].listContainsKey(key)) {
                const duplicateKeyIndex = this.buckets[bucketIndex].findListKeyIndex(key);
                this.buckets[bucketIndex].removeNodeAt(duplicateKeyIndex);
                this.buckets[bucketIndex].prependNode(bucketIndex,key,value);   
            } else {
                this.buckets[bucketIndex].prependNode(bucketIndex,key,value);
                this.size++;
            }; 
        };  
        // If the size of hashmap is greater than threshold, double the capacity and rehash
        if (this.size > (this.loadFactor * this.capacity)) {
            this.capacity = this.capacity * 2;
            const hashMapEntries = this.returnHashMapEntries();
            this.clearHashMap();
            for (let i = 0; i < hashMapEntries.length; i++) {
               this.setKey(hashMapEntries[i][0],hashMapEntries[i][1]);
            };
        };

        return this.buckets;
    };

    getKey(key) {
        const bucketIndex = this.hash(key);
        if(this.buckets[bucketIndex]) {
            const keyIndex = this.buckets[bucketIndex].findListKeyIndex(key)
            if(!this.buckets[bucketIndex].findListKeyIndex(key)) {
                return this.buckets[bucketIndex].getNodeAtIndex(keyIndex).value;
            } else {
               return null;
            }
        } else {
            return null;
        };
    };

    hasKey(key) {
        const bucketIndex = this.hash(key);
        if(this.buckets[bucketIndex]) {
            const keyIndex = this.buckets[bucketIndex].findListKeyIndex(key)
            if(!this.buckets[bucketIndex].findListKeyIndex(key)) {
                return true;
            } else {
                return false; 
            };
        } else {
            return false;
        };      
     
    }

    removeKey(key) {
        const bucketIndex = this.hash(key);
        // If the bucketindex is populated (key in bucket), remove key and update size
        if(this.buckets[bucketIndex]) {
            const keyIndex = this.buckets[bucketIndex].findListKeyIndex(key)
            if(!this.buckets[bucketIndex].findListKeyIndex(key)) {
                this.buckets[bucketIndex].removeNodeAt(keyIndex);
                if (this.buckets[bucketIndex].head === null) this.buckets[bucketIndex] = null;
                this.size--;
                return true;
            } else {
               return false;
            };
        } else {
            return false;
        }
    };

    lengthOfHashMap() {
        return this.size;
    };

    clearHashMap() {
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    };

   returnKeysArray() {
        let hashMapKeys = [];
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                let currentNode = this.buckets[i].head
                while (currentNode) {
                    hashMapKeys.push(currentNode.key)
                    currentNode = currentNode.nextNode;
                };
            }
        }
        return hashMapKeys;
    };

    returnValuesArray() {
        const hashMapKeys = [];
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                let currentNode = this.buckets[i].head;
                while (currentNode) {
                    hashMapKeys.push(currentNode.value);
                    currentNode = currentNode.nextNode;
                };
            };
        }
        return hashMapKeys;
    };

    returnHashMapEntries() {
        const hashMapEntries = [];
        const hashMapKeys = this.returnKeysArray();
        const hashMapValues = this.returnValuesArray();
        // Add each key value pair to hashMapEntries array
        for (let i = 0;i < hashMapKeys.length; i++) {
            hashMapEntries[i] = [hashMapKeys[i], hashMapValues[i]]
        }
        return hashMapEntries;

    }
};

export default HashMap;