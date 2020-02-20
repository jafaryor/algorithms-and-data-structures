import { MaxHeap } from '../heap';
import { PriorityQueue } from './base-priority-queue';

export class MaxPriorityQueue extends PriorityQueue {
    protected heap: MaxHeap;

    constructor(array: number[]) {
        super(array);

        this.heap = new MaxHeap(this.nodes);
    }

    /**
     * returns max node
     */
    public get max(): number {
        return this.heap.peek();
    }

    /**
     * exracts the max nodes and heapifies the heap
     * @complexity O(logn)
     */
    public extractMax(): number {
        return this.heap.poll();
    }

    /**
     * increase the priority to 'newValue' of node with index 'index'
     * @complexity O(logn)
     * @param index - index of node to increase the priority
     * @param newValue - new priority
     */
    public increaseAt(index: number, newValue: number): void {
        if (this.nodes[index] > newValue) throw new Error('New passed value is less than current value');

        this.nodes[index] = newValue;
        this.heap.heapifyUp(index);
    }
}
