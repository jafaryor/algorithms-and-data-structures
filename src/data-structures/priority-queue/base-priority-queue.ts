import {MaxHeap, MinHeap} from '../heap';

/**
 * Priority Queue.
 */
export abstract class PriorityQueue {
    protected nodes: number[];
    protected abstract heap: MaxHeap | MinHeap;

    constructor(array: number[]) {
        this.nodes = Array.isArray(array) ? array : [];
    }

    /**
     * Checks if the queue is empty.
     * @complexity O(1)
     */
    isEmpty(): boolean {
        return this.heap.isEmpty();
    }

    /**
     * Inserts item to the queue.
     * @complexity O(lg n)
     */
    insert(node: number) {
        this.heap.add(node);
    }
}
