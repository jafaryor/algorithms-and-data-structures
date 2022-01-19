import {BinaryNode} from './node';

/**
 * The Binary Tree.
 */
export abstract class BinaryTree<T> {
    protected root?: BinaryNode<T>;
    protected nodesCount = 0;
    private printLogs = '';
    private nodeDistance = 10;
    private nodePrinterCallback = this.printNodeHelper;

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
     * @timeO(1)
     */
    isEmpty(): boolean {
        return this.root == null;
    }

    /**
     * Return the root.
     */
    getRoot(): BinaryNode<T> | undefined {
        return this.root;
    }

    /**
     * Empties the tree.
     */
    empty(): void {
        this.root = undefined;
        this.nodesCount = 0;
    }

    /**
     * Prints the tree in the following pattern: [ left | parent | right ]
     * Prints the left -> root -> right
     * @timeO(n)
     */
    inorderTraverse(
        node = this.root,
        callback: TraverseCallback<T> = this.loggingCallback,
    ): void {
        if (!node) return;

        node.left && this.inorderTraverse(node.left);

        callback(node);

        node.right && this.inorderTraverse(node.right);
    }

    /**
     * Prints the tree in the following pattern: [ parent | left | right ]
     * Prints children -> root
     * @timeO(n)
     */
    preorderTraverse(
        node = this.root,
        callback: TraverseCallback<T> = this.loggingCallback,
    ): void {
        if (!node) return;

        callback(node);

        node.left && this.preorderTraverse(node.left);
        node.right && this.preorderTraverse(node.right);
    }

    /**
     * Prints the tree in the following pattern: [ left | right | parent ]
     * Prints root -> children
     * @timeO(n)
     */
    postorderTraverse(
        node = this.root,
        callback: TraverseCallback<T> = this.loggingCallback,
    ): void {
        if (!node) return;

        node.left && this.postorderTraverse(node.left);
        node.right && this.postorderTraverse(node.right);

        callback(node);
    }

    /**
     * Replaces one subtree (a) with another subtree (b).
     * If the "b" is undefined, the subtree "a" will be just removed.
     * @timeO(1)
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
     * Rotates the node to the left side.
     * @timeO(1)
     */
    leftRotate(node: BinaryNode<T>): void {
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
     * Rotates the node to the right side.
     * @timeO(1)
     */
    rightRotate(node: BinaryNode<T>): void {
        const left = node.left!;

        // Turn the right subtree of "left" into left subtree of "node".
        node.left = left.right;

        if (left.right) {
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
     * Prints (Draws) the binary tree in the console.
     * @timeO(n)
     */
    print(
        nodePrinterCallback: nodePrinterCallback<T> = this.printNodeHelper,
    ): void {
        this.printLogs = '';
        this.nodeDistance = this.height * 2;
        this.nodePrinterCallback = nodePrinterCallback;

        console.log(this.printHelper(this.root, 0));
    }

    /**
     * Print helper function.
     * @timeO(n)
     */
    private printHelper(node?: BinaryNode<T>, space = 0): string {
        if (!node) return this.printLogs;

        space += this.nodeDistance;

        this.printHelper(node.right, space);

        this.printLogs += '\n';
        this.printLogs += ' '.repeat(space - this.nodeDistance);
        this.printLogs += `${this.nodePrinterCallback(node)}\n`;

        this.printHelper(node.left, space);

        return this.printLogs;
    }

    /**
     * Height getter helper method.
     * @timeO(n)
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

    /**
     * The callback function which print/draws a single node.
     */
    private printNodeHelper(node: BinaryNode<T>): string {
        return `${node.value}`;
    }

    /**
     * The default callback for *Traverse methods.
     */
    private loggingCallback(node?: BinaryNode<T>): void {
        console.log(`[${node?.key}, ${node?.value}]`);
    }
}

/**
 * Binary tree traverse callback.
 */
export type TraverseCallback<T> = (node?: BinaryNode<T>) => void;

/**
 * Node printer callback function.
 */
export type nodePrinterCallback<T> = (node: BinaryNode<T>) => string;
