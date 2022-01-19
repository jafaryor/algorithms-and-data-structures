import {swap} from '../../utils';
import {HeapNode} from './node';

/**
 * Binary Heap Base Class.
 * Array representation of the binary heap.
 */
export abstract class BinaryHeap<T> {
    protected nodes: Array<HeapNode<T>> = [];

    constructor(array?: Array<HeapNode<T>>) {
        if (Array.isArray(array) && array.length) {
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
     * Returns the copy of heap nodes.
     */
    getNodes(): Array<HeapNode<T>> {
        return [...this.nodes];
    }

    /**
     * Returns the root node (min/max).
     * @timeO(1)
     */
    peek(): HeapNode<T> {
        if (!this.nodes.length) throw new Error('The Heap is empty!');

        return this.nodes[0];
    }

    /**
     * Removes root node and put last node instead of root.
     * @timeO(lg n)
     */
    poll(): HeapNode<T> {
        if (!this.nodes.length) throw new Error('The Heap is empty!');

        const root = this.nodes[0];

        // Replace root with last node.
        this.swap(0, this.size - 1);

        // Remove last node.
        this.nodes.pop();

        // Heapify from root.
        this.heapifyDown();

        return root;
    }

    /**
     * Adds new node to right-most parent.
     * Heap is populate from left to right.
     * @timeO(lg n)
     */
    add(node: HeapNode<T>): void {
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
        return this.size === 0;
    }

    /**
     * Finds node's index by its value.
     * @timeO(n)
     */
    findIndex(value: T): number | undefined {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].value === value) return i;
        }

        return;
    }

    /**
     * Checks if a node with the certain value exists.
     * @timeO(n)
     */
    includes(value: T): boolean {
        for (const node of this.nodes) {
            if (node.value === value) return true;
        }

        return false;
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
    protected leftChild(index: number): HeapNode<T> {
        return this.nodes[this.leftChildIndex(index)];
    }

    /**
     * Returns right node.
     */
    protected rightChild(index: number): HeapNode<T> {
        return this.nodes[this.rightChildIndex(index)];
    }

    /**
     * Returns parent node.
     */
    protected parent(index: number): HeapNode<T> {
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
     * @timeO(n)
     */
    private build() {
        // Math.floor(this.size / 2) = amount of parent nodes.
        for (let i = Math.floor(this.size / 2); i >= 0; --i) {
            this.heapifyDown(i);
        }
    }

    /**
     * Prints the heap.
     */
    print(): string {
        const output = this.nodes
            .reduce((output: string[], node: HeapNode<T>) => {
                output.push(`[${node.key}, ${node.value}]`);

                return output;
            }, [])
            .join(' | ');

        console.log(output);

        return output;
    }
}
