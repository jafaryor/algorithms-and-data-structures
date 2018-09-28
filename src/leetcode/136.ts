/*
    Given a non-empty array of integers, every element appears twice except for one. Find that single one.
*/

/**
 * @time-complexity: O(n)
 * @space-complexity: O(1)
 * @param {number[]} nums
 * @return {number}
 */
export function singleNumber(nums: number[]): number {
    return nums.reduce((acc, k) => acc ^ k, 0);
}
