/*
 * Given an integer array, find the contiguous subarray (containing at least one number)
 * which has the largest sum and return its sum.
 */

export interface SubArray {
    left: number;
    right: number;
    sum: number;
}

/**
 * Finds maximum sub-array using divide-and-conquer method.
 * @time O(n logn)
 */
function findMaxSubArray(
    array: number[],
    left: number,
    right: number,
): SubArray {
    if (left === right) {
        // base case - only one element
        return {left, right, sum: array[left]};
    } else {
        const mid = Math.floor((left + right) / 2);

        const leftSubArr = findMaxSubArray(array, left, mid);
        const rightSubArr = findMaxSubArray(array, mid + 1, right);
        const crossSubArr = findMaxCrossingSubArray(array, left, mid, right);

        if (
            leftSubArr.sum >= rightSubArr.sum &&
            leftSubArr.sum >= crossSubArr.sum
        ) {
            // if left sub-array's sum is bigger than sum of other sub-arrays
            return leftSubArr;
        } else if (
            rightSubArr.sum >= leftSubArr.sum &&
            rightSubArr.sum >= crossSubArr.sum
        ) {
            // if right sub-array's sum is bigger than sum of other sub-arrays
            return rightSubArr;
        } else {
            // if cross sub-array's sum is bigger than sum of other sub-arrays
            return crossSubArr;
        }
    }
}

/**
 * Finds the maximum sum including the middle element.
 * @time O(n)
 */
function findMaxCrossingSubArray(
    array: number[],
    left: number,
    mid: number,
    right: number,
): SubArray {
    let sum: number;
    let maxLeft: number = mid;
    let maxRight: number = mid + 1;
    let leftSum: number = -Infinity;
    let rightSum: number = -Infinity;

    sum = 0;
    // finds max sub-array in left side of the array, by moving from mid to left bound
    for (let i = mid; i >= left; --i) {
        sum += array[i];

        if (sum > leftSum) {
            leftSum = sum;
            maxLeft = i;
        }
    }

    sum = 0;
    // finds max sub-array in right side of the array, by moving from mid to right bound
    for (let i = mid + 1; i <= right; ++i) {
        sum += array[i];

        if (sum > rightSum) {
            rightSum = sum;
            maxRight = i;
        }
    }

    return {left: maxLeft, right: maxRight, sum: leftSum + rightSum};
}

export function findMaximumSubArray(array: number[]): SubArray {
    return findMaxSubArray(array, 0, array.length - 1);
}

/**
 * Kadane's algorithm for solving maximum sub-array problem
 * Greedy algorithm.
 * @time O(n)
 */
export function KadaneAlgorithm(array: number[]): number {
    let currentMax: number = array[0];

    // Start with the 2nd element since we already used the first one.
    return array.reduce((max, item) => {
        // If currentMax is negative, throw it away. Otherwise, keep adding to it.
        currentMax = Math.max(item, currentMax + item);

        return Math.max(max, currentMax);
    }); // "max" is already initialized with the first element.
}
