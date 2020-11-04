import {BinarySearchNode} from '../binary-search-tree/node';

/**
 * Red-Black Tree Node.
 */
export class RedBlackNode<T> extends BinarySearchNode<T> {
    color: RedBlackNodeColor;
    parent?: RedBlackNode<T>;
    left?: RedBlackNode<T>;
    right?: RedBlackNode<T>;

    constructor(
        key: number,
        value: T,
        color: RedBlackNodeColor = RedBlackNodeColor.BLACK,
        parent?: RedBlackNode<T>,
        left?: RedBlackNode<T>,
        right?: RedBlackNode<T>,
    ) {
        super(key, value, parent, left, right);

        this.color = color;
    }

    /**
     * Return the grandparent.
     */
    get grandparent(): RedBlackNode<T> | undefined {
        return this.parent?.parent;
    }

    /**
     * Return the sibling.
     */
    get sibling(): RedBlackNode<T> | undefined {
        return this.parent?.right === this
            ? this.parent?.left
            : this.parent?.right;
    }

    /**
     * Return the uncle.
     */
    get uncle(): RedBlackNode<T> | undefined {
        return this.grandparent?.right === this.parent
            ? this.grandparent?.left
            : this.grandparent?.right;
    }

    /**
     * Checks if the node is red.
     */
    isRed(): boolean {
        return this.color === RedBlackNodeColor.RED;
    }

    /**
     * Checks if the node is black.
     */
    isBlack(): boolean {
        return this.color === RedBlackNodeColor.BLACK;
    }
}

/**
 * Color of the Reb-Black tree Node.
 */
export enum RedBlackNodeColor {
    RED = 'red',
    BLACK = 'black',
}
