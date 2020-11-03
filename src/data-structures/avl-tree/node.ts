import {BinarySearchNode} from '../binary-search-tree/node';

/**
 * AVL tree node.
 */
export class AvlNode<T> extends BinarySearchNode<T> {
    height: number = 0;
    parent?: AvlNode<T>;
    left?: AvlNode<T>;
    right?: AvlNode<T>;

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
     * The balance factor of a node.
     */
    get balanceFactor(): number {
        return (this.left ? this.left.height : -1) - (this.right ? this.right.height : -1);
    }
}
