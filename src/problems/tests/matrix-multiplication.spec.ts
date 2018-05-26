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

    afterEach(() => {
        if (a.length < 3 || a.length % 2 === 0) {
            expect(matrixMultiplyWithDevideAndConquer(a, b)).toEqual(result);
        } else {
            expect(() => matrixMultiplyWithDevideAndConquer(a, b)).toThrowError();
        }
    });

    afterEach(() => {
        expect(Matrix.multiply(a, b)).toEqual(result);
    });
});