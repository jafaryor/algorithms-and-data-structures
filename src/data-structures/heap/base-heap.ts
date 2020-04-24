import {swap} from '../../utils';

/**
 * Binary Heap Base Class.
 * Array representation of the binary heap.
 */
export abstract class BinaryHeap {
    protected nodes: number[] = [];

    constructor(array?: number[]) {
        if (Array.isArray(array)) {
            // use the allocated space (array) to spare space.
            this.nodes = array;
            this.build();
        }
    }

    abstract heapifyUp(index?: number): void;
    abstract heapifyDown(index?: number): void;

    /**
     * Returns size of heap - nodes' array length.
     */
    get size(): number {
        return this.nodes.length;
    }

    /**
     * Returns the root node (min/max).
     */
    peek(): number {
        if (!this.nodes.length) throw new Error('The Heap is empty!');

        return this.nodes[0];
    }

    /**
     * Removes root node and put last note instead of root.
     * @complexity O(lg n)
     */
    poll(): number {
        if (!this.nodes.length) throw new Error('The Heap is empty!');

        const root = this.nodes[0];
        // replace root with last node
        this.swap(0, this.size - 1);
        // remove last node
        this.nodes.pop();
        // heapify from root
        this.heapifyDown();

        return root;
    }

    /**
     * Adds new node to right-most parent.
     * Heap is populate from left to right.
     * @complexity O(lg n)
     */
    add(node: number): void {
        this.nodes.push(node);
        this.heapifyUp();
    }

    /**
     * Gets rid of all nodes.
     */
    clear(): void {
        this.nodes = [];
    }

    /**
     * Checks if the haep is empty.
     */
    isEmpty(): boolean {
        return this.size > 0;
    }

    /**
     * Swaps two nodes.
     */
    protected swap(firstIndex: number, secondIndex: number): void {
        swap(this.nodes, firstIndex, secondIndex);
    }

    /**
     * Returns left index.
     */
    protected leftChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 1;
    }

    /**
     * Returns right index.
     */
    protected rightChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 2;
    }

    /**
     * Returns parent index.
     */
    protected parentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }

    /**
     * Returns left node.
     */
    protected leftChild(index: number): number {
        return this.nodes[this.leftChildIndex(index)];
    }

    /**
     * Returns right node.
     */
    protected rightChild(index: number): number {
        return this.nodes[this.rightChildIndex(index)];
    }

    /**
     * Returns parent node.
     */
    protected parent(index: number): number {
        return this.nodes[this.parentIndex(index)];
    }

    /**
     * Check if left node exists.
     */
    protected hasLeftChild(index: number): boolean {
        return this.leftChildIndex(index) < this.size;
    }

    /**
     * Check if right node exists.
     */
    protected hasRightChild(index: number): boolean {
        return this.rightChildIndex(index) < this.size;
    }

    /**
     * Check if parent node exists.
     */
    protected hasParent(index: number): boolean {
        return this.parentIndex(index) >= 0;
    }

    /**
     * Build min/max heap from provided array.
     * @complexity O(n)
     */
    private build() {
        // Math.floor(this.size / 2) = amount of parent nodes.
        for (let i = Math.floor(this.size / 2); i >= 0; --i) {
            this.heapifyDown(i);
        }
    }
}
