import {BinaryTree} from '../binary-tree';
import {BinarySearchNode} from './node';

/**
 * The Binary Search Tree.
 * [ left.key < parent.key <= right.key ]
 */
export class BinarySearchTree<T> extends BinaryTree<T> {
    protected root?: BinarySearchNode<T>;

    /**
     * Recursively searches for a value in the binary tree starting from root.
     * @complexity O(h)
     */
    search(
        key: number,
        node: BinarySearchNode<T> | undefined = this.root
    ): BinarySearchNode<T> | undefined {
        if (!node) return;
        else if (node.key === key) return node;

        if (key < node.key) {
            return node.left && this.search(key, node.left);
        } else {
            return node.right && this.search(key, node.right);
        }
    }

    /**
     * Iteratively searches for a value in the binary tree starting from root.
     * @complexity O(h)
     */
    iterativeSearch(
        key: number,
        node: BinarySearchNode<T> | undefined = this.root
    ): BinarySearchNode<T> | undefined {
        let current: BinarySearchNode<T> | undefined = node;

        while (current && current.key !== key) {
            if (key < current.key) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return current;
    }

    /**
     * Return the pointer to the node with the minimum key.
     * @complexity O(h)
     */
    min(
        node: BinarySearchNode<T> | undefined = this.root
    ): BinarySearchNode<T> | undefined {
        let current = node;

        while (current && current.left) {
            current = current.left;
        }

        return current;
    }

    /**
     * Return the pointer to the node with the maximum key.
     * @complexity O(h)
     */
    max(
        node: BinarySearchNode<T> | undefined = this.root
    ): BinarySearchNode<T> | undefined {
        let current = node;

        while (current && current.right) {
            current = current.right;
        }

        return current;
    }

    /**
     * Returns the pointer to the successor of the node.
     * The successor of a node A is a node with the smallest key,
     * grater than A.key.
     * @complexity O(h)
     */
    successor(node: BinarySearchNode<T>): BinarySearchNode<T> | undefined {
        if (node.right) return this.min(node.right);

        let a = node;
        let b = node.parent;

        while (b && a === b.right) {
            a = b;
            b = b.parent;
        }

        return b;
    }

    /**
     * Return the pointer to the predecessor of the node.
     * The predecessor of a node A is the node with the greatest key,
     * smaller than A.key.
     * @complexity O(h)
     */
    predecessor(node: BinarySearchNode<T>): BinarySearchNode<T> | undefined {
        if (node.left) return this.max(node.left);

        let a = node;
        let b = node.parent;

        while (b && a === b.left) {
            a = b;
            b = b.parent;
        }

        return b;
    }

    /**
     * Inserts a new node into the tree. (Recursive approach)
     * @complexity O(h)
     */
    recursiveInsert(
        newNode: BinarySearchNode<T>,
        node: BinarySearchNode<T> = this.root as BinarySearchNode<T>
    ): void {
        // Increase the amount of nodes.
        if (node === this.root) this.nodesCount++;

        if (!this.root) this.root = newNode;
        else if (newNode.key < node.key) {
            if (node.left) return this.recursiveInsert(newNode, node.left);
            else {
                newNode.parent = node;
                node.left = newNode;
            }
        } else {
            if (node.right) return this.recursiveInsert(newNode, node.right);
            else {
                newNode.parent = node;
                node.right = newNode;
            }
        }
    }

    /**
     * Inserts a new node into the tree. (Iterative approach)
     * @complexity O(h)
     */
    insert(node: BinarySearchNode<T>): void {
        // Keep pointers to two nodes, child (a) and parent (b).
        let a: BinarySearchNode<T> | undefined = this.root;
        let b: BinarySearchNode<T> | undefined;

        while (a) {
            b = a;
            a = node.key < a.key ? a.left : a.right;
        }

        node.parent = b;

        if (b == null) this.root = node;
        else if (node.key < b.key) b.left = node;
        else b.right = node;

        // Increase the amount of nodes.
        this.nodesCount++;
    }

    /**
     * Removes the node from the tree.
     * @complexity O(h) -> [because of the "successor" method]
     */
    delete(node: BinarySearchNode<T>): void {
        // A node has no left child.
        if (!node.left) this.transplant(node, node.right);
        // A node has left child, but no right child.
        else if (!node.right) this.transplant(node, node.left);
        // A node has both children.
        else {
            const successor = this.successor(node) as BinarySearchNode<T>;

            // Handles right side pointers.
            if (successor.parent !== node) {
                // Successor may only have right child, but no left child,
                // as the successor is the min in the right subtree.
                // Replace the successor with its right subtree.
                this.transplant(successor, successor.right);

                // Links the successor to the node's right subtree.
                successor.right = node.right;
                successor.right.parent = successor;
            }

            // Links the successor to node's parent.
            this.transplant(node, successor);

            // Links the successor to the node's left subtree.
            successor.left = node.left;
            successor.left.parent = successor;
        }

        // Decrease the amount of nodes.
        this.nodesCount--;
    }
}
