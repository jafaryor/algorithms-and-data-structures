import * as _ from 'lodash';

/**
 * The B-Tree Node Class.
 */
export class BTreeNode<T> {
    isLeaf: boolean = false;

    /**
     * @param keys - all keys are SORTED in increasing order.
     * @param children - reference to children.
     * @param value - a node satellite data.x
     */
    constructor(
        public keys: number[] = [],
        public children: Array<BTreeNode<T>> = [],
        public parent?: BTreeNode<T>,
        public value?: T,
    ) {
        if (keys.length === 0 && children.length === 0) {
            this.turnToLeaf();
        } else {
            if (keys.length !== children.length + 1) {
                throw new Error (`B-Tree Node: the amount of key (${keys.length} should be equal to amount of children (${children.length}) + 1.`);
            }

            const sortedKeys = keys.sort((a: number, b: number) => a - b);

            if (!_.isEqual(keys, sortedKeys)) {
                throw new Error('B-Tree Node: the keys must be sorted in ascending order!');
            }
        }
    }

    /**
     * Returns the number of keys stored in the node.
     */
    get size(): number {
        return this.keys.length;
    }

    /**
     * Sets the number of key slots available for storing.
     */
    set size(keyCount: number) {
        if (keyCount >= this.keys.length) return;
        
        this.keys = this.keys.slice(0, keyCount);
        this.children = this.children.slice(0, keyCount + 1);
    }

    /**
     * Turns the node into leaf.
     */
    turnToLeaf(): void {
        this.isLeaf = true;
    }

    /**
     * Turns the leaf into node.
     */
    turnToNode(): void {
        this.isLeaf = false;
    }
}