/**
 * The Fibonacci Heap Node.
 */
export class FibonacciNode<T> {
    /** Number of node's children. */
    degree = 0;
    /**
     * Whether node has lost a child since the last time
     * the node was made the child of another node.
     */
    mark = false;
    left?: FibonacciNode<T>;
    right?: FibonacciNode<T>;

    constructor(
        public key: number = Infinity,
        public value: T,
        public parent?: FibonacciNode<T>,
        public child?: FibonacciNode<T>,
        left?: FibonacciNode<T>,
        right?: FibonacciNode<T>,
    ) {
        this.left = left || this;
        this.right = right || this;
    }
}
