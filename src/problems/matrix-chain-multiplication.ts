import {Matrix, MatrixSize} from '../data-structures/matrix';

/**
 * Matrix-chain Multiplication Problem: Given a chain <A1, A2, A3, ..., An>
 * of n matrices, where for i = 1, 2, ..., n matrix Ai has dimension
 * p_i-1 x p_i fully parenthesized the product A1 * A2 * ... * An
 * in a way that minimizes the number of scalar multiplications.
 *
 * Note: We are not actually multiplying matrices.
 * Our goal is only to determine an order for multiplying matrices
 * that has the lowest cost. We don't change the matrix places,
 * we just put parenthesis to define multiplication order.
 *
 * To illustrate the different costs incurred by different parenthesizations
 * of a matrix product, consider the problem of a chain <A1, A2, A3>
 * of three matrices. Suppose that the dimensions  of the matrices are
 * 10x100, 100x5, and 5x50, respectively. If we multiply according to the
 * parenthesization ((A1*A2)*A3), we perform 10*100*5 = 5000 scalar
 * multiplications to compute the 10x5 matrix product A1*A2, plus another
 * 10 * 5 * 50 = 2500 scalar multiplications to multiply this matrix by A3,
 * for a total of 7500 scalar multiplications. If instead we
 * multiply according to the parenthesization (A1*(A2*A3)), we perform
 * 100 * 5 * 50 = 25,000 scalar multiplications to compute the 100 x 50
 * matrix product A2*A3, plus another 10 * 100 * 50 = 50,000 scalar
 * multiplications to multiply A1 by this matrix, for a total of 75,000
 * scalar multiplications. Thus, computing the product according to the
 * first parenthesization is 10 times faster.
 *
 * The cost of matrix multiplication (Matrix.multiply) is calculated by
 * the following formula:
 * m[i][j] = 0 for all i, j: i === j.
 * m[i][j] = min{m[i][k] + m[k + 1][j] + p_i-1 * p_k * p_j}
 * for all k: i <= k < j and i, j: i < j.
 * where: m - costs of multiplication, p - matrix dimensions.
 *
 * @watch - https://www.youtube.com/watch?v=prx1psByp7U
 */

/**
 * Returns the matrix dimensions which used in Matrix-chain Multiplication.
 *
 * Note: The function assumes that matrix Ai has dimensions p_i-1 x p_i
 * for i = 1, 2, ..., n. The input is a sequence p_0, p_1, ..., p_n,
 * here length[p] = n + 1.
 *
 * Example: A1(5x4) * A2(4x6) * A3(6x2) * A4(2x7)
 * The dimensions array for these matrix multiplication is [5, 4, 6, 2, 7].
 */
function getMatrixDimensions(matrixSizes: MatrixSize[]): number[] {
    const dimensions = new Array(matrixSizes.length + 1);

    // The very first dimension item is the amount of rows of A1.
    dimensions[0] = matrixSizes[0].rows;

    for (let i = 1; i < matrixSizes.length; i++) {
        // Checks if the matrixes that are multiplied, are compatible.
        if (matrixSizes[i - 1].columns !== matrixSizes[i].rows) {
            throw new Error(
                `Matrices ${
                    i - 1
                } and ${i} are incompatible for multiplication.`
            );
        }

        // The amount of columns of previous matrix and
        // the amount of rows of current matrix are taken.
        dimensions[i] = matrixSizes[i].rows;
    }

    // The last dimension item is the amount of columns of An.
    dimensions[matrixSizes.length] =
        matrixSizes[matrixSizes.length - 1].columns;

    return dimensions;
}

/**
 * Calculates the optimal costs and optimal positions of multiplications.
 * costs[i][j] - contains the optimal cost (min number of multiplications) for Ai * Aj.
 * position[i][j] - contains the optimal splitting index of Ai * Aj.
 *
 * Idea: First takes each pair of matrices and finds optimal costs of
 * multiplication, then takes set of three matrices and using the previous
 * calculations for the set of two matrices, calculates the optimal cost of
 * multiplication for the set of three matrices and so on.
 * Until the set of matrices of length n is reached.
 *
 * @complexity - O(n^3) because each loop takes on at most n-1 values.
 * @spaceComplexity - O(n^2)
 * @see - images/matrix-chain-multiplication-complexity.png
 */
