/**
 * Binary Search Tree Node.
 */
export class BinaryNode<T> {
    key: number;
    value: T;
    parent?: BinaryNode<T>;
    left?: BinaryNode<T>;
    right?: BinaryNode<T>;

    constructor(
        key: number,
        value: T,
        parent?: BinaryNode<T>,
        left?: BinaryNode<T>,
        right?: BinaryNode<T>,
    ) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }

    /**
     * Return the grandparent.
     */
    get grandparent(): BinaryNode<T> | undefined {
        return this.parent?.parent;
    }

    /**
     * Return the sibling.
     */
    get sibling(): BinaryNode<T> | undefined {
        return this.parent?.right === this
            ? this.parent?.left
            : this.parent?.right;
    }

    /**
     * Return the uncle.
     */
    get uncle(): BinaryNode<T> | undefined {
        return this.grandparent?.right === this.parent
            ? this.grandparent?.left
            : this.grandparent?.right;
    }
}
