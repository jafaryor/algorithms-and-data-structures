import {cloneDeep, constant, times} from 'lodash';
import {
    createArrayAndFillWith,
    createArrayWithIncrementingValues,
    round,
    swap,
} from '../../utils';

/**
 * The 2D Matrix.
 */
export class Matrix {
    /**
     * Solves the system of equations Ax = b using LUP decomposition method.
     * PA = LU
     * @param L - lower-triangle matrix.
     * @param U - upper-triangle matrix.
     * @param P - permutation matrix.
     * @complexity O(n^2)
     */
    static lupSolve(
        L: number[][],
        U: number[][],
        P: number[][],
        b: number[],
    ): number[] {
        let sum: number;
        const n = L.length;
        const x = new Array(n);
        const y = new Array(n);
        const p = Matrix.permutationToCompact(P);

        // Forward Substitution.
        for (let i = 0; i < n; i++) {
            sum = 0;

            for (let j = 0; j < i; j++) {
                sum += L[i][j] * y[j];
            }

            y[i] = b[p[i]] - sum;
        }

        // Back Substitution.
        for (let i = n - 1; i >= 0; i--) {
            sum = 0;

            for (let j = i + 1; j < n; j++) {
                sum += U[i][j] * x[j];
            }

            x[i] = round((y[i] - sum) / U[i][i]);
        }

        return x;
    }

    /**
     * Computes an LU decomposition of a matrix using Gaussian Elimination method.
     * @complexity O(n^3)
     */
    static luDecomposition(A: number[][]): {
        L: number[][];
        U: number[][];
    } {
        const n = A.length;
        const L = [] as number[][];
        const U = [] as number[][];

        A = cloneDeep(A);

        // Initialize L and U matrices.
        for (let i = 0; i < n; i++) {
            L.push(new Array(n));
            U.push(new Array(n));

            for (let j = 0; j < n; j++) {
                if (i < j) {
                    // Above diagonal.
                    // Init L with 0s above the main diagonal.
                    L[i][j] = 0;
                } else if (i > j) {
                    // Below diagonal.
                    // Init U with 0s below the main diagonal.
                    U[i][j] = 0;
                }
            }

            // Init L with 1s on the main diagonal.
            L[i][i] = 1;
        }

        for (let k = 0; k < n; k++) {
            // Pivot.
            U[k][k] = round(A[k][k]);

            for (let i = k + 1; i < n; i++) {
                L[i][k] = round(A[i][k] / U[k][k]);
                U[k][i] = round(A[k][i]);
            }

            for (let i = k + 1; i < n; i++) {
                for (let j = k + 1; j < n; j++) {
                    A[i][j] = A[i][j] - L[i][k] * U[k][j];
                }
            }
        }

        return {L, U};
    }

    /**
     * Computes an LUP decomposition of a matrix using Gaussian Elimination method.
     * @complexity O(n^3)
     */
    static lupDecomposition(A: number[][]): {
        L: number[][];
        U: number[][];
        P: number[][];
    } {
        // Pivot.
        let pivot: number;
        let pivotRow: number;
        const n = A.length;
        const L = [] as number[][];
        const U = [] as number[][];
        let P = [] as number[][];
        const pi = createArrayWithIncrementingValues(n, 0);

        A = cloneDeep(A);

        // Computes the LUP decomposition using Gaussian Elimination.
        for (let k = 0; k < n; k++) {
            pivot = 0;

            for (let i = k; i < n; i++) {
                // Determines an element with largest absolute value.
                if (Math.abs(A[i][k]) > pivot) {
                    pivot = Math.abs(A[i][k]);
                    pivotRow = i;
                }
            }

            if (pivot === 0) {
                throw new Error('The matrix is singular!');
            }

            swap(pi, k, pivotRow!);

            // Swaps the rows k and pivotRow in matrix A.
            for (let i = 0; i < n; i++) {
                Matrix.swap(A, k, i, pivotRow!, i);
            }

            // Now pivot is A[k][k].
            for (let i = k + 1; i < n; i++) {
                A[i][k] = A[i][k] / A[k][k];

                for (let j = k + 1; j < n; j++) {
                    A[i][j] = A[i][j] - A[i][k] * A[k][j];
                }
            }
        }

        P = Matrix.compactToPermutation(pi);

        // Fetches L and U from modified A.
        for (let i = 0; i < n; i++) {
            L.push(new Array(n));
            U.push(new Array(n));

            for (let j = 0; j < n; j++) {
                if (i < j) {
                    // Above diagonal.
                    // Init L with 0s above the main diagonal.
                    L[i][j] = 0;
                    U[i][j] = round(A[i][j]);
                } else if (i > j) {
                    // Below diagonal.
                    // Init U with 0s below the main diagonal.
                    U[i][j] = 0;
                    L[i][j] = round(A[i][j]);
                }
            }

            // Main diagonal of L consists of 1s.
            L[i][i] = 1;
            U[i][i] = round(A[i][i]);
        }

        return {L, U, P};
    }

