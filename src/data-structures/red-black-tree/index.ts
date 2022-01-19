import {BinarySearchTree} from '../binary-search-tree';
import {RedBlackNode, RedBlackNodeColor} from './node';
import {nodePrinterCallback} from '../binary-tree';

/**
 * The Red-Black Tree (without a sentinel node).
 * Note: DOESN'T SUPPORT NODES WITH EQUAL KEYS.
 */
export class RedBlackTree<T> extends BinarySearchTree<T> {
    // The tree null is only used in delete() method to store the reference to the parent node.
    private readonly treeNull = {
        parent: undefined,
        color: RedBlackNodeColor.BLACK,
    } as RedBlackNode<T>;

    protected root?: RedBlackNode<T>;

    /**
     * Iterative insert.
     * @timeO(lg n)
     */
    insert(node: RedBlackNode<T>) {
        super.insert(node);

        this.paintRed(node);

        this.insertFixup(node);
    }

    /**
     * Removes the node from the tree.
     * The idea is the same as in the BinaryTree.
     * @timeO(lg n) -> [because of the "successor" method]
     */
    delete(node: RedBlackNode<T>): void {
        let originalColor = node.color;
        // The sentinel is used here to store the reference to the parent node.
        let fixupPointer: RedBlackNode<T>;

        if (!node.left) {
            // A node has no left child.
            fixupPointer = node.right || this.treeNull;
            this.transplant(node, fixupPointer);
        } else if (!node.right) {
            // A node has left child, but no right child.
            fixupPointer = node.left || this.treeNull;
            this.transplant(node, fixupPointer);
        } else {
            // A node has both children.
            const successor = this.successor(node) as RedBlackNode<T>;

            originalColor = successor.color;
            fixupPointer = successor.right || this.treeNull;

            // Handles right side pointers.
            if (successor.parent === node) {
                fixupPointer.parent = node;
            } else {
                // Successor may only have right child, but no left child,
                // as the successor is the min in the right subtree.
                // Replace the successor with its right subtree.
                this.transplant(successor, successor.right || this.treeNull);

                // Links the successor to the node's right subtree.
                successor.right = node.right;
                successor.right.parent = successor;
            }

            // Links the successor to node's parent.
            this.transplant(node, successor);

            // Links the successor to the node's left subtree.
            successor.left = node.left;
            successor.left.parent = successor;
            successor.color = node.color;
        }

        if (originalColor === RedBlackNodeColor.BLACK) {
            this.deleteFixup(fixupPointer);
        }

        // Decrease the amount of nodes.
        this.nodesCount--;
        // Resets the tree null.
        this.looseTreeNull();
    }

