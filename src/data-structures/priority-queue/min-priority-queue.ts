import {HeapNode} from '../heap/node';
import {MinHeap} from '../heap';
import {PriorityQueue} from './base-priority-queue';

/**
 * Min Priority Queue.
 */
export class MinPriorityQueue<T> extends PriorityQueue<T> {
    protected heap: MinHeap<T>;

    constructor(nodes: Array<HeapNode<T>>) {
        super();

        this.heap = new MinHeap(nodes);
    }

    /**
     * Return min node (root).
     * @complexity O(1)
     */
    get min(): HeapNode<T> | undefined {
        return this.heap.peek();
    }

    /**
     * Extracts the min nodes and heapifies the heap.
     * Extracts the root and replace it with the last node and heapifies the tree.
     * @complexity O(lg n)
     */
    extractMin(): HeapNode<T> | undefined {
        return this.heap.poll();
    }

    /**
     * Increase the priority of node.
     * @complexity O(lg n)
     */
    increasePriority(index: number, newPriority: number): void {
        // As the node with the lower key is closer to the root (max).
        this.heap.decreaseKey(index, newPriority);
    }

    /**
     * Decreases the priority of node.
     * @complexity O(lg n)
     */
    decreasePriority(index: number, newPriority: number): void {
        // As the node with the lower key is closer to the root (max).
        this.heap.increaseKey(index, newPriority);
    }
}
