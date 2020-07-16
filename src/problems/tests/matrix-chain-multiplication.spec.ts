import {
    matrixChainOrder,
    printOptimalParenthesis,
    recursiveMatrixChain,
} from '../matrix-chain-multiplication';

describe('Matrix-chain Multiplication', () => {
    it('4 matrices', () => {
        const matrixSizes = [
            {
                rows: 5,
                columns: 4,
            },
            {
                rows: 4,
                columns: 6,
            },
            {
                rows: 6,
                columns: 2,
            },
            {
                rows: 2,
                columns: 7,
            },
        ];
        const {costs, positions} = matrixChainOrder(matrixSizes);
        const recursiveCosts = recursiveMatrixChain(matrixSizes);
        const result = printOptimalParenthesis(
            positions,
            1,
            matrixSizes.length
        );

        // Parenthesis positions.
        expect(result).toEqual('((A1(A2A3))A4)');
        // Minimum number of scalar multiplications.
        expect(costs[1][matrixSizes.length]).toEqual(158);
        expect(costs).toEqual([
            [undefined, undefined, undefined, undefined, undefined],
            [undefined, 0, 120, 88, 158],
            [undefined, undefined, 0, 48, 104],
            [undefined, undefined, undefined, 0, 84],
            [undefined, undefined, undefined, undefined, 0],
        ]);
        expect(positions).toEqual([
            [undefined, undefined, undefined, undefined, undefined],
            [undefined, undefined, 1, 1, 3],
            [undefined, undefined, undefined, 2, 3],
            [undefined, undefined, undefined, undefined, 3],
        ]);
        expect(recursiveCosts).toEqual(costs);
    });

    it('6 matrices', () => {
        const matrixSizes = [
            {
                rows: 30,
                columns: 35,
            },
            {
                rows: 35,
                columns: 15,
            },
            {
                rows: 15,
                columns: 5,
            },
            {
                rows: 5,
                columns: 10,
            },
            {
                rows: 10,
                columns: 20,
            },
            {
                rows: 20,
                columns: 25,
            },
        ];
        const {costs, positions} = matrixChainOrder(matrixSizes);
        const recursiveCosts = recursiveMatrixChain(matrixSizes);
        const result = printOptimalParenthesis(
            positions,
            1,
            matrixSizes.length
        );

        // Parenthesis positions.
        expect(result).toEqual('((A1(A2A3))((A4A5)A6))');
        // Minimum number of scalar multiplications.
        expect(costs[1][matrixSizes.length]).toEqual(15125);
        expect(costs).toEqual([
            [
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
            ],
            [undefined, 0, 15750, 7875, 9375, 11875, 15125],
            [undefined, undefined, 0, 2625, 4375, 7125, 10500],
            [undefined, undefined, undefined, 0, 750, 2500, 5375],
            [undefined, undefined, undefined, undefined, 0, 1000, 3500],
            [undefined, undefined, undefined, undefined, undefined, 0, 5000],
            [
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                0,
            ],
        ]);
        expect(positions).toEqual([
            [
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
            ],
            [undefined, undefined, 1, 1, 3, 3, 3],
            [undefined, undefined, undefined, 2, 3, 3, 3],
            [undefined, undefined, undefined, undefined, 3, 3, 3],
            [undefined, undefined, undefined, undefined, undefined, 4, 5],
            [
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                5,
            ],
        ]);
        expect(recursiveCosts).toEqual(costs);
    });
});
