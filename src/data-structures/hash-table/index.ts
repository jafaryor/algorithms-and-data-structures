import {SinglyLinkedList, SinglyLinkedListNode} from '../singly-linked-list';
import {randomFromRange, findClosestBiggerPrimeNumber} from '../../utils';

/**
 * Hash Table Data Structure.
 * Using Universal Hashing Approach.
 * Has "m" slots and containes "n" element.
 */
export class HashTable<T> {
    private a: number;
    private b: number;
    private p: number;
    private itemsCount = 0;
    private readonly table: Table<T> = {};

    constructor(private readonly slotsCount: number) {
        // Select hash function from the Universe of Hash Function.
        this.a = randomFromRange(1, this.slotsCount - 1);
        this.b = randomFromRange(0, this.slotsCount - 1);
        this.p = findClosestBiggerPrimeNumber(slotsCount);
    }

    /**
     * Checks if the hash table empty.
     */
    isEmpty(): boolean {
        return this.itemsCount === 0;
    }

    /**
     * Load Factor - alpha.
     */
    get loadFactor(): number {
        return this.itemsCount / this.slotsCount;
    }

    /**
     * The table size.
     */
    get size() {
        return this.itemsCount;
    }

    /**
     * Inserts the value at the head of the list T[hash(value.key)].
     * @complexity: O(1)
     */
    insert(key: number, value: T) {
        const hash = this.calculateHash(key);
        const list = this.table[hash];

        if (list) {
            list.insert({key, value});
        } else {
            this.table[hash] = new SinglyLinkedList<KeyValueObject<T>>(
                [{key, value}],
                (a: KeyValueObject<T>, b: KeyValueObject<T>) => a.key === b.key,
            );
        }

        this.itemsCount++;
    }

    /**
     * Delete the value from the list T[hash(value.key)].
     * @complexity: O(1 + n/m)
     */
    delete(key: number): T | null {
        const hash = this.calculateHash(key);
        const list = this.table[hash];

        if (list) {
            const removedNode = list.remove({key, value: null});

            if (removedNode) {
                this.itemsCount--;

                return removedNode.value;
            }
        }

        return null;
    }

    /**
     * Search for an value with key k in list T[hash(k)].
     * @complexity: O(1 + n/m)
     */
    search(key: number): HashTableListNode<T> | null {
        const hash = this.calculateHash(key);
        const list = this.table[hash];

        return list && list.search({key, value: null});
    }

    /**
     * Calculates the Hash value of the key.
     */
    private calculateHash(key: number): number {
        return ((this.a * key + this.b) % this.p) % this.slotsCount;
    }
}

/**
 * Key-Value object stored in the linked list.
 */
export interface KeyValueObject<T> {
    key: number;
    value: T | null;
}

/**
 * Hash Table List Node type.
 */
export type HashTableListNode<T> = SinglyLinkedListNode<KeyValueObject<T>>;

/**
 * Hash Table List type.
 */
export type HashTableList<T> = SinglyLinkedList<KeyValueObject<T>>;

/**
 * Hash Table Cell interface.
 */
export interface Table<T> {
    [key: number]: HashTableList<T> | null;
}
