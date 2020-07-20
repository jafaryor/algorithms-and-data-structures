import {
    longestIncreasingSubsequence,
    longestIncreasingSubsequenceDP,
} from '../longest-increasing-subsequence';

describe('Longest Increasing Subsequence', () => {
    let sequence: number[];
    let lis: number;

    it('case 01', () => {
        sequence = [3, 10, 2, 1, 20];
        lis = 3;
    });

    it('case 02', () => {
        sequence = [3, 2];
        lis = 1;
    });

    it('case 03', () => {
        sequence = [50, 3, 10, 7, 40, 80];
        lis = 4;
    });

    it('case 04', () => {
        sequence = [10, 22, 9, 33, 21, 50, 41, 60, 80];
        lis = 6;
    });

    it('case 05', () => {
        sequence = [10, 9, 2, 5, 3, 7, 101, 18];
        lis = 4;
    });

    it('case 06', () => {
        sequence = [9, 1, 3, 7, 5, 6, 20];
        lis = 5;
    });

    afterEach(() => {
        expect(longestIncreasingSubsequence(sequence)).toEqual(lis);
        expect(longestIncreasingSubsequenceDP(sequence)).toEqual(lis);
    });
});
