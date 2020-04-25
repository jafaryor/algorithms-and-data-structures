/**
 * Heap Node.
 */
export class HeapNode<T> {
    key: number;
    value: T;

    constructor(key: number, value: T) {
        this.key = key;
        this.value = value;
    }
}
