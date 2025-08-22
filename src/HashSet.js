import LinkedList from "hashset-linked-list";


const linkedList = new LinkedList().appendNode()
class HashSet {
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

    setKey(key) {
        const bucketIndex = this.hash(key);
        // If the keys bucket index  is empty, create and insert linked list and add node with bucketIndex, key and update size
        if(!this.buckets[bucketIndex]) {     
            this.buckets[bucketIndex] = new LinkedList();
            this.buckets[bucketIndex].prependNode(bucketIndex,key);
            this.size++;
        } else { // If there is a collision, check for duplicate keys and and add node with bucketIndex, key and update size
            if (this.buckets[bucketIndex].listContainsKey(key)) {
                const duplicateKeyIndex = this.buckets[bucketIndex].findListKeyIndex(key);
                this.buckets[bucketIndex].removeNodeAt(duplicateKeyIndex);
                this.buckets[bucketIndex].prependNode(bucketIndex,key);   
            } else {
                this.buckets[bucketIndex].prependNode(bucketIndex,key);
                this.size++;
            }; 
        };  
        // If the size of hashset is greater than threshold, double the capacity and rehash
        if (this.size > (this.loadFactor * this.capacity)) {
            this.capacity = this.capacity * 2;
            const hashSetEntries = this.returnHashSetEntries();
            this.clearHashSet();
            for (let i = 0; i < hashSetEntries.length; i++) {
               this.setKey(hashSetEntries[i][0],hashSetEntries[i][1]);
            };
        };

        return this.buckets;
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
     
    };

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

    lengthOfHashSet() {
        return this.size;
    };

    clearHashSet() {
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    };

   returnKeysArray() {
        let hashSetKeys = [];
        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
                let currentNode = this.buckets[i].head
                while (currentNode) {
                    hashSetKeys.push(currentNode.key)
                    currentNode = currentNode.nextNode;
                };
            }
        }
        return hashSetKeys;
    };

    

    returnHashSetEntries() {
        const hashSetEntries = [];
        const hashSetKeys = this.returnKeysArray();
        // Add each key to hashSetEntries array
        for (let i = 0;i < hashSetKeys.length; i++) {
            hashSetEntries[i] = hashSetKeys[i]
        }
        return hashSetEntries;

    }
};

export default HashSet;