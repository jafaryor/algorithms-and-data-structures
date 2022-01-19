import {BinarySearchTree} from '../binary-search-tree';
import {BinarySearchNode} from '../binary-search-tree/node';
import {Matrix} from '../matrix';

/**
 * Optimal Binary Search Tree.
 */
export class OptimalBinarySearchTree<T> extends BinarySearchTree<T> {
    /**
     * Finds the optimal structure and builds the tree.
     * @param nodeValues - ascending SORTED node values.
     * @param nodeProbability - probability of a tree node.
     * @param dummyNodeProbability - probability of a dummy node.
     */
    constructor(
        nodeValues: T[],
        nodeProbability: number[],
        dummyNodeProbability: number[],
    ) {
        super();

        // As the array starts from index 1.
        const n = nodeValues.length - 1;
        const roots = this.findOptimalStructure(
            nodeProbability,
            dummyNodeProbability,
            n,
        );

        this.root = this.buildTree(nodeValues, roots, 1, n);
    }

    /**
     * Finds the structure of optimal binary search tree from provided values.
     * @param nodeProbability - probability of a tree node.
     * @param dummyNodeProbability - probability of a dummy node.
     * @param n - node amount.
     * @timeO(n^3) since its for loops are nested three deep
     * and each loop index takes on at most n values.
     */
    private findOptimalStructure(
        nodeProbability: number[],
        dummyNodeProbability: number[],
        n: number,
    ): number[][] {
        const costs = Matrix.createEmptyMatrixOfSize<number>(n + 2, n + 1);
        const probabilities = Matrix.createEmptyMatrixOfSize<number>(
            n + 2,
            n + 1,
        );
        const roots = Matrix.createEmptyMatrixOfSize<number>(n + 1, n + 1);
        let j;
        let cost;

        // Initializes the matrixes with the probability of dummy nodes.
        for (let i = 1; i <= n + 1; i++) {
            costs[i][i - 1] = dummyNodeProbability[i - 1];
            probabilities[i][i - 1] = dummyNodeProbability[i - 1];
        }

        // Calculates the optima cost of search and  finds its roots.
        for (let l = 1; l <= n; l++) {
            for (let i = 1; i <= n - l + 1; i++) {
                j = i + l - 1;
                costs[i][j] = Infinity;
                probabilities[i][j] =
                    probabilities[i][j - 1] +
                    nodeProbability[j] +
                    dummyNodeProbability[j];

                for (let r = i; r <= j; r++) {
                    cost =
                        costs[i][r - 1] + costs[r + 1][j] + probabilities[i][j];

                    if (cost < costs[i][j]) {
                        // The cost of search is minimum.
                        costs[i][j] = cost;
                        roots[i][j] = r;
                    }
                }
            }
        }

        return roots;
    }

    /**
     * Builds the tree from calculated structure.
     * @param nodeValues - ascending SORTED node values.
     * @param roots - root indexes (output from "findOptimalStructure()")
     * @timeO(n) - In the worst case the tree will look like a list,
     * T(n) = T(1) + T(n-1) + 1 = 2T(1) + T(n-2) + 2 = ... = kT(1) + T(n-k) + k
     * On the last step: n-k = 1 and T(1) = 1 => n-k = 1 => k = n-1
     * T(n) = (n-1)T(1) + T(1) + n - 1 = 2n - 1 = O(n)
     */
    private buildTree(
        nodeValues: T[],
        roots: number[][],
        leftIndex: number,
        rightIndex: number,
        parent?: BinarySearchNode<T>,
    ): BinarySearchNode<T> | undefined {
        if (leftIndex > rightIndex) return undefined;

        const rootIndex = roots[leftIndex][rightIndex];
        const node = new BinarySearchNode<T>(
            rootIndex,
            nodeValues[rootIndex],
            parent,
        );

        node.left = this.buildTree(
            nodeValues,
            roots,
            leftIndex,
            rootIndex - 1,
            node,
        );
        node.right = this.buildTree(
            nodeValues,
            roots,
            rootIndex + 1,
            rightIndex,
            node,
        );

        return node;
    }
}
