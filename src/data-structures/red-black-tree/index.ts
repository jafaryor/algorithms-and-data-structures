import {BinarySearchTree} from '../binary-search-tree';
import {BinaryNode} from '../binary-search-tree/node';

/**
 * The Red-Black Tree implmenetation.
 */
export class RedBlackTree<T> extends BinarySearchTree {
    constructor() {
        super();
    }

    /**
     * Rotates the node left.
     * @complexity O(1)
     */
    leftRotate(node: BinaryNode<T>) {
        const right = node.right as BinaryNode<T>;

        // Turn the left subtree of "right" into right subtree of "node".
        node.right = right.left;
        if (right.left != null) {
            right.left.parent = node;
        }

        // Turn the parent of "node" into parent of "right".
        right.parent = node.parent;
        if (node.parent == null) {
            this.root = right;
        } else if (node === node.parent.left) {
            node.parent.left = right;
        } else {
            node.parent.right = right;
        }

        // Turn the "node" into left subtree of "right".
        right.left = node;
        node.parent = right;
    }

    /**
     * Rotates the node right.
     * @complexity O(1)
     */
    rightRotate(node: BinaryNode<T>) {
        const left = node.left as BinaryNode<T>;

        // Turn the right subtree of "left" into left subtree of "node".
        node.left = left.right;
        if (left.right != null) {
            left.right.parent = node;
        }

        // Turn the parent of "node" into parent of "left".
        left.parent = node.parent;
        if (node.parent == null) {
            this.root = left;
        } else if (node === node.parent.right) {
            node.parent.right = left;
        } else {
            node.parent.left = left;
        }

        // Turn the "node" into right subtree of "left".
        left.right = node;
        node.parent = left;
    }
}
