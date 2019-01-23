import { IKeyValueObject } from '../hash-table';

/**
 * Open Adressing Hash Table.
 */
export class OpenAddressHashTable<T> {
    private itemsCount = 0;
    private readonly table: ITable<T> = {};

    constructor(private readonly capacity: number) {}

    /**
     * The table size.
     */
    public get size() {
        return this.itemsCount;
    }

    /**
     * Checks if the hash table empty.
     */
    public isEmpty() {
        return this.itemsCount === 0;
    }

    /**
     * Insert the key/value pair to the table.
     */
    public insert(key: number, value: T) {
        let i = 0;
        let hash: number;

        // Find the next free slot.
        do {
            hash = this.calculateHash(key, i++);
        } while (this.table[hash] && this.table[hash].key !== key && this.table[hash].key !== -1);

        // The free slot if found.
        if (!this.table[hash] || this.table[hash].key === -1) {
            this.itemsCount++;
            this.table[hash] = { key, value };
        }
    }

    /**
     * Delete the node with @key.
     */
    public delete(key: number): T | null {
        let i = 0;
        let hash: number;

        do {
            hash = this.calculateHash(key, i++);

            // Node is found.
            if (this.table[hash].key === key) {
                const temp = this.table[hash];

                this.table[hash] = { key: -1, value: null };
                this.itemsCount--;

                return temp.value;
            }
        } while (this.table[hash]);

        return null;
    }

    /**
     * Search the node with key equal to @key in the table.
     */
    public search(key: number): T | null {
        let i = 0;
        let counter = 0;
        let hash: number;

        do {
            hash = this.calculateHash(key, i++);

            // Node is found.
            if (this.table[hash].key === key) return this.table[hash].value;
        } while (this.table[hash] && counter++ <= this.capacity); // to avoid inifinite loop.

        return null;
    }

    /**
     * Linear Probing.
     */
    private calculateHash(key: number, i: number): number {
        const hash = key % this.capacity;

        return (hash + i) % this.capacity;
    }
}

/**
 * Open Adress Hash Table Cell interface.
 */
export interface ITable<T> {
    [key: number]: IKeyValueObject<T>;
}
