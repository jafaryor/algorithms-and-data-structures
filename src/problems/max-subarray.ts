/*
 * Given an integer array, find the contiguous subarray (containing at least one number)
 * which has the largest sum and return its sum.
 * https://medium.com/@rsinghal757/kadanes-algorithm-dynamic-programming-how-and-why-does-it-work-3fd8849ed73d
 */

/**
 * Kadane's algorithm for solving maximum sub-array problem
 * Greedy algorithm.
 * @time O(n)
 */
export function kadaneAlgorithm(array: number[]): number {
    let currentSubarray = array[0];

    // Start with the 2nd element since we already used the first one.
    return array.reduce((maxSubarray, item) => {
        // If currentMax is negative, throw it away. Otherwise, keep adding to it.
        currentSubarray = Math.max(item, currentSubarray + item);

        return Math.max(maxSubarray, currentSubarray);
    }); // "maxSubarray" is already initialized with the first element.
}

/**
 * Finds maximum sub-array using divide-and-conquer method.
 * @time O(n log n)
 * @space O(log n)
 */
export function maxSubArray(array: number[]): number {
    return findBestSubarray(array, 0, array.length - 1);
}

function findBestSubarray(
    array: number[],
    left: number,
    right: number,
): number {
    // Base case - empty array.
    if (left > right) {
        return -Infinity;
    }

    const mid = Math.floor((left + right) / 2);
    let curr = 0;
    let bestLeftSum = 0;
    let bestRightSum = 0;

    // Iterate from the middle to the beginning.
    for (let i = mid - 1; i >= left; i--) {
        curr += array[i];
        bestLeftSum = Math.max(bestLeftSum, curr);
    }

    // Reset curr and iterate from the middle to the end.
    curr = 0;
    for (let i = mid + 1; i <= right; i++) {
        curr += array[i];
        bestRightSum = Math.max(bestRightSum, curr);
    }

    // The bestCombinedSum uses the middle element and the best
    // possible sum from each half.
    const bestCombinedSum = array[mid] + bestLeftSum + bestRightSum;

    // Find the best subarray possible from both halves.
    const leftHalf = findBestSubarray(array, left, mid - 1);
    const rightHalf = findBestSubarray(array, mid + 1, right);

    // The largest of the 3 is the answer for any given input array.
    return Math.max(bestCombinedSum, Math.max(leftHalf, rightHalf));
}

/**
 * Finds maximum sub-array using divide-and-conquer method.
 * @return not only max subarray sum, but also the left and right indices of the subarray.
 * @time O(n log n)
 * @space O(log n)
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

export interface SubArray {
    left: number;
    right: number;
    sum: number;
}
