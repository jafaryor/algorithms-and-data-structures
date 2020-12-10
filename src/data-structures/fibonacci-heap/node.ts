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
    left = this;
    right = this;

    constructor(
        public key: number = Infinity,
        public value: T,
        public parent?: FibonacciNode<T>,
        public child?: FibonacciNode<T>,
    ) {}
}
