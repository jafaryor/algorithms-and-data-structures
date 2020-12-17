/**
 * The Disjoint Set Node.
 */
export class DisjointSetNode<T> {
    /** The node's satellite data. */
    value: T;
    /**
     * The upper bound on the height of the node.
     * As we follow the simple path from any node toward a root,
     * the node ranks strictly increase.
     */
    rank: number = 0;
    /** The pointer to a parent node. */
    parent: DisjointSetNode<T>;

    constructor(value: T, parent?: DisjointSetNode<T>) {
        this.value = value;

        // If no parent, point to self.
        this.parent = parent || this;
    }

    /**
     * Returns the string representation of find path.
     * Find Path - the path starting from node till
     * the root of the set which includes the node.
     */
    toSting(): string {
        let node: DisjointSetNode<T> = this;
        let result = `${this.value}`;

        while (node !== node.parent) {
            node = node.parent;

            result += ` -> ${node.value}`;
        }

        return result;
    }
}
