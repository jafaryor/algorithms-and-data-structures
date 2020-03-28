import {BinarySearchTree} from '../binary-search-tree';
import {RedBlackNode, RedBlackNodeColor} from './node';

/**
 * The Red-Black Tree.
 */
export class RedBlackTree<T> extends BinarySearchTree<T> {
    protected root?: RedBlackNode<T>;

    /**
     * Rotates the node left.
     * @complexity O(1)
     */
    leftRotate(node: RedBlackNode<T>) {
        const right = node.right!;

        // Turn the left subtree of "right" into right subtree of "node".
        node.right = right.left;

        if (right.left) {
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
        const left = node.left!;

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

        this.paintRed(newNode);

        this.insertFixup(newNode);
    }

    /**
     * Iterative insert.
     * @complexity O(lg n)
     */
    iterativeInsert(newNode: RedBlackNode<T>) {
        super.iterativeInsert(newNode);

        this.paintRed(newNode);

        this.insertFixup(newNode);
    }

    /**
     * Removes the node from the tree.
     * @complexity O(h) -> [because of the "successor" method]
     */
    remove(node: RedBlackNode<T>): void {
        let originalColor = node.color;
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

            originalColor = successor.color;
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

        if (originalColor === RedBlackNodeColor.BLACK && fixupPointer) {
            this.deleteFixup(fixupPointer);
        }
    }

    /**
     * Restores the reb-black tree properties after insertion.
     * It also balances the tree.
     * @complexity O(lg n)
     */
    private insertFixup(newNode: RedBlackNode<T>): void {
        let node = newNode!;
        let uncle: RedBlackNode<T> | undefined;

        while (node !== this.root && this.isRedNode(node.parent)) {
            // As the node is not the root, it has parent.

            // As the the parent is red, it cannot be root.
            // Because the root is black. It means the parent has parent.

            // Case A: parent is left child of grandparent.
            if (node.grandparent!.left === node.parent) {
                uncle = node.grandparent!.right;

                // Case 1: The uncle is RED.
                if (uncle && this.isRedNode(uncle)) {
                    // Repaint.
                    this.paintRed(node.grandparent);
                    this.paintBlack(node.parent);
                    this.paintBlack(uncle);
                    node = node.grandparent!;
                } else {
                    // Case 2: node is right child.
                    if (node.parent!.right === node) {
                        // Rotate left.
                        this.leftRotate(node.parent!);
                        node = node.parent!;
                    }

                    // Case 3: node is left child.
                    // Rotate right.
                    this.paintRed(node.grandparent!);
                    this.paintBlack(node.parent!);
                    this.rightRotate(node.grandparent!);
                    // NOTE: don't use "parent" and "grandParent" variables here,
                    // as the else block might change the pointer of "node".
                }
            } else {
                // Case B: Parent is right child of grandparent.
                uncle = node.grandparent!.left;

                // Case 1: uncle is also RED.
                if (uncle && this.isRedNode(uncle)) {
                    // Repaint.
                    this.paintRed(node.grandparent);
                    this.paintBlack(node.parent);
                    this.paintBlack(uncle);
                    node = node.grandparent!;
                } else {
                    // Case 2: node is left child.
                    if (node.parent!.left === node) {
                        // Rotate right.
                        this.rightRotate(node.parent!);
                        node = node.parent!;
                    }

                    // Case 3: node is right child.
                    // Rotate left.
                    this.paintBlack(node.parent!);
                    this.paintRed(node.grandparent!);
                    this.leftRotate(node.grandparent!);
                }
            }
        }

        this.paintBlack(this.root!);
    }

    /**
     * Restores the reb-black tree properties after deletion.
     * It also balances the tree.
     * @complexity O(lg n)
     */
    private deleteFixup(startNode: RedBlackNode<T>): void {
        let node = startNode;
        let rightSibling: RedBlackNode<T>;
        let leftSibling: RedBlackNode<T>;

        while (node !== this.root && this.isBlackNode(node)) {
            // Parent exists because the node is not the root.
            if (node === node.parent!.left) {
                rightSibling = node.parent!.right!;

                if (this.isRedNode(rightSibling)) {
                    // right sibling exists because it is a red node.
                    this.paintBlack(rightSibling);
                    this.paintRed(node.parent);
                    this.leftRotate(node.parent!);
                    rightSibling = node.parent!.right!;
                }

                if (
                    this.isBlackNode(rightSibling.left) &&
                    this.isBlackNode(rightSibling.right)
                ) {
                    this.paintRed(rightSibling);
                    node = node.parent!;
                } else {
                    if (this.isBlackNode(rightSibling.right)) {
                        this.paintBlack(rightSibling.left);
                        this.paintRed(rightSibling);
                        this.rightRotate(rightSibling);
                        rightSibling = node.parent!.right!;
                    }

                    rightSibling.color = node.parent!.color;
                    this.paintBlack(node.parent);
                    this.paintBlack(rightSibling.right);
                    this.leftRotate(node.parent!);
                    node = this.root!;
                }
            } else {
                leftSibling = node.parent!.left!;

                if (this.isRedNode(leftSibling)) {
                    this.paintBlack(leftSibling);
                    this.paintRed(node.parent);
                    this.rightRotate(node.parent!);
                    leftSibling = node.parent!.left!;
                }

                if (
                    this.isBlackNode(leftSibling.right) &&
                    this.isBlackNode(leftSibling.left)
                ) {
                    this.paintRed(leftSibling);
                    node = node.parent!;
                } else {
                    if (this.isBlackNode(leftSibling.left)) {
                        this.paintBlack(leftSibling.right);
                        this.paintRed(leftSibling);
                        this.leftRotate(leftSibling);
                        leftSibling = node.parent!.left!;
                    }

                    leftSibling.color = node.parent!.color;
                    this.paintBlack(node.parent);
                    this.paintBlack(leftSibling.left);
                    this.rightRotate(node.parent!);
                    node = this.root!;
                }
            }
        }

        this.paintBlack(node);
    }

    /**
     * Checks if the node is red.
     */
    isRedNode(node?: RedBlackNode<T>): boolean {
        // if node is null, it is a left. Every leaf is BLACK.
        return node != null && node.isRed();
    }

    /**
     * Checks if the node is black.
     */
    isBlackNode(node?: RedBlackNode<T>): boolean {
        // if node is null, it is a left. Every leaf is BLACK.
        return node == null || node.isBlack();
    }

    /**
     * Paint the node as red.
     */
    paintRed(node?: RedBlackNode<T>): void {
        if (!node) return;

        node.color = RedBlackNodeColor.RED;
    }

    /**
     * Paints the node as black.
     */
    paintBlack(node?: RedBlackNode<T>): void {
        if (!node) return;

        node.color = RedBlackNodeColor.BLACK;
    }
}
