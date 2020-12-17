import {DisjointSetNode} from './node';

/**
 * The Disjoint Set.
 */
export class DisjointSet<T> {
    /**
     * Creates an empty disjoint set.
     * @complexity O(1)
     * @amortizedComplexity O(1)
     */
    makeSet(value: T, parent?: DisjointSetNode<T>): DisjointSetNode<T> {
        return new DisjointSetNode<T>(value, parent);
    }

    /**
     * Returns the representative of a set which includes the "node"
     * AND updates the "node"'s to point directly to the root (PATH COMPRESSION).
     * This is a TWO-PASS METHOD:
     * 1. As it recurses, it makes one pass-up the find path to find the root,
     * 2. As the recursion unwinds, it makes a second pass back down
     *    the find path to update each node to point directly to the root.
     * @complexity O(k)
     * @where k - the rank of root of a set which includes the "node".
     * @amortizedComplexity O(α(n)), where α(n) ≤ 4 for all n.
     */
    findSet(node: DisjointSetNode<T>): DisjointSetNode<T> {
        if (node !== node.parent) {
            node.parent = this.findSet(node.parent);
        }

        return node.parent;
    }

    /**
     * Merges two disjoint sets and returns the result set.
     * @complexity O(k1 + k2)
     * @where k1, k2 - the rank of roots of each sets.
     * @amortizedComplexity O(α(n)), where α(n) ≤ 4 for all n.
     */
    union(
        node1: DisjointSetNode<T>,
        node2: DisjointSetNode<T>,
    ): DisjointSetNode<T> {
        const root1 = this.findSet(node1);
        const root2 = this.findSet(node2);

        this.link(root1, root2);

        // Return the pointer to root (representative) of united sets.
        return root1.rank > root2.rank ? root1 : root2;
    }

    /**
     * Links the representative(root) of smaller set to
     * the representative(root) of a bigger set (UNION by RANK).
     * @complexity O(1)
     * @amortizedComplexity O(α(n)), where α(n) ≤ 4 for all n.
     */
    private link(root1: DisjointSetNode<T>, root2: DisjointSetNode<T>): void {
        if (root1.rank > root2.rank) {
            root2.parent = root1;
        } else {
            root1.parent = root2;

            if (root1.rank === root2.rank) {
                root2.rank = root2.rank + 1;
            }
        }
    }

    /**
     * Compute the connected components of a graph.
     * The graph has |G.V| vertices and |G.E| edges.
     * @param vertices - an array of values stored in each graph vertex.
     * @param edges - an array of edges (two vertices connected to each other),
     * @where each edge represented as an array [indexU, indexV].
     * @where indexU, indexV - index of edges from "edges" array.
     * @complexity O(|G.V| + |G.E| * |G.V|)
     * @spaceComplexity O(|G.V|)
     */
    connectedComponents(
        vertices: T[],
        edges: number[][],
    ): Array<DisjointSetNode<T>> {
        const sets: Array<DisjointSetNode<T>> = [];
        let u: DisjointSetNode<T>;
        let v: DisjointSetNode<T>;

        // Converts each vertex into a set with single node.
        for (const vertex of vertices) {
            sets.push(this.makeSet(vertex));
        }

        for (const edge of edges) {
            u = sets[edge[0]]; // first vertex.
            v = sets[edge[1]]; // second vertex.

            if (!this.sameComponent(u, v)) {
                // If vertices are in different sets, merge them together.
                this.union(u, v);
            }
        }

        return sets;
    }

    /**
     * Checks whether two vertices are in the same connected component.
     * @complexity O(k1 + k2)
     * @where k1, k2 - the rank of roots (number of nodes) of each sets.
     */
    sameComponent(u: DisjointSetNode<T>, v: DisjointSetNode<T>): boolean {
        return this.findSet(u) === this.findSet(v);
    }
}
