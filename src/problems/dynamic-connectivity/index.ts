/**
 * Solves the Dynamic Connectivity problem using disjoint set data structure.
 * Weighted Quick Union Implementation.
 */
export class UnionFinder {
    // Number of components (connected).
    count: number;
    // The id of components.
    parent: number[];
    // The sizes of the components.
    size: number[];

    /**
     * Checks whether two sites p and q are in the same component.
     * @time O(lgN)
     */
    connected(p: number, q: number): boolean {
        return this.find(p) === this.find(q);
    }

    /**
     * Returns the component id, which contains site p (0 to N-1)
     * @time O(lgN)
     */
    find(p: number): number {
        // Follows the link to find a root of p.
        while (p !== this.parent[p]) {
            p = this.parent[p];
        }

        return p;
    }

    /**
     * Add connection between p and q sites.
     * @time O(lgN)
     */
    union(p: number, q: number): void {
        // Find the root of p.
        const pRoot = this.find(p);
        // Find the root of q.
        const qRoot = this.find(q);

        // Nothing to do if p and q are already in the same component.
        if (pRoot === qRoot) return;

        if (this.size[pRoot] < this.size[qRoot]) {
            // Make qRoot the root of pRoot.
            this.parent[pRoot] = qRoot;
            this.size[qRoot] += this.size[pRoot];
        } else {
            // Make pRoot the root of qRoot.
            this.parent[qRoot] = pRoot;
            this.size[pRoot] += this.size[qRoot];
        }

        this.count--;
    }

    /**
     * Finds the connected components of the given sites.
     * @param pairs - the given pairs of sites to connect.
     * @time Of Quick Find: O(N^2)
     * @time Of Quick Union: O(N^2)
     * @time Of Weighted Quick Union: O(N * lgN)
     */
    findConnectedComponents(
        n: number,
        pairs: number[][],
        method: QuickFindImplementation = QuickFindImplementation.WEIGHTED_QUICK_UNION,
    ): number[] {
        let union: Function;

        switch (method) {
            case QuickFindImplementation.QUICK_FIND: {
                union = this.quickFindUnion.bind(this);
                break;
            }
            case QuickFindImplementation.QUICK_UNION: {
                union = this.quickUnion.bind(this);
                break;
            }
            default: {
                union = this.union.bind(this);
                break;
            }
        }

        this.count = n;
        this.parent = new Array(n);
        this.size = new Array(n);

        // Initially, we start with N components,
        // each site in its own component, so we initialize
        // componentId[i] to i for all i from 0  to N-1.
        for (let i = 0; i < n; i++) {
            this.parent[i] = i;
            // Initially, each component has size 1.
            this.size[i] = 1;
        }

        for (const pair of pairs) {
            if (this.connected(pair[0], pair[1])) continue;
            else union(pair[0], pair[1]);
        }

        return this.parent;
    }

    /**
     * The Quick Find implementation.
     */

    // @time O(1)
    quickFind(p: number): number {
        return this.parent[p];
    }

    // @time O(N)
    quickFindUnion(p: number, q: number): void {
        const pId = this.quickFind(p);
        const qId = this.quickFind(q);

        // Nothing to do if p and q are already in the same component.
        if (pId === qId) return;

        // Rename all sites in component pId to component qId.
        for (let i = 0; i < this.parent.length; i++) {
            if (this.parent[i] === pId) this.parent[i] = qId;
        }

        this.count--;
    }

    /**
     * The Quick Union implementation.
     */

    // @time O(N)
    quickUnionFind(p: number): number {
        while (p !== this.parent[p]) {
            p = this.parent[p];
        }

        return p;
    }

    // @time O(N)
    quickUnion(p: number, q: number): void {
        const pRoot = this.quickUnionFind(p);
        const qRoot = this.quickUnionFind(q);

        // Nothing to do if p and q are already in the same component.
        if (pRoot === qRoot) return;

        // Add q as an immediate descendant of p.
        // Basically connects q's root to p's root.
        this.parent[pRoot] = qRoot;

        this.count--;
    }
}

/**
 * The Quick Find implementation enum.
 */
export enum QuickFindImplementation {
    QUICK_FIND,
    QUICK_UNION,
    WEIGHTED_QUICK_UNION,
}
