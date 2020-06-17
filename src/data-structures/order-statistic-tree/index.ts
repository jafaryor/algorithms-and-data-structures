import {RedBlackTree} from '../red-black-tree';
import {OrderStatisticNode} from './node';

/**
 * The Order Statistic Tree.
 */
export class OrderStatisticTree<T> extends RedBlackTree<T> {
    protected root?: OrderStatisticNode<T>;

    /**
     * Returns the pointer to the i-th smallest key in the tree.
     * @complexity O(lg n)
     */
    select(i: number): OrderStatisticNode<T> | undefined {
        let rank = this.getNodeSize(this.root?.left) + 1;
        let current = this.root;

        while (rank !== i) {
            if (i < rank) {
                current = current?.left;
            } else {
                current = current?.right;
                i = i - rank;
            }

            rank = this.getNodeSize(current?.left) + 1;
        }

        return current;
    }

    /**
     * Returns the position of the node in the linear order,
     * determined by an inorder tree walk of tree.
     * @complexity O(lg n)
     */
    rank(node: OrderStatisticNode<T>): number {
        let rank = this.getNodeSize(node.left) + 1;
        let current = node;

        // The loop goes from a subtree rooted at "current" and goes all the way
        // up to the root embracing more and more parts of the tree.
        // Because the calculated rank is correct only in the subtree rooted at "current".
        while (current !== this.root) {
            // Parent exists as "current" is not root.
            if (current === current.parent!.right) {
                // Because left sibling goes first, after the left subtree
                // and then the node itself in an inorder walk.
                rank = rank + this.getNodeSize(current.parent!.left) + 1;
            }

            // The rank of left subtree remains as it was in the previous iteration.
            // Because the left subtree always goes first in an inorder walk.
            current = current.parent!;
        }

        return rank;
    }

    /**
     * Maintains the order statistic tree properties.
     * @complexity O(lg n)
     */
    insertFixup(node: OrderStatisticNode<T>): void {
        // Increments the size of each node along the path from node up to the root.
        for (
            let current = node;
            current !== this.root;
            current = current.parent!
        ) {
            current.size++;
        }
    }

    /**
     * Fixes the involved nodes' size after rotation.
     */
    leftRotate(node: OrderStatisticNode<T>): void {
        super.leftRotate(node);
        // TODO: finish it.
    }

    /**
     * Fixes the involved nodes' size after rotation.
     */
    rightRotate(node: OrderStatisticNode<T>): void {
        super.leftRotate(node);
        // TODO: finish it.
    }

    //==================================
    // RECURSIVE IMPLEMENTATION - START
    //==================================

    /**
     * Returns the pointer to the i-th smallest key in the tree.
     * [Recursive Approach]
     * @complexity O(lg n)
     */
    selectRecursive(i: number): OrderStatisticNode<T> | undefined {
        return this.root && this.selectInSubtree(i, this.root);
    }

    /**
     * Returns the position of the node in the linear order,
     * determined by an inorder tree walk of tree.
     * [Recursive Approach]
     * @complexity O(lg n)
     */
    rankRecursive(node: OrderStatisticNode<T>): number {
        // The root exist as the tree has at least one node, which is the passed argument.
        return this.rankInSubtree(this.root!, node.key);
    }

    /**
     * Returns the pointer to the i-th smallest key in the subtree.
     * @complexity O(lg n)
     */
    private selectInSubtree(
        i: number,
        node: OrderStatisticNode<T>
    ): OrderStatisticNode<T> | undefined {
        const rank = this.getNodeSize(node.left) + 1;

        if (i === rank) {
            return node;
        } else if (i < rank) {
            // As the left nodes have lower ranks.
            return node.left && this.selectInSubtree(i, node.left);
        } else {
            // As the right nodes have higher ranks.
            /**
             * The "i - rank" explanation:
             * Since there are "rank" elements in the subtree rooted at the node
             * that come before the right subtree in an inorder tree walk.
             */
            return node.right && this.selectInSubtree(i - rank, node.right);
        }
    }

    /**
     * Return the rank of the "key".
     * Starts looking from the "node".
     * @complexity O(lg n)
     */
    private rankInSubtree(node: OrderStatisticNode<T>, key: number): number {
        if (key === node.key) {
            return this.getNodeSize(node.left) + 1;
        } else if (key < node.key) {
            // Left subtree exists as the the node key is less than the node's key.
            return this.rankInSubtree(node.left!, key);
        } else {
            // Right exists as the node key is grater than the node's key.
            return (
                this.getNodeSize(node.left!) +
                1 +
                this.rankInSubtree(node.right!, key)
            );
        }
    }

    //==================================
    // RECURSIVE IMPLEMENTATION - END
    //==================================

    /**
     * Returns the size of the node.
     * The NIL nodes have size of 0.
     */
    private getNodeSize(node?: OrderStatisticNode<T>): number {
        return node ? node.size : 0;
    }
}
