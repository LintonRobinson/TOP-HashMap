import LinkedList from "hashmap-linked-list";
// import Node from "hashmap-linked-list/Node.js";

const linkedList = new LinkedList().appendNode()
class HashMap {
    constructor() {
        this.buckets = new Array(16);
        this.loadFactor = 0.8;
        this.capacity = 16;
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

    set(key, value) {
        const bucketIndex = this.hash(key);
        if(!this.buckets[bucketIndex]) {     
            this.buckets[bucketIndex] = new LinkedList();
            this.buckets[bucketIndex].appendNode(bucketIndex,key,value);
        } else {
            if (this.buckets[bucketIndex].listContainsKey(key)) {
                const duplicateKeyIndex = this.buckets[bucketIndex].findListKeyIndex(key);
                this.buckets[bucketIndex].removeNodeAt(duplicateKeyIndex);
                this.buckets[bucketIndex].appendNode(bucketIndex,key,value);   
            } else {
                this.buckets[bucketIndex].appendNode(bucketIndex,key,value);
            }; 
        };  

        return this.buckets;
    };

    get(key) {
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

    has(key) {
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

    remove(key) {
        const bucketIndex = this.hash(key);
        if(this.buckets[bucketIndex]) {
            const keyIndex = this.buckets[bucketIndex].findListKeyIndex(key)
            if(!this.buckets[bucketIndex].findListKeyIndex(key)) {
                this.buckets[bucketIndex].removeNodeAt(keyIndex);
                return true;
            } else {
               return false;
            }
        } else {
            console.log('This null returned')
            return false
        }
    };



}

export default HashMap;