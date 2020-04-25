import {MaxHeap} from '../heap';
import {PriorityQueue} from './base-priority-queue';

/**
 * Max Priority Queue.
 */
export class MaxPriorityQueue extends PriorityQueue {
    protected heap: MaxHeap;

    constructor(array: number[]) {
        super(array);

        this.heap = new MaxHeap(this.nodes);
    }

    /**
     * Returns max node.
     * @complexity O(1)
     */
    get max(): number {
        return this.heap.peek();
    }

    /**
     * Extracts the max nodes and heapifies the heap.
     * @complexity O(lg n)
     */
    extractMax(): number {
        return this.heap.poll();
    }

    /**
     * Increase the priority to 'newValue' of node with 'index'.
     * @complexity O(lg n)
     * @param index - index of node to increase the priority
     * @param newValue - new priority
     */
    increaseAt(index: number, newValue: number): void {
        if (this.nodes[index] > newValue) {
            throw new Error('New passed value is less than current value');
        }

        this.nodes[index] = newValue;
        this.heap.heapifyUp(index);
    }
}
