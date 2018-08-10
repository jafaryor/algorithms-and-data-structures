import { swap, shuffle } from '../../utils';

/**
 * Randomises the array before sorting
 * @complexity - O(n*log) even in worst case
 * @param array
 * @param left
 * @param right
 */
export function randomizedQuickSort(array: number[], left: number = 0, right: number = array.length - 1): number[] {
    const shuffledArray = shuffle(array);

    return quickSort(shuffledArray);
}

/**
 * Quick Sort
 * @time complexity - O(n logn)
 * @space complexity - O(1)
 * @param array - array to be sorted
 * @param left - left pointer
 * @param right - right pointer
 * @returns sorted array
 */
export function quickSort(array: number[], left: number = 0, right: number = array.length - 1): number[] {
    if (left >= right) {
        return array;
    }

    const mid = Math.floor((left + right) / 2);
    const pivotIndex = partition(array, left, right, array[mid]);

    quickSort(array, left, pivotIndex - 1);
    quickSort(array, pivotIndex, right);

    return array;
}

/**
 * moves big item, compared to pivot to left AND small item, compared to pivot to right
 * @complexity - O(n)
 * @param array - array to be sorted
 * @param left - left pointer index
 * @param right - right pointer index
 * @param pivot - pivot value
 * @returns partition pointer, pointer where the array should be divided by half
 */
export function partition(array: number[], left: number, right: number, pivot: number): number {
    while (left <= right) {
        while (array[left] < pivot) {
            ++left;
        }

        while (array[right] > pivot) {
            --right;
        }

        if (left <= right) {
            swap(array, left, right);
            ++left;
            --right;
        }
    }

    return left;
}

/**
 * Basic Quick Sort
 * @time complexity - O(n logn)
 * @space complexity - O(n)
 * @param array - array to be sorted
 */
export function quickSortBasic(array: number[]): number[] {
    if (array.length === 0) return [];

    const left = [];
    const right = [];
    const pivot = array[0];

    for (let i = 1; i < array.length; i++) {
        if (array[i] < pivot) {
            left.push(array[i]);
        } else {
            right.push(array[i]);
        }
    }

    return [...quickSortBasic(left), pivot, ...quickSortBasic(right)];
}
