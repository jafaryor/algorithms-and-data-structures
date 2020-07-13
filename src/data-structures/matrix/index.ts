/**
 * The 2D Matrix.
 */
export class Matrix {
    /**
     * Increases the order of squared matrix by adding zero row and zero column
     * in order to make its order even (for Divide and Conquer
     * and Strassen algorithms) and returns new matrix.
     */
    static increaseOrder(matrix: number[][]): number[][] {
        const order = matrix.length;
        const result: number[][] = [];
        const zeroRow: number[] = [];

        for (let i = 0; i < order; ++i) {
            result.push([...matrix[i], 0]);
            zeroRow[i] = 0;
        }

        result.push([...zeroRow, 0]);

        return result;
    }

    /**
     * Removes last row and last column of the
     * squared matrix and returns new matrix.
     */
    static decreaseOrder(matrix: number[][]): number[][] {
        if (!matrix.length) {
            throw new Error('Cannot decrease order of empty matrix');
        }

        const newOrder = matrix.length - 1;
        const result: number[][] = [];

        for (let i = 0; i < newOrder; ++i) {
            result.push(matrix[i].slice(0, -1));
        }

        return result;
    }

    /**
     * Returns size of matrix.
     */
    static size(matrix: number[][]): MatrixSize {
        const columns = !matrix.length ? 0 : matrix.length;
        const rows = matrix.reduce(
            (maxRowLength, row) =>
                Math.max(maxRowLength, !row.length ? 0 : row.length),
            0
        );

        return {
            rows,
            columns,
        };
    }

    /**
     * Checks if size of two matrices is equal.
     */
    static equalSize(a: number[][], b: number[][]): boolean {
        const aSize = Matrix.size(a);
        const bSize = Matrix.size(b);

        return aSize.rows === bSize.rows && aSize.columns === bSize.columns;
    }

    /**
     * Checks if the matrix items are equal.
     */
    static equalItems(a: number[][], b: number[][]): boolean {
        for (let i = 0; i < a.length; ++i) {
            for (let j = 0; j < a[i].length; ++j) {
                if (a[i][j] !== b[i][j]) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Checks if two matrices are equal.
     */
    static equal(a: number[][], b: number[][]): boolean {
        return Matrix.equalSize(a, b) && Matrix.equalItems(a, b);
    }

    /**
     * Prints the matrix.
     */
    static toString(matrix: number[][]): void {
        /* tslint:disable */
        if (!matrix.length) console.log('| |');

        let row: string;
        console.log('');

        for (let i = 0; i < matrix.length; ++i) {
            row = '| ';
            for (let j = 0; j < matrix[i].length; ++j) {
                row += `${matrix[i][j]} `;
            }
            row += '|';
            console.log(row);
        }

        console.log('');
        /* tslint:enable */
    }

    /**
     * Return sub-matrix of the matrix.
     * @param matrix
     * @param i - row index at which to begin extraction
     * @param j - column index at which to begin extraction
     * @param rows - row index before which to end extraction. If no value provided then extract till lart row
     * @param columns - column index before which to end extraction. If no value provided then extract till lat column
     */
    static subMatrix(
        matrix: number[][],
        rowStart: number,
        columnStart: number,
        rowEnd?: number,
        columnEnd?: number
    ): number[][] {
        const subMatrix: number[][] = [];

        if (!rowEnd || !columnEnd) {
            const size = Matrix.size(matrix);
            rowEnd = rowEnd || size.rows;
            columnEnd = columnEnd || size.columns;
        }

        for (let n = rowStart; n < rowEnd; ++n) {
            subMatrix[n - rowStart] = [];

            for (let m = columnStart; m < columnEnd; ++m) {
                subMatrix[n - rowStart][m - columnStart] = matrix[n][m];
            }
        }

        return subMatrix;
    }

    /**
     * Sums two matrices.
     */
    static add(a: number[][], b: number[][]): number[][] {
        if (!Matrix.equalSize(a, b)) {
            throw new Error('Matrixes are not equal size!');
        }

        const c: number[][] = [];

        for (let i = 0; i < a.length; ++i) {
            c[i] = [];
            for (let j = 0; j < a[i].length; ++j) {
                c[i][j] = a[i][j] + b[i][j];
            }
        }

        return c;
    }

    /**
     * Subtracts second matrix from the first matrix.
     */
    static subtract(a: number[][], b: number[][]): number[][] {
        if (!Matrix.equalSize(a, b)) {
            throw new Error('Matrixes are not equal size!');
        }

        const c: number[][] = [];

        for (let i = 0; i < a.length; ++i) {
            c[i] = [];
            for (let j = 0; j < a[i].length; ++j) {
                c[i][j] = a[i][j] - b[i][j];
            }
        }

        return c;
    }

    /**
     * Naive method of multiplying compatible matrices.
     * @complexity - O(a.rows * a.columns * b.columns)
     */
    static multiply(a: number[][], b: number[][]): number[][] {
        const result: number[][] = [];

        // a.columns should be equal to b.rows.
        if (a[0].length !== b.length) {
            throw new Error('Incompatible Matrices');
        }

        for (let i = 0; i < a.length; ++i) {
            result[i] = [];

            for (let j = 0; j < b[i].length; ++j) {
                result[i][j] = 0;

                for (let k = 0; k < a[i].length; ++k) {
                    result[i][j] += a[i][k] * b[k][j];
                }
            }
        }

        return result;
    }

    /**
     * Multiplies two squared matrices of order two.
     */
    static multiply2xMatrices(a: number[][], b: number[][]): number[][] {
        return [
            [
                a[0][0] * b[0][0] + a[0][1] * b[1][0],
                a[0][0] * b[0][1] + a[0][1] * b[1][1],
            ],
            [
                a[1][0] * b[0][0] + a[1][1] * b[1][0],
                a[1][0] * b[0][1] + a[1][1] * b[1][1],
            ],
        ];
    }

    /**
     * Multiplies two matrices of order one.
     */
    static multiply1xMatrices(a: number[][], b: number[][]): number[][] {
        return [[a[0][0] * b[0][0]]];
    }

    /**
     * Combines all matrices in their index order, e.g.
     * [[a11, a12], [a21, a22]].
     */
    static merge(
        a11: number[][],
        a12: number[][],
        a21: number[][],
        a22: number[][]
    ): number[][] {
        const result: number[][] = [];

        for (let i = 0; i < a11.length; ++i) {
            result[i] = [...a11[i], ...a12[i]];
        }

        for (let i = 0; i < a21.length; ++i) {
            result[i + a11.length] = [...a21[i], ...a22[i]];
        }

        return result;
    }

    /**
     * Creates an empty matrix of size i x j.
     */
    static createEmptyMatrixOfSize(i: number, j: number): number[][] {
        const matrix = new Array(i);

        for (let k = 0; k < i; k++) {
            matrix[k] = new Array(j);
        }

        return matrix;
    }
}

export interface MatrixSize {
    rows: number;
    columns: number;
}
