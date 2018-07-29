import { swap } from '../../utils';

/**
 * Returns the k-th smallest element of list within left..right inclusive
 * @complexity: O(n)
 * @param array - source
 * @param left - left pointer index
 * @param right - right pointer index
 * @param k-th smallest element (0 <= k <= array.length-1)
 */
export function quickSelect(
    array: number[],
    k: number = 0,
    left: number = 0,
    right: number = array.length - 1
): number {
    if (left === right) {
        return array[left];
    }

    const mid = Math.floor((left + right) / 2);
    const pivotIndex = partition(array, left, right, mid);
    // const i = pivotIndex + 1 - left; // number of elements in less part of partiotion

    if (k === pivotIndex) {
        // the desired element if found
        return array[k];
    } else if (k < pivotIndex) {
        // the desired element lies on the low side of the partition
        return quickSelect(array, k, left, pivotIndex - 1);
    } else {
        // the desired element lies on the high side of the partition
        return quickSelect(array, k, pivotIndex + 1, right);
    }
}

/**
 * QuickSelect Algorithm implemented with loop instead of recursion
 * @complexity: O(n)
 * @param array - source
 * @param left - left pointer index
 * @param right - right pointer index
 * @param k-th smallest element (0 <= k <= array.length-1)
 */
export function quickSelectWithLoop(
    array: number[],
    k: number = 0,
    left: number = 0,
    right: number = array.length - 1
): number {
    while (true) {
        if (left === right) {
            return array[left];
        }

        const mid = Math.floor((left + right) / 2);
        const pivotIndex = partition(array, left, right, mid);

        if (k === pivotIndex) {
            return array[k];
        } else if (k < pivotIndex) {
            right = pivotIndex - 1;
        } else {
            left = pivotIndex + 1;
        }
    }
}

/**
 * partitions the array so that
 * left side with respect to the pivot is less than the pivot
 * and the right side is bigger than the pivot
 * @complexity: O(n)
 * @param array - array to be partitioned
 * @param left - left pointer index
 * @param right - right pointer index
 * @param pivotIndex - pivot index
 */
function partition(array: number[], left: number, right: number, pivotIndex: number): number {
    const pivotValue = array[pivotIndex];
    swap(array, pivotIndex, right); // Move pivot to end

    for (let i = left; i < right; i++) {
        if (array[i] < pivotValue) {
            swap(array, left, i);
            left++;
        }
    }

    swap(array, left, right); // Move pivot to its final place

    return left;
}