    /**
     * Restores the reb-black tree properties after insertion.
     * It also balances the tree.
     * @timeO(lg n)
     */
    private insertFixup(newNode: RedBlackNode<T>): void {
        let node = newNode!;
        let uncle: RedBlackNode<T> | undefined;

        while (node !== this.root && this.isRedNode(node.parent)) {
            // * As the node is not the root, it has parent.
            // * As the the parent is red, it cannot be root.
            // Because the root is black. It means the node has grandparent.

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
                        // Rotate parent left.
                        node = node.parent!;
                        this.leftRotate(node);
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

                // Case 1: The uncle is RED.
                if (uncle && this.isRedNode(uncle)) {
                    // Repaint.
                    this.paintRed(node.grandparent);
                    this.paintBlack(node.parent);
                    this.paintBlack(uncle);
                    node = node.grandparent!;
                } else {
                    // Case 2: node is left child.
                    if (node.parent!.left === node) {
                        // Rotate parent right.
                        node = node.parent!;
                        this.rightRotate(node);
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
     * @timeO(lg n)
     */
    private deleteFixup(startNode: RedBlackNode<T>): void {
        let node = startNode;
        let sibling: RedBlackNode<T>;

        while (node !== this.root && this.isBlackNode(node)) {
            // Parent exists because the node is not the root.

            // Case A: node is left child of parent.
            if (node === node.parent!.left) {
                sibling = node.parent!.right || this.treeNull;

                // Case 1: right sibling is red.
                if (this.isRedNode(sibling)) {
                    // right sibling exists because it is a red node.
                    this.paintBlack(sibling);
                    this.paintRed(node.parent);
                    this.leftRotate(node.parent!);
                    sibling = node.parent!.right || this.treeNull;
                }

                // Case 2: children of right sibling are black.
                if (
                    this.isBlackNode(sibling.left) &&
                    this.isBlackNode(sibling.right)
                ) {
                    this.paintRed(sibling);
                    node = node.parent!;
                } else {
                    // Case 3: ony right child of right sibling s black.
                    if (this.isBlackNode(sibling.right)) {
                        this.paintBlack(sibling.left);
                        this.paintRed(sibling);
                        this.rightRotate(sibling);
                        sibling = node.parent!.right || this.treeNull;
                    }

                    // Case 4: either left of both children of right sibling are red.
                    sibling.color = node.parent!.color;
                    this.paintBlack(node.parent);
                    this.paintBlack(sibling.right);
                    this.leftRotate(node.parent!);
                    node = this.root!;
                }
            } else {
                // Case B: node is right child of parent.
                sibling = node.parent!.left || this.treeNull;

                // Case 1: left sibling is red.
                if (this.isRedNode(sibling)) {
                    this.paintBlack(sibling);
                    this.paintRed(node.parent);
                    this.rightRotate(node.parent!);
                    sibling = node.parent!.left || this.treeNull;
                }

                // Case 2: children of left sibling are black.
                if (
                    this.isBlackNode(sibling.right) &&
                    this.isBlackNode(sibling.left)
                ) {
                    this.paintRed(sibling);
                    node = node.parent!;
                } else {
                    // Case 3: only left child of left sibling is back.
                    if (this.isBlackNode(sibling.left)) {
                        this.paintBlack(sibling.right);
                        this.paintRed(sibling);
                        this.leftRotate(sibling);
                        sibling = node.parent!.left || this.treeNull;
                    }

                    // Case 4: either right or both children are red.
                    sibling.color = node.parent!.color;
                    this.paintBlack(node.parent);
                    this.paintBlack(sibling.left);
                    this.rightRotate(node.parent!);
                    node = this.root!;
                }
            }
        }

        this.paintBlack(node);
    }

    /**
     * Prints/draws a red-black tree.
     */
    printRBTree(): void {
        super.print(this.printRBNode as nodePrinterCallback<T>);
    }

    /**
     * Checks if the node is red.
     */
    isRedNode(node?: RedBlackNode<T>): boolean {
        // if node is null, it is a left. Every leaf is BLACK.
        return !this.isNullNode(node) && node!.isRed();
    }

    /**
     * Checks if the node is black.
     */
    isBlackNode(node?: RedBlackNode<T>): boolean {
        // if node is null, it is a left. Every leaf is BLACK.
        return this.isNullNode(node) || node!.isBlack();
    }

    /**
     * Checks if the node is undefined or treeNull.
     */
    isNullNode(node?: RedBlackNode<T>): boolean {
        return node == null || node === this.treeNull;
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

    /**
     * Prints a red-lack node.
     */
    private printRBNode(node: RedBlackNode<T>): string {
        return `${node.value}[${node.isRed() ? 'R' : 'B'}]`;
    }

    /**
     * Unlinks the treeNull from the tree and vise versa.
     */
    private looseTreeNull() {
        const parent = this.treeNull.parent;

        if (!parent) return;

        // Unlink the null from the tree.
        if (parent.left === this.treeNull) {
            parent.left = undefined;
        } else {
            parent.right = undefined;
        }

        // Unlink the tree from the treeNull.
        this.treeNull.parent = undefined;
    }
}
