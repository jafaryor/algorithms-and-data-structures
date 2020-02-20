import { MaxHeap, MinHeap } from '../heap';

export abstract class PriorityQueue {
    protected nodes: number[];
    protected abstract heap: MaxHeap | MinHeap;

    constructor(array: number[]) {
        this.nodes = Array.isArray(array) ? array : [];
    }

    /**
     * checks if the queue is empty
     */
    public isEmpty(): boolean {
        return this.heap.isEmpty();
    }

    /**
     * adds item to the queue
     * @complexity: O(logn)
     * @param node
     */
    public insert(node: number) {
        this.heap.add(node);
    }
}
