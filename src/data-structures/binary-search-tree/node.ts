/**
 * Binary Tree Node CLass.
 */
export class BinarySearchNode<T> {
    key: number;
    value: T;
    parent?: BinarySearchNode<T>;
    left?: BinarySearchNode<T>;
    right?: BinarySearchNode<T>;

    constructor(
        key: number,
        value: T,
        parent?: BinarySearchNode<T>,
        left?: BinarySearchNode<T>,
        right?: BinarySearchNode<T>
    ) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }
}

/**
 * Color of the Reb-Black tree Node.
 */
export enum RedBlackNodeColor {
    RED = 'red',
    BLACK = 'black',
}

/**
 * The most common type of nodes of Binary Tree like trees.
 * [Binary Search Tree, Red-Black Tree]
 */
export interface BinaryNode<T> {
    key: number;
    value: T;
    color?: RedBlackNodeColor;
    parent?: BinaryNode<T>;
    left?: BinaryNode<T>;
    right?: BinaryNode<T>;
}
