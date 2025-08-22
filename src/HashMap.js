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
        if(!this.buckets[bucketIndex]) {     
            this.buckets[bucketIndex] = new LinkedList();
            this.buckets[bucketIndex].appendNode(bucketIndex,key,value);
            this.size++;
        } else {
            if (this.buckets[bucketIndex].listContainsKey(key)) {
                const duplicateKeyIndex = this.buckets[bucketIndex].findListKeyIndex(key);
                this.buckets[bucketIndex].removeNodeAt(duplicateKeyIndex);
                this.buckets[bucketIndex].appendNode(bucketIndex,key,value);   
            } else {
                this.buckets[bucketIndex].appendNode(bucketIndex,key,value);
                this.size++;
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
               return null 
            }
        } else {
            console.log('This null returned')
            return null
        }
    };

    hasKey(key) {
        const bucketIndex = this.hash(key);
        if(this.buckets[bucketIndex]) {
            const keyIndex = this.buckets[bucketIndex].findListKeyIndex(key)
            if(!this.buckets[bucketIndex].findListKeyIndex(key)) {
                return true;
            } else {
               return false; 
            }
        } else {
            console.log('This one being returned')
            return false;
        }        
     
    }

    removeKey(key) {
        const bucketIndex = this.hash(key);
        if(this.buckets[bucketIndex]) {
            const keyIndex = this.buckets[bucketIndex].findListKeyIndex(key)
            if(!this.buckets[bucketIndex].findListKeyIndex(key)) {
                this.buckets[bucketIndex].removeNodeAt(keyIndex);
                if (this.buckets[bucketIndex].head === null) this.buckets[bucketIndex] = null;
                this.size--;
                return true;
            } else {
               return false;
            }
        } else {
            return false
        }
    };

    lengthOfHashMap() {
        return this.size;
    };

    clear() {
        this.buckets = new Array(16).fill(null);
    };

   returnKeysArray() {
        let hashMapKeys = [];
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                let currentNode = this.buckets[i].head
                while (currentNode) {
                     hashMapKeys.push(currentNode.key)
                    currentNode = currentNode.nextNode;
                }
            }
        }
        return hashMapKeys;
    };





}

export default HashMap;