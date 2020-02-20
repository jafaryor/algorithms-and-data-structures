import { Matrix } from '../data-structures/matrix/index';

/**
 * multiplies two squared array of the same order by Divide and Conquer metod
 * @constrains: works only with matrices of even order
 * @complexity: O(n^3)
 * @param a
 * @param b
 */
export function matrixMultiplyWithDivideAndConquer(a: number[][], b: number[][]): number[][] {
    let isMatrixOrderIncreased: boolean = false;

    if (a.length === 1) {
        return Matrix.multiply1xMatrices(a, b);
    } else if (a.length === 2) {
        return Matrix.multiply2xMatrices(a, b);
    } else if (a.length % 2 !== 0) {
        // if order is odd, then increase order by adding zero column and zero row
        a = Matrix.increaseOrder(a);
        b = Matrix.increaseOrder(b);
        isMatrixOrderIncreased = true;
    }

    const order = a.length;
    const mid = order / 2;
    // deviding each array into frour pieces
    const dividedA = [
        [Matrix.subMatrix(a, 0, 0, mid, mid), Matrix.subMatrix(a, 0, mid, mid, order)],
        [Matrix.subMatrix(a, mid, 0, order, mid), Matrix.subMatrix(a, mid, mid, order, order)]
    ];
    const dividedB = [
        [Matrix.subMatrix(b, 0, 0, mid, mid), Matrix.subMatrix(b, 0, mid, mid, order)],
        [Matrix.subMatrix(b, mid, 0, order, mid), Matrix.subMatrix(b, mid, mid, order, order)]
    ];
    // doing the same operation as in case of multiplication of two squared matrices of order two
    const result = Matrix.merge(
        Matrix.add(
            matrixMultiplyWithDivideAndConquer(dividedA[0][0], dividedB[0][0]),
            matrixMultiplyWithDivideAndConquer(dividedA[0][1], dividedB[1][0])
        ),
        Matrix.add(
            matrixMultiplyWithDivideAndConquer(dividedA[0][0], dividedB[0][1]),
            matrixMultiplyWithDivideAndConquer(dividedA[0][1], dividedB[1][1])
        ),
        Matrix.add(
            matrixMultiplyWithDivideAndConquer(dividedA[1][0], dividedB[0][0]),
            matrixMultiplyWithDivideAndConquer(dividedA[1][1], dividedB[1][0])
        ),
        Matrix.add(
            matrixMultiplyWithDivideAndConquer(dividedA[1][0], dividedB[0][1]),
            matrixMultiplyWithDivideAndConquer(dividedA[1][1], dividedB[1][1])
        )
    );

    return isMatrixOrderIncreased ? Matrix.decreaseOrder(result) : result;
}

/**
 * multiplies two squared array by Strassen's Algorithm
 * @complexity: O(n^(lg7))
 * @url: https://www.geeksforgeeks.org/easy-way-remember-strassens-matrix-equation/
 * @code: https://github.com/dmitr1y/StrassenVizi/blob/master/files/js/Strassen.js
 * @param a
 * @param b
 */
export function StrassenAlgorithm(a: number[][], b: number[][]): number[][] {
    /*
    That is, instead of performing eight recursive multiplications of n/2 * n/2 matrices,
    it performs only seven. The cost of eliminating one matrix multiplication will be
    several new additions of n/2 * n/2 matrices, but still only a constant number of additions.
    */
    // TODO: implement the algorithm
    return [[]];
}
