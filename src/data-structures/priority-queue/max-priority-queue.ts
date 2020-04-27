import {HeapNode} from '../heap/node';
import {MaxHeap} from '../heap';
import {PriorityQueue} from './base-priority-queue';

/**
 * Max Priority Queue.
 */
export class MaxPriorityQueue<T> extends PriorityQueue<T> {
    protected heap: MaxHeap<T>;

    constructor(nodes: Array<HeapNode<T>>) {
        super();

        this.heap = new MaxHeap(nodes);
    }

    /**
     * Returns max node (root).
     * @complexity O(1)
     */
    get max(): HeapNode<T> {
        return this.heap.peek();
    }

    /**
     * Extracts the max nodes and heapifies the heap.
     * Extracts the root and replace it with the last node and heapifies the tree.
     * @complexity O(lg n)
     */
    extractMax(): HeapNode<T> {
        return this.heap.poll();
    }

    /**
     * Increase the priority of node.
     * @complexity O(lg n)
     */
    increasePriority(index: number, newPriority: number): void {
        // As the node with the higher key is closer to the root (max).
        this.heap.increaseKey(index, newPriority);
    }

    /**
     * Decreases the priority of node.
     * @complexity O(lg n)
     */
    decreasePriority(index: number, newPriority: number): void {
        // As the node with the higher key is closer to the root (max).
        this.heap.decreaseKey(index, newPriority);
    }
}
