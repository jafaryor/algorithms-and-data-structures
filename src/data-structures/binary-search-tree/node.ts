/**
 * Binary Tree Node CLass.
 */
export class BinaryNode<T> {
    key: number;
    value: T;
    parent?: BinaryNode<T>;
    left?: BinaryNode<T>;
    right?: BinaryNode<T>;

    constructor(key: number, value: T, parent?: BinaryNode<T>, left?: BinaryNode<T>, right?: BinaryNode<T>) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }
}
