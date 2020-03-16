import {BinarySearchTree} from '../binary-search-tree';
import {RedBlackNodeColor} from '../binary-search-tree/node';
import {RedBlackNode} from './node';

/**
 * The Red-Black Tree implementation.
 */
export class RedBlackTree<T> extends BinarySearchTree<T> {
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
        super.insert(newNode);

        newNode.color = RedBlackNodeColor.RED;

        this.insertFixup(newNode);
    }

    /**
     * Iterative insert.
     * @complexity O(lg n)
     */
    iterativeInsert(newNode: RedBlackNode<T>) {
        super.iterativeInsert(newNode);

        newNode.color = RedBlackNodeColor.RED;

        this.insertFixup(newNode);
    }

    /**
     * Removes the node from the tree.
     * @complexity O(h) -> [because of the "successor" method]
     */
    remove(node: RedBlackNode<T>): void {
        let color = node.color;
        let fixupPointer: RedBlackNode<T> | undefined;

        if (!node.left) {
            // A node has no left child.
            fixupPointer = node.right;
            this.transplant(node, node.right);
        } else if (!node.right) {
            // A node has left child, but no right child.
            fixupPointer = node.left;
            this.transplant(node, node.left);
        } else {
            // A node has both children.
            const successor = this.successor(node) as RedBlackNode<T>;

            color = successor.color;
            fixupPointer = successor.right;

            // Handles right side pointers.
            if (successor.parent !== node) {
                // Successor may only have right child, but no left child,
                // as the successor is the min in the right subtree.
                // Replace the successor with its right subtree.
                this.transplant(successor, successor.right);

                // Links the successor to the node's right subtree.
                successor.right = node.right;
                successor.right.parent = successor;
            } else if (fixupPointer) {
                fixupPointer.parent = successor;
            }

            // Links the successor to node's parent.
            this.transplant(node, successor);

            // Links the successor to the node's left subtree.
            successor.left = node.left;
            successor.left.parent = successor;
            successor.color = node.color;
        }

        if (color === RedBlackNodeColor.BLACK) {
            this.deleteFixup(fixupPointer);
        }
    }

    /**
     * Restores the reb-black tree properties after insertion.
     * It also balances the tree.
     * @complexity O(lg n)
     */
    private insertFixup(newNode: RedBlackNode<T>): void {
        let node = newNode as RedBlackNode<T>;
        let parent: RedBlackNode<T>;
        let grandParent: RedBlackNode<T>;
        let uncle: RedBlackNode<T> | undefined;

        while (
            node !== this.root &&
            node.color !== RedBlackNodeColor.BLACK &&
            node.parent!.color === RedBlackNodeColor.RED
        ) {
            // As the node is not the root, it has parent.
            parent = node.parent as RedBlackNode<T>;
            // As the the parent is red, it cannot be root.
            // Because the root is black. It means the parent has parent.
            grandParent = parent.parent as RedBlackNode<T>;

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
                        parent = node.parent as RedBlackNode<T>;
                    }

                    // Case 3: node is left child.
                    // Rotate right.
                    this.rightRotate(grandParent);
                    this.swapColor(parent, grandParent);
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
                    if (parent.left === node) {
                        // Rotate right.
                        this.rightRotate(parent);
                        node = parent;
                        parent = node.parent as RedBlackNode<T>;
                    }

                    // Case 3: node is right child.
                    // Rotate left.
                    this.leftRotate(grandParent);
                    this.swapColor(parent, grandParent);
                    node = parent;
                }
            }
        }

        this.root!.color = RedBlackNodeColor.BLACK;
    }

    /**
     * Restores the reb-black tree properties after deletion.
     * It also balances the tree.
     * @complexity O(lg n)
     */
    private deleteFixup(): void {}

    /**
     * Swaps the color of the nodes.
     * @complexity O(1)
     */
    private swapColor(a: RedBlackNode<T>, b: RedBlackNode<T>): void {
        const temp = a.color;

        a.color = b.color;
        b.color = temp;
    }
}

// https://www.programiz.com/dsa/deletion-from-a-red-black-tree
// https://www.codesdope.com/course/data-structures-red-black-trees-deletion/
