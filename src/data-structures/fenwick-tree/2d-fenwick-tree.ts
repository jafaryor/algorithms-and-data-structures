/**
 * 2D Fenwick Tree.
 * @space O(n * m)
 * @note all indices must be one-based.
 */
export class MatrixFenwickTree {
    private readonly rows: number;
    private readonly cols: number;
    private readonly tree: number[][];

    /**
     * Builds the 2D tree.
     * @time O(n * logn * m * logm)
     */
    constructor(matrix: number[][]) {
        this.rows = matrix.length;
        this.cols = matrix[0].length;
        this.tree = new Array<number>(this.rows + 1)
            .fill(0)
            .map(() => new Array<number>(this.cols + 1).fill(0));

        for (let i = 1; i <= this.rows; i++) {
            for (let j = 1; j <= this.cols; j++) {
                this.add(i, j, matrix[i - 1][j - 1]);
            }
        }
    }

    /**
     * Returns he position of the first non-zero bit from
     * right in the binary representation.
     * Eventually, it is converted to decimal number.
     * @time O(1)
     */
    private rsb(i: number): number {
        return i & -i;
    }

    /**
     * Adds a "value" to the index [i, j].
     * @time O(logn * logm)
     */
    add(row: number, col: number, value: number): void {
        for (let i = row; i <= this.rows; i += this.rsb(i)) {
            for (let j = col; j <= this.cols; j += this.rsb(j)) {
                this.tree[i][j] += value;
            }
        }
    }

    /**
     * Computes the sum from [0, 0] to [i, j].
     * @time O(logn * logm)
     */
    prefixSum(row: number, col: number): number {
        let sum = 0;

        for (let i = row; i > 0; i -= this.rsb(i)) {
            for (let j = col; j > 0; j -= this.rsb(j)) {
                sum += this.tree[i][j];
            }
        }

        return sum;
    }

    /**
     * Range sum. Returns the sum of submatrix from [i, j] to [k, l].
     * [i, j] - coordinates of left top corner of the submatrix.
     * [k, l] - coordinates of right bottom corner of the submatrix.
     * @time O(logn * logm)
     */
    sum(i: number, j: number, k: number, l: number): number {
        return (
            this.prefixSum(k, l) -
            this.prefixSum(i - 1, l) -
            this.prefixSum(k, j - 1) +
            this.prefixSum(i - 1, j - 1)
        );
    }

    /**
     * Get the value at index [i, j].
     * @time O(logn * logm)
     */
    get(i: number, j: number): number {
        return this.sum(i, j, i, j);
    }

    /**
     * Update the value at index "i" to "value".
     * @time O(logn * logm)
     */
    update(i: number, j: number, value: number): void {
        this.add(i, j, value - this.get(i, j));
    }
}
