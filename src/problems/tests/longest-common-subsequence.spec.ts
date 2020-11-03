import {
    longestCommonSubsequence,
    printLongestCommonSubsequence,
} from '../longest-common-subsequence';

describe('Longest Common Subsequence Problem', () => {
    let input1: string;
    let input2: string;
    let lcsString: string;
    let lcs: number[][];

    it('Case 01', () => {
        input1 = 'abcbdab';
        input2 = 'bdcaba';
        lcsString = 'bcba';
    });

    it('Case 02', () => {
        input1 = 'aatcc';
        input2 = 'acacg';
        lcsString = 'aac';
    });

    it('Case 03', () => {
        input1 = 'agtgatg';
        input2 = 'gttag';
        lcsString = 'gtag';
    });

    it('Case 04', () => {
        input1 = 'abcdgh';
        input2 = 'aedfhr';
        lcsString = 'adh';
    });

    it('Case 05', () => {
        input1 = 'aggtab';
        input2 = 'gxtxayb';
        lcsString = 'gtab';
    });

    afterEach(() => {
        lcs = longestCommonSubsequence(input1, input2);

        expect(
            printLongestCommonSubsequence(lcs, input1, input2, input1.length, input2.length),
        ).toEqual(lcsString);
    });
});
