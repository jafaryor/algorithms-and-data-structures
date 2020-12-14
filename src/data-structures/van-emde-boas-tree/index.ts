import { VEBNode } from "./node";


/**
 * The van Emde Boas Tree.
 * @note
 * each operation assumes that a key is: 0 <= key < node.size
 * assumes that there is no duplicate keys
 * assumes that universe size is any exact power of 2
 */
export class VEBTree {
    root: VEBNode;
    upperSquareRoot: number;
    lowerSquareRoot: number;

    constructor (universeSize: number) {
        this.root = new VEBNode(universeSize);

        this.upperSquareRoot = 2^(Math.ceil(Math.log2(this.root.size) / 2));
        this.lowerSquareRoot = 2^(Math.floor(Math.log2(this.root.size) / 2));
    }

    /**
     * The cluster number where the key is located.
     * @complexity O(1)
     */
    high(key: number): number {
        return Math.floor(key / this.upperSquareRoot);
    }

    /**
     * The key's position inside the cluster.
     * @complexity O(1)
     */
    low(key: number): number {
        return key % this.lowerSquareRoot;
    }

    /**
     * Returns the key/index from the array of bits.
     * It essentially gives a value using its coordinates.
     * @complexity O(1)
     */
    index(high: number, low: number): number {
        return high * this.lowerSquareRoot + low;
    }

    /**
     * Return the min element of tree.
     * @complexity O(1)
     */
    min(node: VEBNode = this.root): number | undefined {
        return node.min;
    }

    /**
     * Return the max element of tree.
     * @complexity O(1)
     */
    max(node: VEBNode = this.root): number | undefined {
        return node.max;
    }

    /**
     * Checks whether a key is in the set.
     * @complexity O(lg lg u)
     */
    member(key: number, node: VEBNode = this.root): boolean {
        // Checks if key is within the subtree.
        if (key === node.min || key === node.max) {
            // The key is found.
            return true;
        } else if (node.isLeaf) {
            // The leaf is reached. Nothing else to search.
            return false;
        } else {
            // Keep searching
            return this.member(this.low(key), node.cluster![this.high(key)]);
        }
    }

    /**
     * Returns the smallest element that is greater than element.
     * @complexity O(lg lg u)
     */
    successor(key: number, node: VEBNode = this.root): number | undefined {
        if (node.isLeaf) {
            // The only way that element can have a successor within
            // a leaf, is when element is 0 and "node.max" is 1.
            if (key === 0 && node.max === 1) return 1;
            // No successor.
            else return undefined;
        } else if (node.min && key < node.min) {
            //Successor is found within the node.
            return node.min;
        } else {
            // The max from the cluster the element belongs to.
            const maxLow = this.max(node.cluster![this.high(key)]);

            // element’s successor lies within its cluster if and only if element
            // is strictly less than the max attribute of its cluster.
            if (maxLow && this.low(key) < maxLow) {
                // Search for a successor within "node"'s cluster.
                const offset = this.successor(key, node.cluster![this.high(key)]);

                // Return the element of successor.
                return this.index(this.high(key), offset!);
            } else {
                // Number of the next nonempty cluster, using the summary information to find it.
                const successorCluster = this.successor(this.high(key), node.summary);

                if (successorCluster) {
                    // Take the first element within the cluster.
                    const offset = this.min(node.cluster![successorCluster]);

                    // Return the element of successor.
                    return this.index(successorCluster, offset!);
                }

                // All succeeding clusters are empty.
                return undefined;
            }
        }
    }

    /**
     * Returns the largest element that is smaller than element.
     * @complexity O(lg lg u)
     */
    predecessor(key: number, node: VEBNode = this.root): number | undefined {
        if (node.isEmpty) {
            if (key === 1 && node.min === 0) return 0;
            else return undefined;
        } else if (node.max && key > node.max) {
            return node.max;
        } else {
            const minLow = this.min(node.cluster![this.high(key)]);

            if (minLow && this.low(key) > minLow) {
                const offset = this.predecessor(this.low(key), node.cluster![this.high(key)]);

                return this.index(this.high(key), offset!);
            } else {
                const predecessorCluster = this.predecessor(this.high(key), node.summary);

                if (!predecessorCluster) {
                    // Checks if element's predecessor, if it exits,
                    // does not reside in element's cluster.
                    if (node.min && key > node.min) return node.min;
                    else return undefined;
                } else {
                    const offset = this.max(node.cluster![predecessorCluster]);

                    return this.index(predecessorCluster, offset!);
                }
            }
        }
    }

    /**
     * Insert an element into a tree.
     * @complexity O(lg lg u)
     */
    insert(key: number, node: VEBNode = this.root): void {
        if (node.isEmpty) {
            this.emptyTreeInset(key, node);
        } else {
            if (key < node.min!) {
                const temp = key;

                // Makes element a new min.
                key = node.min!;
                node.min = temp;
            }

            // Checks if the node is not a leaf.
            if (node.size > 2) {
                if (node.cluster![this.high(key)].isEmpty) {
                    this.insert(this.high(key), node.summary);
                    this.emptyTreeInset(this.low(key), node.cluster![this.high(key)]);
                } else {
                    this.insert(this.low(key), node.cluster![this.high(key)]);
                    // Don't need to update the summary, since element's cluster
                    // number is already a member of the summary.
                }
            }

            if (key > node.max!) {
                // Makes element a new max.
                node.max = key;
            }
        }
    }

    /**
     * Inserts an element into an empty tree.
     * @complexity O(1)
     */
    private emptyTreeInset(key: number, node: VEBNode): void {
        node.min = key;
        node.max = key;
    }

    /**
     * Deletes an element from tree.
     * @note assumes that element is a member of tree.
     */
    delete(key: number, node: VEBNode = this.root): void {
        if (node.hasSingeElement) {
            node.min = undefined;
            node.max = undefined;
        } else if (node.isLeaf) {
            node.min = (key === 0) ? 1 : 0;
            node.max = node.min;
        } else {
            if (key === node.min) {
                // Number of the cluster that contains the lowest element other than min.
                const firstCluster = this.min(node.summary)!;

                // Sets element to the value of the lowest element in that cluster.
                key = this.index(firstCluster, this.min(node.cluster![firstCluster])!);
                // Makes the element a new min.
                node.min = key;
            }

            // Deletes element from its cluster.
            this.delete(this.low(key), node.cluster![this.high(key)]);

            // Checks if that cluster becomes empty after deletion.
            if (node.cluster![this.high(key)].isEmpty) {
                // Deletes the cluster number from the summary.
                this.delete(this.high(key), node.summary);

                // Checks if we are deleting the max in node.
                if (key === node.max) {
                    // Number of the highest-numbered nonempty cluster.
                    const summaryMax = this.max(node.summary);

                    if (!summaryMax) {
                        // No element other than min is left.
                        node.max = node.min;
                    } else {
                        // Sets max to the maximum element in the highest-numbered cluster.
                        node.max = this.index(summaryMax, this.max(node.cluster![summaryMax])!);
                    }
                }
            } else if (key === node.max) {
                // The cluster did not become empty after deletion.
                // We don't need to update the summary in this case.

                // Updates the node's max.
                node.max = this.index(this.high(key), this.max(node.cluster![this.high(key)])!);
            }
        }
    }

    /**
     * Builds the vEB tree from a universe of elements.
     */
    private build(universe: number[]) {
        // const universeSize = universe.length;
        // TODO: Implement it.
        return universe;
    }
}
