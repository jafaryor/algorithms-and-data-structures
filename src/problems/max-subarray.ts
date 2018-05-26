/*
    Suppose that you been offered the opportunity to invest in the Volatile Chemical Corporation.
    Like the chemicals the company produces, the stock price of the Volatile Chemical Corporation
    is rather volatile. Your goal is to maximize your profit.

    Instead of looking at the daily prices, let us instead consider the daily change in price,
    where the change on day i is the difference between the prices after day i-1 and after day i.
*/

export interface ISubArray {
    left: number;
    right: number;
    sum: number;
}

/**
 * Finds the maximum sum including the middle element.
 * @complexity - O(n)
 * @param array - the array
 * @param left - left index in the array
 * @param mid - mid index in the array
 * @param right - right index in the array
 */
function findMaxCrossingSubArray(array: number[], left: number, mid: number, right: number): ISubArray {
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

    return { left: maxLeft, right: maxRight, sum: leftSum + rightSum };
}

/**
 * finds maximum sub-array using devide-and-conquier method
 * @complexity - O(n logn)
 * @param array - the array
 * @param left - left index in the array
 * @param right - right index in the array
 */
function findMaxSubArray(array: number[], left: number, right: number): ISubArray {
    if (left === right) {
        // base case - only one element
        return { left, right, sum: array[left] };
    } else {
        const mid = Math.floor((left + right) / 2);

        const leftSubArr = findMaxSubArray(array, left, mid);
        const rightSubArr = findMaxSubArray(array, mid + 1, right);
        const crossSubArr = findMaxCrossingSubArray(array, left, mid, right);

        if (leftSubArr.sum >= rightSubArr.sum && leftSubArr.sum >= crossSubArr.sum) {
            // if left sub-array's sum is bigger than sum of other sub-arrays
            return leftSubArr;
        } else if (rightSubArr.sum >= leftSubArr.sum && rightSubArr.sum >= crossSubArr.sum) {
            // if right sub-array's sum is bigger than sum of other sub-arrays
            return rightSubArr;
        } else {
            // if cross sub-array's sum is bigger than sum of other sub-arrays
            return crossSubArr;
        }
    }
}

export function findMaximumSubArray(array: number[]): ISubArray {
    return findMaxSubArray(array, 0, array.length - 1);
}

/**
 * Kadane's algorithm for solving maximum sub-array problem
 * @complexity - O(n)
 * @param array - the array
 */
export function KadaneAlgorithm(array: number[]): number {
    let currentMax: number = array[0];

    return array.reduce((max, item) => {
        currentMax = Math.max(item, currentMax + item);

        return Math.max(max, currentMax);
    });
}