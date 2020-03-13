import {swap} from '../../utils';
import {BinarySearchTree} from '../binary-search-tree';
import {RedBlackColorEnum as RedBlackNodeColor, RedBlackNode} from './node';

/**
 * The Red-Black Tree implmenetation.
 */
export class RedBlackTree<T> extends BinarySearchTree<T> {
    root: RedBlackNode<T> | undefined;

    constructor() {
        super();
        this.root = undefined;
    }

    /**
     * Rotates the node left.
     * @complexity O(1)
     */
    leftRotate(node: RedBlackNode<T>) {
        const right = node.right as RedBlackNode<T>;

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
    rightRotate(node: RedBlackNode<T>) {
        const left = node.left as RedBlackNode<T>;

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

    /**
     * Recursive insert.
     * @complexity O(lg n)
     */
    insert(newNode: RedBlackNode<T>) {
        this.super.insert(newNode);

        newNode.color = RedBlackNodeColor.RED;

        this.insertFixup(newNode);
    }

    /**
     * Iterative insert.
     * @complexity O(lg n)
     */
    iterativeInsert(newNode: RedBlackNode<T>) {
        this.super.iterativeInsert(newNode);

        newNode.color = RedBlackNodeColor.RED;

        this.insertFixup(newNode);
    }

    /**
     * Restores the reb-black tree properties after insertion.
     */
    insertFixup(newNode: RedBlackNode<T>) {
        let node = newNode as RedBlackNode<T>;
        let parent: RedBlackNode<T>;
        let grandParent: RedBlackNode<T>;
        let uncle: RedBlackNode<T>;

        while (node !== this.root
            && node.color !== RedBlackNodeColor.BLACK
            && node.parent.color === RedBlackNodeColor.RED
        ) {
            parent = node.parent;
            grandParent = parent.parent;

            // Case A: parent is left child of grandparent.
            if (grandParent.left === parent) {
                uncle = grandParent.right;

                // Case 1: The uncle is RED.
                if (uncle && uncle.color === RedBlackNodeColor.RED) {
                    // Repaint.
                    grandParent.color = RedBlackNodeColor.RED;
                    parent.color = RedBlackNodeColor.BLACK;
                    uncle.color = RedBlackNodeColor.BLACK;
                    node = grandParent;
                } else {
                    // Case 2: node is right child.
                    if (parent.right === node) {
                        // Rotate left.
                        this.leftRotate(parent);
                        node = parent;
                        parent = node.parent;
                    }

                    // Case 3: node is left child.
                    // Rotate right.
                    this.rightRotate(grandParent);
                    swap(parent.color, grandParent.color);
                    node = parent;
                }
            } else {
                // Case B: Parent is right child of grandparent.
                uncle = grandParent.left;

                // Case 1: uncle is also RED.
                if (uncle && uncle.color === RedBlackNodeColor.RED) {
                    // Repaint.
                    grandParent.color = RedBlackNodeColor.RED;
                    parent.color = RedBlackNodeColor.BLACK;
                    uncle.color = RedBlackNodeColor.BLACK;
                    node = grandParent;
                } else {
                    // Case 2: node is left child.
                    if (uncle && uncle.color === RedBlackNodeColor.RED) {
                        // Rotate right.
                        this.rightRotate(parent);
                        node = parent;
                        parent = node.parent;
                    }

                    // Case 3: node is right child.
                    // Rotate left.
                    this.leftRotate(grandParent);
                    swap(parent.color, grandParent.color);
                    node = parent;
                }
            }
        }

        this.root.color = RedBlackNodeColor.BLACK;
    }
}

// https://www.geeksforgeeks.org/c-program-red-black-tree-insertion/