    /**
     * Inverts a matrix using LUP decomposition.
     * A * A^(-1) = I = A^(-1) * A
     * @complexity O(n^3)
     */
    static invert(matrix: number[][]): number[][] {
        let e: number[];
        const n = matrix.length;
        const I = Matrix.identity(n);
        const inverted = [] as number[][];

        // Compute LUP once, as the A remains unchanged.
        const lup = Matrix.lupDecomposition(matrix);
        const L = lup.L;
        const U = lup.U;
        const P = lup.P;

        /**
         * In each iteration we solve system of equations A * X[i] = I[i],
         * where:
         * X[i] - i-th column of inverted matrix.
         * I[i] - i-th column of identity matrix.
         */
        for (let i = 0; i < n; i++) {
            e = Matrix.column(I, i);

            inverted[i] = Matrix.lupSolve(L, U, P, e);
        }

        // Transposes, as the inverted matrix was build
        // row by row instead of column by column.
        return Matrix.transpose(inverted);
    }

    /**
     * Transposes a matrix.
     * Flips a matrix over its main diagonal.
     * @complexity O(N^2)
     */
    static transpose(matrix: number[][]): number[][] {
        const n = matrix.length;
        const transposed = [] as number[][];

        for (let i = 0; i < n; i++) {
            transposed.push(new Array(n));

            for (let j = 0; j < n; j++) {
                transposed[i][j] = matrix[j][i];
            }
        }

        return transposed;
    }

    /**
     * Returns an identity matrix of size n x n.
     * @complexity O(n^2)
     */
    static identity(order: number): number[][] {
        const I = [] as number[][];

        for (let i = 0; i < order; i++) {
            I.push(createArrayAndFillWith(order, 0));
            I[i][i] = 1;
        }

        return I;
    }

    /**
     * Return a column of a matrix as an array.
     * @complexity O(n)
     */
    static column(matrix: number[][], j: number): number[] {
        const column = [];

        for (let i = 0; i < matrix.length; i++) {
            column.push(matrix[i][j]);
        }

        return column;
    }

    /**
     * Converts a permutation matrix P to a compact form pi,
     * such that pi[i] indicated that P[i][p[i]] = 1.
     * @complexity O(n)
     */
    static permutationToCompact(P: number[][]): number[] {
        return P.reduce((pi: number[], row: number[], i: number) => {
            pi[i] = row.findIndex((el) => el === 1);

            return pi;
        }, []);
    }

    /**
     * Converts a compact representation pi of permutation matrix P to P,
     * such that pi[i] indicated that P[i][p[i]] = 1.
     * @complexity O(n)
     */
    static compactToPermutation(pi: number[]): number[][] {
        const n = pi.length;

        return pi.reduce((P: number[][], pi_i: number, i: number) => {
            P[i] = createArrayAndFillWith(n, 0);
            P[i][pi_i] = 1;

            return P;
        }, []);
    }

    /**
     * Swaps the [i][j] and [k][l] elements of matrix.
     */
    static swap(
        matrix: number[][],
        i: number,
        j: number,
        k: number,
        l: number,
    ): void {
        const temp = matrix[i][j];

        matrix[i][j] = matrix[k][l];
        matrix[k][l] = temp;
    }

    /**
     * Calculates the determinant of a matrix.
     * Determinant represents the matrix in term of a real number.
     * @assumes the matrix is squared.
     * @note numerically instable, which means the result is not accurate.
     * @complexity O(n^3 + n)
     */
    static determinant(matrix: number[][]): number {
        const n = matrix.length;
        const m = matrix[0].length;

        if (n !== m) {
            throw new Error('Matrix must be squared!');
        }

        if (n === 2) {
            return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        } else {
            const decomposition = Matrix.luDecomposition(matrix);
            let determinant = 1;

            for (let i = 0; i < n; i++) {
                determinant *= decomposition.L[i][i];
                determinant *= decomposition.U[i][i];
            }

            return round(determinant);
        }
    }

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
            0,
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
        columnEnd?: number,
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
        a22: number[][],
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
    static createEmptyMatrixOfSize<T = number>(i: number, j: number): T[][] {
        const matrix = new Array<T[]>(i);

        for (let k = 0; k < i; k++) {
            matrix[k] = new Array<T>(j);
        }

        return matrix;
    }

    /**
     * Creates and array of sze "size" and fills it with "value".
     */
    static createMatrixAndFillWith<T = number>(
        rows: number,
        columns: number,
        value: T,
    ): T[][] {
        const matrix = new Array<T[]>(rows);

        for (let i = 0; i < rows; i++) {
            matrix[i] = times(columns, constant(value));
        }

        return matrix;
    }
}

export interface MatrixSize {
    rows: number;
    columns: number;
}
