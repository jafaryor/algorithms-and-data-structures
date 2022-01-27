import {createArrayAndFillWith} from '../utils';

/**
 * The Longest Increasing Subsequence (LIS) problem is to find the length
 * of the longest subsequence of a given sequence such that all elements
 * of the subsequence are sorted in increasing order. For example,
 * the length of LIS for {10, 22, 9, 33, 21, 50, 41, 60, 80} is
 * 6 and LIS is {10, 22, 33, 50, 60, 80}.
 */

/**
 * Finds the length of the Longest Increasing Subsequence
 * using Dynamic Programming.
 * @time O(n^2) - arithmetic progression.
 * @space O(n)
 * @see - /images/longest-increasing-subsequence.jpg
 * @see - https://www.geeksforgeeks.org/longest-increasing-subsequence-dp-3/
 */
export function longestIncreasingSubsequenceDP(sequence: number[]): number {
    const n = sequence.length;
    // This array keeps the records of the length of longest increasing
    // subsequence in which each element is part of. The LIS array is
    // initializes with 0, because each element is a an increasing
    // subsequence of length 1.
    const lis = createArrayAndFillWith<number>(n, 1);

    // The last index of current subsequence.
    for (let i = 0; i < n; i++) {
        // Calculates the length of increasing
        // subsequence for indices [0, i-1].
        for (let j = 0; j < i; j++) {
            // Another increasing subsequence is found.
            if (sequence[i] > sequence[j]) {
                lis[i] = Math.max(lis[i], lis[j] + 1);
            }
        }
    }

    // Return max value in array.
    return Math.max(...lis);
}

/**
 * Let A be the input. Algorithm is:
 * 1. If A[i] is smallest among all end candidates of active lists,
 *      we will start new active list of length 1.
 * 2. If A[i] is largest among all end candidates of active lists,
 *      we will clone the largest active list, and extend it by A[i].
 * 3. If A[i] is in between, we will find a list with largest end element
 *      that is smaller than A[i]. Clone and extend this list by A[i].
 *      We will discard all other lists of same length as that of this
 *      modified list.
 * Note: At any instance during our construction of active lists,
 * the following condition is maintained. “End element of smaller list
 * is smaller than end elements of larger lists”.
 * @time O(n lgn)
 */
export function longestIncreasingSubsequence(sequence: number[]): number {
    const tailTable: number[] = new Array<number>(sequence.length);
    // Pointer to the empty slot.
    let len = 1;

    tailTable[0] = sequence[0];

    for (let i = 1; i < sequence.length; i++) {
        if (sequence[i] < tailTable[0]) {
            // New smallest value.
            tailTable[0] = sequence[i];
        } else if (sequence[i] > tailTable[len - 1]) {
            // sequence[i] wants to extend largest subsequence.
            tailTable[len++] = sequence[i];
        } else {
            // sequence[i] wants to be current end candidate of an existing
            // subsequence. It will replace ceil value in tailTable.
            tailTable[binarySearch(tailTable, -1, len - 1, sequence[i])] =
                sequence[i];
        }
    }

    return len;
}

/**
 * Binary Search.
 * Note: Works only for ascending sorted arrays.
 * @time O(lg n)
 */
function binarySearch(
    sequence: number[],
    left: number,
    right: number,
    key: number,
): number {
    let median: number;

    while (right - left > 1) {
        median = left + (right - left) / 2;

        if (sequence[median] >= key) {
            right = median;
        } else {
            left = median;
        }
    }

    return right;
}
