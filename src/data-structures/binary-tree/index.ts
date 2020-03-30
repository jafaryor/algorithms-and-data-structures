import {BinaryNode} from './node';

/**
 * The Binary Tree.
 */
export abstract class BinaryTree<T> {
    protected root?: BinaryNode<T>;
    protected nodesCount = 0;

    /**
     * Return the height of a binary tree.
     * The height of root is 1.
     */
    get height(): number {
        if (this.isEmpty()) return 0;

        return this.heightGetterHelper(this.root!, 1);
    }

    /**
     * Returns the amount of node.
     */
    get nodes(): number {
        return this.nodesCount;
    }

    /**
     * Checks if the tree is empty.
     * @complexity O(1)
     */
    isEmpty(): boolean {
        return this.nodesCount === 0;
    }

    /**
     * Return the root.
     */
    getRoot(): BinaryNode<T> | undefined {
        return this.root;
    }

    /**
     * Prints the tree in the following pattern: [ left | parent | right ]
     * Prints the left -> root -> right
     * @complexity O(n)
     */
    inorderTraverse(
        node = this.root,
        callback: TraverseCallback<T> = this.loggingCallback
    ): void {
        if (!node) return;

        node.left && this.inorderTraverse(node.left);

        callback(node);

        node.right && this.inorderTraverse(node.right);
    }

    /**
     * Prints the tree in the following pattern: [ parent | left | right ]
     * Prints children -> root
     * @complexity O(n)
     */
    preorderTraverse(
        node = this.root,
        callback: TraverseCallback<T> = this.loggingCallback
    ): void {
        if (!node) return;

        callback(node);

        node.left && this.preorderTraverse(node.left);
        node.right && this.preorderTraverse(node.right);
    }

    /**
     * Prints the tree in the following pattern: [ left | right | parent ]
     * Prints root -> children
     * @complexity O(n)
     */
    postorderTraverse(
        node = this.root,
        callback: TraverseCallback<T> = this.loggingCallback
    ): void {
        if (!node) return;

        node.left && this.postorderTraverse(node.left);
        node.right && this.postorderTraverse(node.right);

        callback(node);
    }

    /**
     * Replaces one subtree (a) with another subtree (b).
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
     * The default callback for *Traverse methods.
     */
    private loggingCallback(node?: BinaryNode<T>): void {
        console.log(`[${node?.key}, ${node?.value}]`);
    }

    /**
     * Height getter helper method.
     */
    private heightGetterHelper(node: BinaryNode<T>, height: number): number {
        const leftHeight = node.left
            ? this.heightGetterHelper(node.left, height + 1)
            : height;
        const rightHeight = node.right
            ? this.heightGetterHelper(node.right, height + 1)
            : height;

        return Math.max(leftHeight, rightHeight);
    }
}

/**
 * Binary tree traverse callback.
 */
export type TraverseCallback<T> = (node?: BinaryNode<T>) => void;
