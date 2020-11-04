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
            matrixSizes.length,
        );

        // Parenthesis positions.
        expect(result).toEqual('((A1(A2A3))A4)');
        // Minimum number of scalar multiplications.
        expect(costs[1][matrixSizes.length]).toEqual(158);
        expect(recursiveCosts[1][matrixSizes.length]).toEqual(158);
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
            matrixSizes.length,
        );

        // Parenthesis positions.
        expect(result).toEqual('((A1(A2A3))((A4A5)A6))');
        // Minimum number of scalar multiplications.
        expect(costs[1][matrixSizes.length]).toEqual(15125);
        expect(recursiveCosts[1][matrixSizes.length]).toEqual(15125);
    });
});
