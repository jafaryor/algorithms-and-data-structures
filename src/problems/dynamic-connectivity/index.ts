/**
 * Solves the Dynamic Connectivity problem.
 * Weighted Quick Union Implementation.
 */
export class UnionFinder {
    // The input pairs.
    private readonly pairs: number[][];
    // The id of components.
    private readonly componentId: number[];
    // Number of components (connected).
    private count: number;
    // The sizes of the components.
    private readonly componentSize: number[];

    constructor(n: number, pairs: number[][]) {
        this.count = n;
        this.pairs = pairs;
        this.componentId = new Array(n);
        this.componentSize = new Array(n);

        // Initially, we start with N components,
        // each site in its own component, so we initialize
        // componentId[i] to i for all i from 0  to N-1.
        for (let i = 0; i < n; i++) {
            this.componentId[i] = i;
        }

        // Initially, each component has size 1.
        for (let i = 0; i < n; i++) {
            this.componentSize[i] = 1;
        }
    }

    /**
     * Returns the number of connected components.
     * @complexity O(1)
     */
    get size(): number {
        return this.count;
    }

    /**
     * Checks whether two sites p and q are in the same component.
     * @complexity O(lgN)
     */
    connected(p: number, q: number): boolean {
        return this.find(p) === this.find(q);
    }

    /**
     * Returns the component id, which contains site p (0 to N-1)
     * @complexity O(lgN)
     */
    find(p: number): number {
        // Follows the link to find a root of p.
        while (p !== this.componentId[p]) {
            p = this.componentId[p];
        }

        return p;
    }

    /**
     * Add connection between p and q sites.
     * @complexity O(lgN)
     */
    union(p: number, q: number): void {
        // Find the root of p.
        const pRoot = this.find(p);
        // Find the root of q.
        const qRoot = this.find(q);

        // Nothing to do if p and q are already in the same component.
        if (pRoot === qRoot) return;

        if (this.componentSize[pRoot] < this.componentSize[qRoot]) {
            // Make pRoot the root of qRoot.
            this.componentId[pRoot] = qRoot;
            this.componentSize[qRoot] += this.componentSize[pRoot];
        } else {
            // Make qRoot the root of pRoot.
            this.componentId[qRoot] = pRoot;
            this.componentSize[pRoot] += this.componentSize[qRoot];
        }

        this.count--;
    }

    /**
     * Finds the connected components of the given sites.
     * @param pairs - the given pairs of sites to connect.
     * @complexity of Quick Find: O(N^2)
     * @complexity of Quick Union: O(N^2)
     * @complexity of Weighted Quick Union: O(N * lgN
     */
    findConnectedComponents(
        method: QuickFindImplementation = QuickFindImplementation.WEIGHTED_QUICK_UNION,
    ): number[] {
        let p;
        let q;
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

        for (let i = 0; i < this.pairs.length; i += 1) {
            p = this.pairs[i][0];
            q = this.pairs[i][1];

            if (this.connected(p, q)) continue;
            else union(p, q);
        }

        return this.componentId;
    }

    /**
     * The Quick Find implementation.
     */

    // @complexity O(1)
    quickFind(p: number): number {
        return this.componentId[p];
    }

    // @complexity O(N)
    quickFindUnion(p: number, q: number): void {
        const pId = this.quickFind(p);
        const qId = this.quickFind(q);

        // Nothing to do if p and q are already in the same component.
        if (pId === qId) return;

        // Rename all sites in component pId to component qId.
        for (let i = 0; i < this.componentId.length; i++) {
            if (this.componentId[i] === pId) this.componentId[i] = qId;
        }

        this.count--;
    }

    /**
     * The Quick Union implementation.
     */

    // @complexity O(N)
    quickUnionFind(p: number): number {
        while (p !== this.componentId[p]) {
            p = this.componentId[p];
        }

        return p;
    }

    // @complexity O(N)
    quickUnion(p: number, q: number): void {
        const pRoot = this.quickUnionFind(p);
        const qRoot = this.quickUnionFind(q);

        // Nothing to do if p and q are already in the same component.
        if (pRoot === qRoot) return;

        // Add q as an immediate descendant of p.
        // Basically connects q's root to p's root.
        this.componentId[pRoot] = qRoot;

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
