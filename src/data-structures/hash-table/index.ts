import { SinglyLinkedList } from '../singly-linked-list';

/**
 * Hash Table Data Structure.
 * Has "m" slots and containes "n" element.
 */
export class HashTable<T> {
    private readonly table = {};

    constructor(private readonly size: number) {}

    /**
     * Inserts the value at the head of the list T[hash(value.key)].
     * @complexity: O(1)
     */
    public insert() {}

    /**
     * Delete the value from the list T[hash(value.key)].
     * @complexity: O(1)
     */
    public delete() {}

    /**
     * Search for an value with key k in list T[hash(k)].
     * @complexity: O(1 + n/m)
     */
    public search() {}
}
