import {MinHeap} from '../heap';
import {PriorityQueue} from './base-priority-queue';

/**
 * Min Priority Queue.
 */
export class MinPriorityQueue extends PriorityQueue {
    protected heap: MinHeap;

    constructor(array: number[]) {
        super(array);

        this.heap = new MinHeap(this.nodes);
    }

    /**
     * Return min node.
     * @complexity O(1)
     */
    get min(): number {
        return this.heap.peek();
    }

    /**
     * Extracts the min nodes and heapifies the heap.
     * @complexity O(lg n)
     */
    extractMin(): number {
        return this.heap.poll();
    }

    /**
     * Decrease the priority to 'newValue' of node with 'index'.
     * @complexity O(lg n)
     * @param index - index of node to decrease the priority
     * @param newValue - new priority
     */
    decreaseAt(index: number, newValue: number): void {
        if (this.nodes[index] < newValue) {
            throw new Error('New passed value is bigger than current value');
        }

        this.nodes[index] = newValue;
        this.heap.heapifyUp(index);
    }
}
