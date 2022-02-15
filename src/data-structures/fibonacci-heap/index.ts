import {createArrayAndFillWith} from '../../utils';
import {FibonacciNode} from './node';

/**
 * The Fibonacci Heap.
 */
export class FibonacciHeap<T> {
    /** Minimum node - pointer to the root a tree containing the min key. */
    min?: FibonacciNode<T>;
    /** Number of nodes in the entire heap. */
    n = 0;
    /** The root list of the heap. */
    list: Array<FibonacciNode<T>> = [];

    /**
     * Checks if the heap is empty.
     */
    isEmpty(): boolean {
        return this.min == null;
    }

    /**
     * Inserts a new node into a heap.
     * Simply inserts a node into root list.
     * @time O(1)
     * @amortizedComplexity O(1)
     */
    insert(node: FibonacciNode<T>): void {
        if (this.isEmpty()) {
            // Update the pointer to the min node.
            this.min = node;

            // One node pointing to itself from left and right.
            node.left = this.min;
            node.right = this.min;
        } else {
            // Put the node on the left side of min node.
            node.right = this.min!;
            node.left = this.min!.left;
            this.min!.left!.right = node;
            this.min!.left = node;

            // Update the pointer to the min node.
            if (node.key < this.min!.key) {
                this.min = node;
            }
        }

        // Increase the number of nodes.
        this.n++;
    }

    /**
     * Merges two Fibonacci heaps into one.
     * Simply concatenates the root lists of both heaps.
     * @time O(1)
     * @amortizedComplexity O(1)
     */
    union(heap: FibonacciHeap<T>): FibonacciHeap<T> {
        if (!this.isEmpty() && !heap.isEmpty()) {
            const left1 = this.min!.left;
            const left2 = heap.min!.left;

            // Link: ... left2 ↔ this.min ↔ ... ↔ left1 ↔ heap.min ...
            this.min!.left = left2;
            left1!.right = heap.min!;
            heap.min!.left = left1;
            left2!.right = this.min!;
        }

        // Sets the new pointer to min node.
        if (
            this.isEmpty() ||
            (!heap.isEmpty() && heap.min!.key < this.min!.key)
        ) {
            this.min = heap.min;
        }

        // Update the number the new heap.
        this.n = this.n + heap.n;

        return this;
    }

    /**
     * Extracts the min node and returns it.
     * @time O(lg n)
     * @amortizedComplexity O(lg n)
     */
    extractMin(): FibonacciNode<T> | undefined {
        const z = this.min;

        // No min node, return undefined;
        if (!z) return;

        /**
         * // Making a root out of each of the minimum node’s children
         * // and removing the minimum node from the root list.
         * for (each child x of z) {
         *      add x to the root list
         *      x.parent = undefined
         * }
         *
         * remove z from the root list
         */

        if (z === z.right) {
            // z was the only node in the root list.
            // Just delete the pointer to it.
            // Heap is empty now.
            this.min = undefined;
        } else {
            // Point minimum to right sibling of min node.
            this.min = z.right;
            // Consolidates the root list by linking roots of equal
            // degree until at most one root remains of each degree.
            this.consolidate();
        }

        // Updates the total number of nodes.
        this.n--;

        return z;
    }

    /**
     * Consolidates the root list after min extraction.
     * @time O(lg n)
     * @amortizedComplexity O(lg n)
     */
    consolidate() {
        const phi = (1 + Math.sqrt(5)) / 2;
        const upperBound = Math.floor(Math.log(this.n) / Math.log(phi));
        const a = createArrayAndFillWith(upperBound + 1, undefined) as Array<
            FibonacciNode<T> | undefined
        >;

        /**
         * for (each node w in the root list) {
         *      x = w
         *      d = x.degree
         *
         *      while (a[d]) {
         *          y = a[d]
         *
         *          if (x.key > y.key) {
         *              exchange x with y
         *          }
         *
         *          this.heapLink(y, x)
         *
         *          a[d] = undefined
         *          d++;
         *      }
         *
         *      a[d] = x
         * }
         */

        this.min = undefined;

        for (let i = 0; i <= upperBound; i++) {
            if (a[i]) {
                if (!this.min) {
                    /**
                     * create a root list for heap containing just a[i]
                     */

                    this.min = a[i];
                } else {
                    /**
                     * insert a[i] into root list
                     */

                    if (a[i]!.key < this.min.key) {
                        this.min = a[i];
                    }
                }
            }
        }
    }

    /**
     * Remove y from the root list, and make y a child of x.
     * @time O(1)
     * @amortizedComplexity O(1)
     */
    heapLink(x: FibonacciNode<T>, y: FibonacciNode<T>) {
        /**
         * remove y from the root list
         * make y a child of x
         */

        // Increments the degree of node x.
        x.degree++;
        // Clears the mark on node y.
        y.mark = false;
    }

    /**
     * Decreases the key of node.
     * @amortizedComplexity O(1)
     */
    decreaseKey(x: FibonacciNode<T>, k: number): void {
        if (k > x.key) {
            throw new Error('New key is grater than current key!');
        }

        const y = x.parent;

        x.key = k;

        if (y && x.key < y.key) {
            // A min-heap order has been violated.
            this.cut(x, y);
            this.cascadingCut(y);
        }

        if (x.key < this.min!.key) {
            // Nothing to do as min-heap order has not been violated.
            this.min = x;
        }
    }

    /**
     * Cuts the link between the nodes.
     * @time O(1)
     * @amortizedComplexity O(1)
     */
    cut(x: FibonacciNode<T>, y: FibonacciNode<T>): void {
        /**
         * remove x from the child list of y
         * add x to the root list
         */

        y.degree--;

        x.parent = undefined;
        x.mark = false;
    }

    /**
     * Recursively cuts the link between the node and its parent,
     * until it finds either a root or an unmarked node.
     * @amortizedComplexity O(1)
     */
    cascadingCut(y: FibonacciNode<T>): void {
        const z = y.parent;

        if (!z) return;

        if (y.mark === false) {
            y.mark = true;
        } else {
            this.cut(y, z);
            this.cascadingCut(z);
        }
    }

    /**
     * Deletes a node from a heap.
     * @time O(lg n)
     * @amortizedComplexity O(lg n)
     */
    delete(x: FibonacciNode<T>): void {
        this.decreaseKey(x, -Infinity);
        this.extractMin();
    }
}