export function matrixChainOrder(
    matrixSizes: MatrixSize[]
): MatrixChainMultiplicationResult {
    let j: number;
    let cost: number;
    const n = matrixSizes.length + 1;
    const dimensions = getMatrixDimensions(matrixSizes);
    const costs = Matrix.createEmptyMatrixOfSize(n, n);
    const positions = Matrix.createEmptyMatrixOfSize(n - 1, n);

    for (let i = 1; i < n; i++) {
        // Because the cost of multiplying a matrix with nothing is 0.
        costs[i][i] = 0;
        // Cost for chain of length 1 is 0.
    }

    // l is a chain length.
    for (let l = 2; l < n; l++) {
        for (let i = 1; i <= n - l; i++) {
            j = i + l - 1;
            costs[i][j] = Infinity;

            for (let k = i; k < j; k++) {
                cost =
                    costs[i][k] +
                    costs[k + 1][j] +
                    dimensions[i - 1] * dimensions[k] * dimensions[j];

                if (cost < costs[i][j]) {
                    costs[i][j] = cost;
                    positions[i][j] = k;
                }
            }
        }
    }

    return {costs, positions};
}

/**
 * Recursive implementation of the problem.
 * @complexity - O(n^3)
 * @spaceComplexity - O(n^2)
 */
export function recursiveMatrixChain(matrixSizes: MatrixSize[]): number[][] {
    const n = matrixSizes.length + 1;
    const dimensions = getMatrixDimensions(matrixSizes);
    const costs = Matrix.createMatrixAndFillWith(n, n, Infinity);

    lookupChain(dimensions, costs, 1, n - 1);

    return costs;
}

/**
 * The recursiveMatrixChain helper function.
 * @complexity - O(n^3)
 * Proof: There two types of call:
 * 1. Call in which costs[i][j] = Infinity.
 * 2. Calls in which costs[i][j] < Infinity.
 * There are O(n^2) calls of the first type, one per table entry.
 * All calls of the second type are made as recursive calls by calls
 * of the first type. Whenever a given call makes recursive calls,
 * it makes O(n) them. Therefore, there are O(n^3) calls of the second type
 * in all. Each call of the second type takes O(1) time, and each call
 * of the first type takes O(n) time plus the time spent in its recursive
 * calls. The total time, therefore, is O(n^3).
 */
function lookupChain(
    dimensions: number[],
    costs: number[][],
    i: number,
    j: number
): number {
    let cost: number;

    // Returns previously computed value.
    if (costs[i][j] < Infinity) return costs[i][j];

    if (i === j) return (costs[i][j] = 0);

    for (let k = i; k < j; k++) {
        cost =
            lookupChain(dimensions, costs, i, k) +
            lookupChain(dimensions, costs, k + 1, j) +
            dimensions[i - 1] * dimensions[k] * dimensions[j];

        if (cost < costs[i][j]) costs[i][j] = cost;
    }

    return costs[i][j];
}

/**
 * Prints the matrix-chain multiplication optimal parenthesis.
 * Initial call should be with i = 1, j = n.
 * @complexity - O(n)
 */
export function printOptimalParenthesis(
    positions: number[][],
    i: number,
    j: number
): string {
    if (i === j) {
        return `A${i}`;
    } else {
        return `(${printOptimalParenthesis(
            positions,
            i,
            positions[i][j]
        )}${printOptimalParenthesis(positions, positions[i][j] + 1, j)})`;
    }
}

/**
 * performs the optimal matrix-chain multiplication, given the sequence
 * of matrices <A1, A2, ..., An>, the positions table computed by
 * "matrixChainOrder", and the indices i and j.
 * Initial call should be with i = 1, j = n.
 */
export function matrixChainMultiply(
    matrices: number[][][], // array of matrices.
    positions: number[][], // positions matrix from "matrixChainOrder"
    i: number,
    j: number
): number[][] {
    if (i === j) {
        return matrices[i];
    } else if (i + 1 === j) {
        return Matrix.multiply(matrices[i], matrices[j]);
    } else {
        const a = matrixChainMultiply(matrices, positions, i, positions[i][j]);
        const b = matrixChainMultiply(
            matrices,
            positions,
            positions[i][j] + 1,
            j
        );

        return Matrix.multiply(a, b);
    }
}

export interface MatrixChainMultiplicationResult {
    // Holds the optimal cost of multiplication.
    costs: number[][];
    // Holds the optimal positions for splitting
    // the product between A_k and A_k+1.
    positions: number[][];
}
