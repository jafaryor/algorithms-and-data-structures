import {KeyValueObject} from '../hash-table';
import {findClosestSmallerPrimeNumber} from '../../utils';

/**
 * Open Addressing Hash Table.
 */
export class OpenAddressHashTable<T> {
    private prime: number;
    private itemsCount = 0;
    private readonly table: OpenAddressTable<T> = {};

    constructor(private readonly capacity: number) {
        this.prime = findClosestSmallerPrimeNumber(capacity);
    }

    /**
     * The table size.
     */
    get size() {
        return this.itemsCount;
    }

    /**
     * Checks if the hash table empty.
     */
    isEmpty() {
        return this.itemsCount === 0;
    }

    /**
     * Checks if the table is full.
     */
    isFull() {
        return this.itemsCount === this.capacity;
    }

    /**
     * Insert the key/value pair to the table.
     * @time O(1/(1-n/m))
     * @note: under the assumption of uniform hashing.
     */
    insert(key: number, value: T) {
        let i = 0;
        let hash: number;
        let slot: KeyValueObject<T>;

        if (this.isFull()) {
            throw new Error('The Hash Table is full!');
        }

        // Find the next free slot.
        do {
            hash = this.calculateHash(key, i++);
            slot = this.table[hash];
        } while (slot && slot.key !== key && slot.key !== -1);

        // The free slot if found.
        if (!this.table[hash] || this.table[hash].key === -1) {
            this.itemsCount++;
            this.table[hash] = {key, value};
        }
    }

    /**
     * Delete the node with @key.
     * @time O(1/(1-n/m))
     * @note: under the assumption of uniform hashing.
     */
    delete(key: number): T | null {
        let i = 0;
        let hash: number;
        let slot: KeyValueObject<T>;

        do {
            hash = this.calculateHash(key, i++);
            slot = this.table[hash];

            // Node is found.
            if (slot && slot.key === key) {
                this.table[hash] = {key: -1, value: null};
                this.itemsCount--;

                return slot.value;
            }
        } while (slot);

        return null;
    }

    /**
     * Search the node with key equal to @key in the table.
     * @time O(1/(1-n/m))
     * @note: under the assumption of uniform hashing.
     */
    search(key: number): T | null {
        let i = 0;
        let counter = 0;
        let hash: number;
        let slot: KeyValueObject<T>;

        do {
            hash = this.calculateHash(key, i++);
            slot = this.table[hash];

            // Node is found.
            if (slot && slot.key === key) return slot.value;
        } while (this.table[hash] && counter++ <= this.capacity); // to avoid inifinite loop.

        return null;
    }

    /**
     * Double-Hashing Probing.
     */
    private calculateHash(key: number, i: number): number {
        const hash01 = key % this.capacity;
        const hash02 = this.prime - (key % this.prime);

        return (hash01 + i * hash02) % this.capacity;
    }
}

/**
 * Open Adress Hash Table Cell interface.
 */
export interface OpenAddressTable<T> {
    [key: number]: KeyValueObject<T>;
}
