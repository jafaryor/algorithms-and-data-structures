import { findMaxSubArray, KadaneAlgorithms } from '../max-subarray';

describe('MaxSubArrayProblemSpec', () => {
    let input: number[];
    let output: number[];
    let sum: number;

    it('basic case', () => {
        input = [13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7];
        output = [18, 20, -7, 12];
        sum = 43;
    });

    it('if no negative number then whole array is max sub-array', () => {
        input = [1, 2, 3, 4, 5];
        output = input;
        sum = 15;
    });

    it('single item', () => {
        input = [7];
        output = input;
        sum = 7;
    });

    // Devide and Conquire Method
    afterEach(() => {
        const result = findMaxSubArray(input);

        expect(input.slice(result.left, result.right + 1)).toEqual(output);
        expect(result.sum).toEqual(sum);
    });

    // Kadane Algorihm
    afterEach(() => {
        expect(KadaneAlgorithms(input)).toEqual(sum);
    });
});