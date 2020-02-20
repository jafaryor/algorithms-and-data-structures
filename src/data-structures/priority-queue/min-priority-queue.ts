import { MinHeap } from '../heap';
import { PriorityQueue } from './base-priority-queue';

export class MinPriorityQueue extends PriorityQueue {
    protected heap: MinHeap;

    constructor(array: number[]) {
        super(array);

        this.heap = new MinHeap(this.nodes);
    }

    /**
     * return min node
     */
    public get min(): number {
        return this.heap.peek();
    }

    /**
     * exracts the min nodes and heapifies the heap
     */
    public extractMin(): number {
        return this.heap.poll();
    }

    /**
     * decrease the priority to 'newValue' of node with index 'index'
     * @param index - index of node to decrease the priority
     * @param newValue - new priority
     */
    public decreaseAt(index: number, newValue: number): void {
        if (this.nodes[index] < newValue) throw new Error('New passed value is bigger than current value');

        this.nodes[index] = newValue;
        this.heap.heapifyUp(index);
    }
}
