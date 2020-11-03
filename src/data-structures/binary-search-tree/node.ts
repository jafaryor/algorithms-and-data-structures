import {BinaryNode} from '../binary-tree/node';

/**
 * Binary Search Tree Node.
 */
export class BinarySearchNode<T> extends BinaryNode<T> {
    constructor(
        key: number,
        value: T,
        parent?: BinarySearchNode<T>,
        left?: BinarySearchNode<T>,
        right?: BinarySearchNode<T>,
    ) {
        super(key, value, parent, left, right);
    }

    /**
     * Return the grandparent.
     */
    get grandparent(): BinarySearchNode<T> | undefined {
        return this.parent?.parent;
    }

    /**
     * Return the sibling.
     */
    get sibling(): BinarySearchNode<T> | undefined {
        return this.parent?.right === this ? this.parent?.left : this.parent?.right;
    }

    /**
     * Return the uncle.
     */
    get uncle(): BinarySearchNode<T> | undefined {
        return this.grandparent?.right === this.parent
            ? this.grandparent?.left
            : this.grandparent?.right;
    }
}
