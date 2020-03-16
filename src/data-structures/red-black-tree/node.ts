import {BinarySearchNode, RedBlackNodeColor} from '../binary-search-tree/node';

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
        right?: RedBlackNode<T>
    ) {
        super(key, value, parent, left, right);

        this.color = color;
    }
}
