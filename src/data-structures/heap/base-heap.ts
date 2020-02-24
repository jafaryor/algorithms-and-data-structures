import { swap } from '../../utils';

export abstract class BinaryHeap {
    protected nodes: number[] = [];

    // returns size of heap - nodes' array length
    get size(): number {
        return this.nodes.length;
    }

    constructor(array?: number[]) {
        if (Array.isArray(array)) {
            // use the allocated space (array) to spare space
            this.nodes = array;
            this.build();
        }
    }

    // abstract methods are defined in derived classes
    public abstract heapifyUp(index?: number): void;
    public abstract heapifyDown(index?: number): void;

    // returns the root node (min/max)
    public peek(): number {
        if (!this.nodes.length) throw new Error('The Heap is empty!');

        return this.nodes[0];
    }

    // removes root node and put last note instead of root
    // @complexity: O(logn)
    public poll(): number {
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

    // adds new node to right-most parent. Heap is populate from left to right.
    // @complexity: O(logn)
    public add(node: number): void {
        this.nodes.push(node);
        this.heapifyUp();
    }

    // gets rid of all nodes
    public clear(): void {
        this.nodes = [];
    }

    // tells if the haep is empty
    public isEmpty(): boolean {
        return this.size > 0;
    }

    // swaps two nodes
    protected swap(firstIndex: number, secondIndex: number): void {
        swap(this.nodes, firstIndex, secondIndex);
    }

    // returns left index
    protected leftChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 1;
    }
    // returns right index
    protected rightChildIndex(parentIndex: number): number {
        return 2 * parentIndex + 2;
    }
    // returns parent index
    protected parentIndex(childIndex: number): number {
        return Math.floor((childIndex - 1) / 2);
    }

    // returns left node
    protected leftChild(index: number): number {
        return this.nodes[this.leftChildIndex(index)];
    }
    // returns right node
    protected rightChild(index: number): number {
        return this.nodes[this.rightChildIndex(index)];
    }
    // returns parent node
    protected parent(index: number): number {
        return this.nodes[this.parentIndex(index)];
    }

    // check if left node exists
    protected hasLeftChild(index: number): boolean {
        return this.leftChildIndex(index) < this.size;
    }
    // check if right node exists
    protected hasRightChild(index: number): boolean {
        return this.rightChildIndex(index) < this.size;
    }
    // check if parent node exists
    protected hasParent(index: number): boolean {
        return this.parentIndex(index) >= 0;
    }

    // build min/max heap from provided array
    // @complexity: O(n)
    private build() {
        // Math.floor(this.size / 2) = amount of parent nodes
        for (let i = Math.floor(this.size / 2); i >= 0; --i) {
            this.heapifyDown(i);
        }
    }
}
