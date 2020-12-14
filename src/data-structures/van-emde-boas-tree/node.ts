/**
 * The van Emde Boas Tree Node.
 * @note
 * A leaf (node with 2 nodes) has no summary and cluster attributes.
 * A leaf's elements can be determined from its min and max attributes.
 * In a vEB tree with no elements, min and max are undefined.
 */
export class VEBNode {
    // The index of min element within the sub-tree.
    min?: number;
    // The index of max element within the sub-tree.
    max?: number;

    constructor(
        // The total number in subtree.
        public size: number,
        // A summary of its clusters.
        public summary?: VEBNode,
        // The reference to underlying clusters.
        public cluster?: VEBNode[],
    ) {}

    /**
     * Checks if the node is leaf i.e. contains only two bits.
     */
    get isLeaf(): boolean {
        return this.size === MIN_UNIVERSE_SIZE;
    }

    /**
     * Checks if the node is empty.
     * If the node doesn't have neither mn nor max, it is empty.
     */
    get isEmpty(): boolean {
        return this.min == null;
    }

    /**
     * Checks if the node has only one element.
     */
    get hasSingeElement(): boolean {
        return this.min === this.max;
    }
}

/**
 * The number of bit is the smallest possible universe.
 */
const MIN_UNIVERSE_SIZE = 2;

