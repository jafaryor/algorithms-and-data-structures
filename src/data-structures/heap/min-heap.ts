import { BinaryHeap } from './heap';

// MinHeap is a heap where each parent node is less than their children
export class MinHeap extends BinaryHeap {
    constructor(array?: number[]) {
        super(array);
    }

    /**
     * moves last node to its proper place (as much higher as it is possible),
     * as max node should be at the root
     * @complexity: O(h) = O(logn)
     */
    public heapifyUp(): void {
        for (let i = this.size - 1; this.hasParent(i) && this.parent(i) > this.nodes[i]; i = this.parentIndex(i)) {
            this.swap(this.parentIndex(i), i);
        }
    }

    /**
     * moves small root node to its proper place,
     * so we will have max node at the root
     * @complexity: O(h) = O(logn)
     * @param i - parent index to start from
     */
    public heapifyDown(i: number = 0): void {
        let smallestChildIndex: number;

        while (this.hasLeftChild(i)) {
            // take min node between left and right children
            smallestChildIndex =
                this.hasRightChild(i) && this.rightChild(i) < this.leftChild(i)
                    ? this.rightChildIndex(i)
                    : this.leftChildIndex(i);

            if (this.nodes[i] < this.nodes[smallestChildIndex]) {
                // parent node is smaller than its smaller child
                break;
            } else {
                // swap smaller child with parent
                this.swap(i, smallestChildIndex);
            }

            i = smallestChildIndex;
        }
    }
}
