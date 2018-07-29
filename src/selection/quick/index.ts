import {partition} from '../../sort/quick';

/**
 * Returns the k-th smallest element of list within left..right inclusive
 * @param array - source
 * @param left - left pointer index
 * @param right - right pointer index
 * @param k-th smallest element (0 <= k <= array.length-1)
 */
export function quickSelect(array: number[], left: number, right: number, k: number = 0): number {
    if (left === right) {
        return array[left];
    }

    const mid = Math.floor((left + right) / 2);
    const pivotIndex = partition(array, left, right, array[mid]);

    if (k === pivotIndex) {
        return array[k];
    } else if (k < pivotIndex) {
        return quickSelect(array, left, pivotIndex - 1, k);
    } else {
        return quickSelect(array, pivotIndex + 1, right, k);
    }
}

/**
 * QuickSelect Algorithm implemented with loop instead of recursion
 * @param array - source
 * @param left - left pointer index
 * @param right - right pointer index
 * @param k-th smallest element (0 <= k <= array.length-1)
 */
export function quickSelectWithLoop(array: number[], left: number, right: number, k: number = 0): number {
    while (true) {
        if (left === right) {
            return array[left];
        }

        const mid = Math.floor((left + right) / 2);
        const pivotIndex = partition(array, left, right, array[mid]);

        if (k === pivotIndex) {
            return array[k];
        } else if (k < pivotIndex) {
            right = pivotIndex - 1;
        } else {
            left = pivotIndex + 1;
        }
    }
}