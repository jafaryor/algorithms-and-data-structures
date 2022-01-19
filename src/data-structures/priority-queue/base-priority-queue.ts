import {HeapNode} from '../heap/node';
import {MaxHeap, MinHeap} from '../heap';

/**
 * Priority Queue.
 */
export abstract class PriorityQueue<T> {
    protected abstract heap: MaxHeap<T> | MinHeap<T>;

    /**
     * Checks if the queue is empty.
     * @timeO(1)
     */
    isEmpty(): boolean {
        return this.heap.isEmpty();
    }

    /**
     * Inserts item to the queue.
     * @timeO(lg n)
     */
    insert(node: HeapNode<T>) {
        this.heap.add(node);
    }

    /**
     * Returns the heap nodes.
     * Note: te method is used for testing purposes only.
     */
    getHeapNodes(): Array<HeapNode<T>> {
        return this.heap.getNodes();
    }

    /**
     * Finds node's index by its value.
     * @timeO(n)
     */
    findIndex(value: T): number | undefined {
        return this.heap.findIndex(value);
    }

    /**
     * Checks if a node with the certain value exists.
     * @timeO(n)
     */
    includes(value: T): boolean {
        return this.heap.includes(value);
    }

    /**
     * Prints the priority queue.
     */
    print(): string {
        return this.heap.print();
    }
}
