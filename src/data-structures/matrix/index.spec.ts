import {Matrix} from '.';

describe('Matrix', () => {
    describe('Solve System of Linear Equations using LUP Decomposition', () => {
        let A: number[][];
        let x: number[];
        let b: number[];
        let L: number[][];
        let U: number[][];
        let P: number[][];

        describe('Case 01', () => {
            beforeEach(() => {
                A = [
                    [1, 2, 0],
                    [3, 4, 4],
                    [5, 6, 3],
                ];
                b = [3, 7, 8];

                const lup = Matrix.lupDecomposition(A);

                L = lup.L;
                U = lup.U;
                P = lup.P;

                x = Matrix.lupSolve(L, U, P, b);
            });

            it('L', () => {
                expect(L).toEqual([
                    [1, 0, 0],
                    [0.2, 1, 0],
                    [0.6, 0.5, 1],
                ]);
            });

            it('U', () => {
                expect(U).toEqual([
                    [5, 6, 3],
                    [0, 0.8, -0.6],
                    [0, 0, 2.5],
                ]);
            });

            it('P', () => {
                expect(P).toEqual([
                    [0, 0, 1],
                    [1, 0, 0],
                    [0, 1, 0],
                ]);
            });

            it('x', () => {
                expect(x).toEqual([-1.4, 2.2, 0.6]);
            });
        });

        describe('Case 02', () => {
            beforeEach(() => {
                A = [
                    [2, 0, 2, 0.6],
                    [3, 3, 4, -2],
                    [5, 5, 4, 2],
                    [-1, -2, 3.4, -1],
                ];
                b = [12.6, 27, 45, -4.2];

                const lup = Matrix.lupDecomposition(A);

                L = lup.L;
                U = lup.U;
                P = lup.P;

                x = Matrix.lupSolve(L, U, P, b);
            });

            it('L', () => {
                expect(L).toEqual([
                    [1, 0, 0, 0],
                    [0.4, 1, 0, 0],
                    [-0.2, 0.5, 1, 0],
                    [0.6, 0, 0.4, 1],
                ]);
            });

            it('U', () => {
                expect(U).toEqual([
                    [5, 5, 4, 2],
                    [0, -2, 0.4, -0.2],
                    [0, 0, 4, -0.5],
                    [0, 0, 0, -3],
                ]);
            });

            it('P', () => {
                expect(P).toEqual([
                    [0, 0, 1, 0],
                    [1, 0, 0, 0],
                    [0, 0, 0, 1],
                    [0, 1, 0, 0],
                ]);
            });

            it('x', () => {
                expect(x).toEqual([4, 3, 2, 1]);
            });
        });

        describe('Case 03', () => {
            beforeEach(() => {
                A = [
                    [2, 3, 1, 5],
                    [6, 13, 5, 19],
                    [2, 19, 10, 23],
                    [4, 10, 11, 31],
                ];

                const lu = Matrix.luDecomposition(A);

                L = lu.L;
                U = lu.U;
            });

            it('L', () => {
                expect(L).toEqual([
                    [1, 0, 0, 0],
                    [3, 1, 0, 0],
                    [1, 4, 1, 0],
                    [2, 1, 7, 1],
                ]);
            });

            it('U', () => {
                expect(U).toEqual([
                    [2, 3, 1, 5],
                    [0, 4, 2, 4],
                    [0, 0, 1, 2],
                    [0, 0, 0, 3],
                ]);
            });
        });
    });
});
