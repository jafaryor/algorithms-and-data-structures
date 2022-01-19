import {BinarySearchTree} from '../binary-search-tree';
import {AvlNode} from './node';
import {nodePrinterCallback} from '../binary-tree';

/**
 * The AVL Tree.
 */
export class AvlTree<T> extends BinarySearchTree<T> {
    protected root?: AvlNode<T>;

    /**
     * Returns the height of node.
     */
    nodeHeight(node?: AvlNode<T>): number {
        if (node == null) return -1;
        else return node.height;
    }

    /**
     * Returns the balance factor of a node.
     */
    nodeBalanceFactor(node?: AvlNode<T>): number {
        if (node == null) return 0;
        else return node.balanceFactor;
    }

    /**
     * Calculate the height of a node based on the height of its children.
     */
    calculateNodeHeight(node: AvlNode<T>): number {
        return (
            1 +
            Math.max(this.nodeHeight(node.left), this.nodeHeight(node.right))
        );
    }

    /**
     * Rotates the node to the left side.
     * @timeO(1)
     */
    leftRotate(node: AvlNode<T>): void {
        const right = node.right as AvlNode<T>;

        super.leftRotate(node);

        node.height = this.calculateNodeHeight(node);
        right.height = this.calculateNodeHeight(right);
    }

    /**
     * Rotates the node to the right side.
     * @timeO(1)
     */
    rightRotate(node: AvlNode<T>): void {
        const left = node.left as AvlNode<T>;

        super.rightRotate(node);

        node.height = this.calculateNodeHeight(node);
        left.height = this.calculateNodeHeight(left);
    }

    /**
     * Inserts a new node into the tree. (Iterative approach)
     * @timeO(lg n)
     */
    insert(node: AvlNode<T>): void {
        super.insert(node);
        this.insertFixup(node);
    }

    /**
     * Removes the node from the tree.
     * The idea is the same as in the BinaryTree.
     * @timeO(lg n) -> [because of the "successor" method]
     */
    delete(node: AvlNode<T>): void {
        super.delete(node);

        // A node has no left child, but has a right child.
        if (!node.left && node.right) this.deleteFixup(node.right);
        // A node has left child, but no right child, but has left child.
        else if (!node.right && node.left) this.deleteFixup(node.left);
        // A node has both children.
        else {
            const successor = this.successor(node) as AvlNode<T>;

            if (successor) this.deleteFixup(successor);
        }
    }

    /**
     * Restores the avl tree balance.
     * @timeO(lg n)
     */
    private insertFixup(node: AvlNode<T>): void {
        let current = node;
        let parent = node.parent!;
        let grandparent: AvlNode<T>;

        while (parent) {
            parent.height = this.calculateNodeHeight(parent);

            grandparent = parent.parent!;

            // grandparent is unbalanced.
            if (
                this.nodeBalanceFactor(grandparent) <= -2 ||
                this.nodeBalanceFactor(grandparent) >= 2
            ) {
                // Grandparent exists because the balance factor is not -1.
                if (parent === grandparent.left) {
                    // parent is in left side of grandparent.
                    if (current === grandparent.left!.left) {
                        // Case 1: Outside left.
                        this.rightRotate(grandparent);
                    } else if (current === grandparent.left!.right) {
                        // Case 3: Inside left.
                        this.leftRotate(parent);
                        this.rightRotate(grandparent);
                    }
                } else if (parent === grandparent.right) {
                    // parent is in right ide of grandparent.
                    if (current === grandparent.right!.right) {
                        // Case 2: Outside right.
                        this.leftRotate(grandparent);
                    } else if (current === grandparent.right!.left) {
                        // Case 4: Inside right.
                        this.rightRotate(parent);
                        this.leftRotate(grandparent);
                    }
                }

                break;
            }

            // move one node up.
            parent = parent.parent!;
            current = current.parent!;
        }
    }

    /**
     * Restores the avl tree balance.
     * @timeO(lg n)
     */
    private deleteFixup(startNode: AvlNode<T>): void {
        let current: AvlNode<T> | undefined = startNode;
        let node: AvlNode<T> | undefined;
        let tallerChild: AvlNode<T>;
        let tallerGrandchild: AvlNode<T>;

        while (current) {
            current.height = this.calculateNodeHeight(current);

            // grandparent is unbalanced.
            if (
                this.nodeBalanceFactor(current) <= -2 ||
                this.nodeBalanceFactor(current) >= 2
            ) {
                // -2 <= balance factor <= 2 means the node has at least
                // one child and one grandchild on one of its subtree.
                node = current;

                // find the taller child.
                if (this.nodeHeight(node.left) > this.nodeHeight(node.right)) {
                    tallerChild = node.left!;
                } else {
                    tallerChild = node.right!;
                }

                // find the taller grandchild.
                if (
                    this.nodeHeight(tallerChild.left) >
                    this.nodeHeight(tallerChild.right)
                ) {
                    tallerGrandchild = tallerChild.left!;
                } else if (
                    this.nodeHeight(tallerChild.left) <
                    this.nodeHeight(tallerChild.right)
                ) {
                    tallerGrandchild = tallerChild.right!;
                } else {
                    // Equal height!
                    /**
                     * Choose the right or left child of tallerChild,
                     * to minimize the amount of rotations by
                     * falling under the Case 1 or Case 2.
                     */
                    if (tallerChild === node.left) {
                        tallerGrandchild = tallerChild.left!;
                    } else {
                        tallerGrandchild = tallerChild.right!;
                    }
                }

                // Balance the tree.
                if (tallerChild === node.left) {
                    if (tallerGrandchild === node.left!.left) {
                        // Case 1: Outside left.
                        this.rightRotate(node);
                    } else if (tallerGrandchild === node.left!.right) {
                        // Case 3: Inside left.
                        this.leftRotate(tallerChild);
                        this.rightRotate(node);
                    }
                } else if (tallerChild === node.right) {
                    if (tallerGrandchild === node.right!.right) {
                        // Case 2: Outside right.
                        this.leftRotate(node);
                    } else if (tallerGrandchild === node.right!.left) {
                        // Case 4: Inside right.
                        this.rightRotate(tallerChild);
                        this.leftRotate(node);
                    }
                }
            }

            current = current.parent;
        }
    }

    /**
     * Prints/draws a red-black tree.
     */
    print(): void {
        super.print(this.printNode as nodePrinterCallback<T>);
    }

    /**
     * Prints a red-lack node.
     */
    private printNode(node: AvlNode<T>): string {
        return `${node.value}[${node.height}, ${node.balanceFactor}]`;
    }
}
