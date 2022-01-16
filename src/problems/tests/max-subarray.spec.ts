import {findMaximumSubArray, KadaneAlgorithm} from '../max-subarray';

describe('MaxSubArrayProblemSpec', () => {
    let input: number[];
    let output: number[];
    let sum: number;

    it('basic case', () => {
        input = [
            13, -3, -25, 20, -3, -16, -23, 18, 20, -7, 12, -5, -22, 15, -4, 7,
        ];
        output = [18, 20, -7, 12];
        sum = 43;
    });

    it('no negative number, then whole array is max sub-array', () => {
        input = [1, 2, 3, 4, 5];
        output = input;
        sum = 15;
    });

    it('all items are negative, then will return a single-element array with the largest negative integer.', () => {
        input = [-1, -2, -3, -4, -5];
        output = [-1];
        sum = -1;
    });

    it('single item', () => {
        input = [7];
        output = input;
        sum = 7;
    });

    // Divide and Conquire Method
    afterEach(() => {
        const result = findMaximumSubArray(input);

        expect(input.slice(result.left, result.right + 1)).toEqual(output);
        expect(result.sum).toEqual(sum);
    });

    // Kadane Algorihm
    afterEach(() => expect(KadaneAlgorithm(input)).toEqual(sum));
});
