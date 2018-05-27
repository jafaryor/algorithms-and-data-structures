import { matrixMultiplyWithDevideAndConquer } from '../matrix-multiplication';
import { Matrix } from '../../classes/matrix';

describe('MatrixMultiplicationSpec', () => {
    let a: number[][];
    let b: number[][];
    let result: number[][];

    test('multply arrays of order one', () => {
        a = [[2]];
        b = [[4]];
        result = [[8]];
    });

    test('multply arrays of order three', () => {
        a = [[3, 5, -3], [8, 5, 8], [-3, -1, 0]];
        b = [[9, 4, 1], [-4, 5, 8], [-2, 6, -9]];
        result = [[13, 19, 70], [36, 105, -24], [-23, -17, -11]];
    });

    test('multply arrays of order four', () => {
        a = [[1, 0, -3, -2], [0, 2, 5, -7], [-3, 8, 6, 3], [-4, -1, -3, 0]];
        b = [[-1, -2, -3, -4], [5, 9, 6, 5], [-4, -6, 8, 1], [4, -5, -6, 3]];
        result = [[3, 26, -15, -13], [-38, 23, 94, -6], [31, 27, 87, 67], [11, 17, -18, 8]];
    });

    test('multiply arrays of order six', () => {
        a = [
            [1, 2, 3, 4, 0, 5],
            [0, 9, 7, 5, 3, 2],
            [5, 7, 6, 2, 0, -2],
            [-5, -4, -8, -5, -9, -7],
            [2, -3, 5, -4, 1, 5],
            [3, 3, -7, 4, 8, 0]
        ];
        b = [
            [8, -2, 7, -7, 3, 1],
            [-8, -9, 9, 1, 7, 8],
            [2, 3, 4, 5, 6, -5],
            [-4, -6, -9, -1, 3, 7],
            [-10, 5, 4, 1, 3, -8],
            [4, -9, -8, -7, 3, 1]
        ];
        result = [
            [2, -80, -39, -29, 62, 35],
            [-100, -93, 60, 28, 135, 50],
            [-20, -49, 120, 14, 100, 43],
            [58, 70, -38, 36, -154, 33],
            [76, 22, 7, -22, 21, -78],
            [-110, -38, 16, -49, 24, 26]
        ];
    });

    afterEach(() => {
        expect(matrixMultiplyWithDevideAndConquer(a, b)).toEqual(result);
    });

    afterEach(() => {
        expect(Matrix.multiply(a, b)).toEqual(result);
    });
});
