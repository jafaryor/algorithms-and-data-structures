export interface IMatrixSize {
    rows: number;
    columns: number;
}

export class Matrix {
    /**
     * validates matrix by setting undefined item to 0
     * @param matrix
     */
    public static validate(matrix: number[][]): number[][] {
        const { rows, columns } = Matrix.size(matrix);

        for (let i = 0; i < rows; ++i) {
            for (let j = 0; j < columns; ++j) {
                matrix[i][j] = matrix[i][j] || 0;
            }
        }

        return matrix;
    }

    /**
     * returns size of matrix
     * @param matrix
     */
    public static size(matrix: number[][]): IMatrixSize {
        const columns = !matrix.length ? 0 : matrix.length;
        const rows = matrix.reduce((maxRowLength, row) =>
            Math.max(maxRowLength, !row.length ? 0 : row.length), 0);

        return {
            rows,
            columns
        };
    }

    /**
     * Checks if size of two matrices is equal
     * @param a
     * @param b
     */
    public static isEqualSize(a: number[][], b: number[][]): boolean {
        const aSize = Matrix.size(a);
        const bSize = Matrix.size(b);

        return (aSize.rows === bSize.rows) && (aSize.columns === bSize.columns);
    }

    /**
     * return sub-matrix of the matrix
     * @param matrix
     * @param i - row index at which to begin extraction
     * @param j - column index at which to begin extraction
     * @param rows - row index before which to end extraction. If no value provided then extract till lart row
     * @param columns - column index before which to end extraction. If no value provided then extract till lat column
     */
    public static subMatrix(
        matrix: number[][],
        rowStart: number,
        columnStart: number,
        rowEnd?: number,
        columnEnd?: number): number[][] {
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
     * sums two matrices
     * @param a
     * @param b
     */
    public static add(a: number[][], b: number[][]): number[][] {
        if (!Matrix.isEqualSize(a, b)) {
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
     * naive method of multiplying matrices
     * @param a
     * @param b
     */
    public static multiply(a: number[][], b: number[][]): number[][] {
        const result: number[][] = [];

        for (let i = 0; i < a.length; ++i) {
            result[i] = [];

            for (let j = 0; j < a[i].length; ++j) {
                result[i][j] = 0;

                for (let k = 0; k < b.length; ++k) {
                    result[i][j] += a[i][k] * b[k][j];
                }
            }
        }

        return result;
    }

    /**
     * multiplies two squared matrices of order two
     * @param a
     * @param b
     */
    public static multiply2xMatrices(a: number[][], b: number[][]): number[][] {
        return [
            [ (a[0][0] * b[0][0] + a[0][1] * b[1][0]), (a[0][0] * b[0][1] + a[0][1] * b[1][1]) ],
            [ (a[1][0] * b[0][0] + a[1][1] * b[1][0]), (a[1][0] * b[0][1] + a[1][1] * b[1][1]) ]
        ];
    }

    /**
     * multiplies two matrices of order one
     * @param a
     * @param b
     */
    public static multiply1xMatrices(a: number[][], b: number[][]): number[][] {
        return [[ (a[0][0] * b[0][0]) ]];
    }

    /**
     * Combines all matrices in their index order, e.g. [[a11, a12], [a21, a22]]
     * @param a11
     * @param a12
     * @param a21
     * @param a22
     */
    public static formMatrixFromFourSquareMatrices(
        a11: number[][],
        a12: number[][],
        a21: number[][],
        a22: number[][]): number[][] {
        const result: number[][] = [];

        for (let i = 0; i < a11.length; ++i) {
            result[i] = [...a11[i], ...a12[i]];
        }

        for (let i = 0; i < a21.length; ++i) {
            result[i + a11.length] = [...a21[i], ...a22[i]];
        }

        return result;
    }
}