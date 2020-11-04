import {Matrix} from '../data-structures/matrix';

/**
 * Given two sequences X and Y, we say that a sequence Z is a common
 * subsequence of X and Y if Z is a subsequence of both X and Y.
 * For example, if X = <A, B, C, B, D, A, B> and Y = <B, D, C, A, B, A>,
 * the sequence <B, C, A> is a common subsequence of both X and Y.
 * The sequence <B, C, A> is not a longest common subsequence (LCS) of
 * X and Y, however, since it has length 3 and the sequence <B, C, B, A>,
 * which is also common to both X and Y, has length 4.
 *
 * In the longest-common-subsequence problem, we are given two sequences
 * X = <x_1, x_2, ..., x_m> and Y = <y_1, y_2, ..., y_n> and wish to find a maximum-length
 * common subsequence of X and Y.
 *
 * Theorem: Let Z = <z_1, z_2, ..., z_k> be any LCS of X and Y. Then:
 * 1. If x_m = y_n, then ́z_k = x_m = y_n and Z_(k-1) is an LCS of X_(m-1) and Y_(n-1)
 * 2. If x_m ≠ y_n, then ́z_k ≠ x_m implies that Z is an LCS of X_(m-1) and Y
 * 3. If x_m ≠ y_n, then ́z_k ≠ y_n implies that Z is an LCS of X and Y_(n-1)
 *
 * We should examine either one or two subproblems when finding an LCS
 * of X and Y.
 * If x_m = y_n, we must find an LCS of X_(m-1) and Y_(n-1).
 * Appending x_m = y_n to this LCS yields an LCS of X and Y.
 * If x_m ≠ y_n, then we must solve two subproblems:
 * 1. Finding an LCS of X_(m-1) and Y
 * 2. Finding an LCS of X and Y_(n-1)
 * Whichever of these two LCSs is longer is an LCS of X and Y.
 * Because these cases exhaust all possibilities,we know that one of the
 * optimal subproblem solutions must appear within an LCS of X and Y.
 */

/**
 * Return the length of the longest common subsequence.
 * The final result is in the lcs[m][n].
 * @complexity - O(n*m)
 * @spaceComplexity - O(n*m)
 */
export function longestCommonSubsequence(x: string, y: string): number[][] {
    const m = x.length;
    const n = y.length;
    const lcs = Matrix.createEmptyMatrixOfSize<number>(m + 1, n + 1);

    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i === 0 || j === 0) {
                // First row and fist columns are zeros,
                // because eac character compares against an empty string.
                lcs[i][j] = 0;
            } else if (x[i - 1] === y[j - 1]) {
                // Theorem case 1.
                lcs[i][j] = lcs[i - 1][j - 1] + 1;
            } else {
                // Theorem case 2 and 3.
                lcs[i][j] = Math.max(lcs[i - 1][j], lcs[i][j - 1]);
            }
        }
    }

    return lcs;
}

/**
 * Prints longest common subsequence.
 * Note: There might be multiple solutions, but this it prints the first
 * longest that starts from left of first input.
 * @complexity - O(m + n). Since it decrements,
 * at least one of i and j in each recursive call.
 * Note: Must stat with i = x.length nad j = y.length.
 * @see - /images/lcs-backtrack.png
 */
export function printLongestCommonSubsequence(
    lcs: number[][],
    x: string,
    y: string,
    i: number,
    j: number,
): string {
    if (lcs[i][j] === 0) return '';

    if (x[i - 1] === y[j - 1]) {
        return `${printLongestCommonSubsequence(lcs, x, y, i - 1, j - 1)}${
            x[i - 1]
        }`;
    } else if (lcs[i - 1][j] >= lcs[i][j - 1]) {
        return printLongestCommonSubsequence(lcs, x, y, i - 1, j);
    } else {
        return printLongestCommonSubsequence(lcs, x, y, i, j - 1);
    }
}
