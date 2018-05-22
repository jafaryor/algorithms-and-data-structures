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
function findMaximumSubArray(array: number[], left: number, right: number): ISubArray {
    if (left === right) {
        // base case - only one element
        return { left, right, sum: array[left] };
    } else {
        const mid = Math.floor((left + right) / 2);

        const leftSubArr = findMaximumSubArray(array, left, mid);
        const rightSubArr = findMaximumSubArray(array, mid + 1, right);
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

export function findMaxSubArray(array: number[]): ISubArray {
    return findMaximumSubArray(array, 0, array.length - 1);
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