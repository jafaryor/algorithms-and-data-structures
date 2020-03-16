import {BinarySearchNode, BinaryNode} from './node';

/**
 * The Binary Search Tree.
 * [ left < root >= right ]
 * The height of the binary tree is h = log_2(n)
 */
export class BinarySearchTree<T> {
    protected root: BinaryNode<T> | undefined;
    protected inorderWalkLogs: number[] = [];

    /**
     * Prints the tree in the following pattern: [ left | parent | right ]
     * Prints the left -> root -> right
     * @complexity O(n)
     */
    inorderTreeWalk(node: BinaryNode<T> | undefined = this.root): void {
        if (!node) return;

        this.inorderTreeWalk(node.left);

        console.log(node.value);
        // logging logic - start.
        if (node === this.root) this.inorderWalkLogs = [];
        this.inorderWalkLogs.push(node.key);
        // end.

        this.inorderTreeWalk(node.right);
    }

    /**
     * Prints the tree in the following pattern: [ parent | left | right ]
     * Prints children -> root
     * @complexity O(n)
     */
    preorderTreeWalk(node?: BinaryNode<T>): void {
        if (!node) return;

        console.log(node.value);

        this.preorderTreeWalk(node.left);
        this.preorderTreeWalk(node.right);
    }

    /**
     * Prints the tree in the following pattern: [ left | right | parent ]
     * Prints root -> children
     * @complexity O(n)
     */
    postorderTreeWalk(node?: BinaryNode<T>): void {
        if (!node) return;

        this.postorderTreeWalk(node.left);
        this.postorderTreeWalk(node.right);

        console.log(node.value);
    }

    /**
     * Recursively searches for a value in the binary tree starting from root.
     * @complexity O(h)
     */
    search(
        value: T,
        node: BinaryNode<T> | undefined = this.root
    ): BinaryNode<T> | undefined {
        if (!node) return;
        else if (node.value === value) return node;

        if (value < node.value) {
            return this.search(value, node.left);
        } else {
            return this.search(value, node.right);
        }
    }

    /**
     * Iteratively searches for a value in the binary tree starting from root.
     * @complexity O(h)
     */
    iterativeSearch(
        value: T,
        node: BinaryNode<T> | undefined = this.root
    ): BinaryNode<T> | undefined {
        let activeNode: BinaryNode<T> | undefined = node;

        while (activeNode && activeNode.value !== value) {
            if (value < activeNode.value) {
                activeNode = activeNode.left;
            } else {
                activeNode = activeNode.right;
            }
        }

        return activeNode;
    }

    /**
     * Return the pointer to the node with the minimum key.
     * @complexity O(h)
     */
    min(
        node: BinaryNode<T> | undefined = this.root
    ): BinaryNode<T> | undefined {
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
        node: BinaryNode<T> | undefined = this.root
    ): BinaryNode<T> | undefined {
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
    successor(node: BinaryNode<T>): BinaryNode<T> | undefined {
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
    predecessor(node: BinaryNode<T>): BinaryNode<T> | undefined {
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
    insert(
        newNode: BinaryNode<T>,
        node: BinaryNode<T> = this.root as BinaryNode<T>
    ): void {
        if (!this.root) this.root = newNode;

        if (newNode.key < node.key) {
            if (node.left) return this.insert(newNode, node.left);
            else {
                newNode.parent = node;
                node.left = newNode;
            }
        } else {
            if (node.right) return this.insert(newNode, node.right);
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
    iterativeInsert(newNode: BinaryNode<T>): void {
        // Keep pointers to two nodes, child (a) and parent (b).
        let a: BinaryNode<T> | undefined = this.root;
        let b: BinaryNode<T>;

        while (a) {
            b = a;
            a = newNode.key < a.key ? a.left : a.right;
        }

        newNode.parent = b;

        if (!b) this.root = newNode;
        else if (newNode.key < b.key) b.left = newNode;
        else b.right = newNode;
    }

    /**
     * Replaces one subtree with another subtree.
     * If the "b" is undefined, the subtree "a" will be just removed.
     * @complexity O(1)
     */
    transplant(a: BinaryNode<T>, b: BinaryNode<T> | undefined): void {
        // "a" is root f the tree.
        if (!a.parent) this.root = b;
        // "a" is a left child of its parent.
        else if (a === a.parent.left) a.parent.left = b;
        // "a" is the right child of its parent.
        else a.parent.right = b;

        // Links "b" to the parent of "a".
        if (b) b.parent = a.parent;
    }

    /**
     * Removes the node from the tree.
     * @complexity O(h) -> [because of the "successor" method]
     */
    remove(node: BinaryNode<T>): void {
        // A node has no left child.
        if (!node.left) this.transplant(node, node.right);
        // A node has left child, but no right child.
        else if (!node.right) this.transplant(node, node.left);
        // A node has both children.
        else {
            const successor = this.successor(node) as BinaryNode<T>;

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
    }
}
