import {HeapNode} from './node';
import {BinaryHeap} from './base-heap';

/**
 * MinHeap is a heap where key of each parent node
 * is less than the key of their children nodes.
 */
export class MinHeap<T> extends BinaryHeap<T> {
    constructor(array?: Array<HeapNode<T>>) {
        super(array);
    }

    /**
     * Moves last node to its proper place
     * (as much higher as it is possible),
     * as max node should be at the root.
     * @complexity O(h) = O(lg n)
     */
    heapifyUp(index: number = this.size - 1): void {
        for (
            let i = index;
            this.hasParent(i) && this.parent(i).key > this.nodes[i].key;
            i = this.parentIndex(i)
        ) {
            this.swap(this.parentIndex(i), i);
        }
    }

    /**
     * Moves small root node to its proper place,
     * so we will have max node at the root.
     * @complexity O(h) = O(lg n)
     */
    heapifyDown(index: number = 0): void {
        let i: number = index;
        let smallestChildIndex: number;

        while (this.hasLeftChild(i)) {
            // take min node between left and right children
            smallestChildIndex =
                this.hasRightChild(i) && this.rightChild(i).key < this.leftChild(i).key
                    ? this.rightChildIndex(i)
                    : this.leftChildIndex(i);

            if (this.nodes[i].key < this.nodes[smallestChildIndex].key) {
                // parent node is smaller than its smaller child
                break;
            } else {
                // swap smaller child with parent
                this.swap(i, smallestChildIndex);
            }

            i = smallestChildIndex;
        }
    }

    // The following methods used only in Priority Queue implementation.

    /**
     * Increase the key of a node.
     * Which means the node should get closer to the root (min).
     * @complexity O(lg n)
     */
    increaseKey(index: number, newKey: number): void {
        const node = this.nodes[index];

        if (newKey < node.key) {
            throw new Error('New key should be greater than current value.');
        }

        node.key = newKey;
        this.heapifyDown(index);
    }

    /**
     * Decrease the key of a node.
     * Which means the node should get farther from the root (min).
     * @complexity O(lg n)
     */
    decreaseKey(index: number, newKey: number): void {
        const node = this.nodes[index];

        if (newKey > node.key) {
            throw new Error('New key should be less than current key.');
        }

        node.key = newKey;
        this.heapifyUp(index);
    }
}
