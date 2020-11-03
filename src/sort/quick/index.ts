import {swap, randomFromRange} from '../../utils';

/**
 * Randomized Quick Sort
 * @time complexity [expected] - O(n logn)
 * @space complexity - O(1)
 * @param array - array to be sorted
 * @param left - left pointer
 * @param right - right pointer
 * @returns sorted array
 */
export function randomizedQuickSort(array: number[], left = 0, right = array.length - 1): number[] {
    if (left >= right) {
        return array;
    }

    const pivotIndex = randomizedPartition(array, left, right);

    randomizedQuickSort(array, left, pivotIndex - 1);
    randomizedQuickSort(array, pivotIndex + 1, right);

    return array;
}

/**
 * Randomized partitioning (Lomuto Partitioning)
 * @complexity - O(n)
 * @param array - array to be sorted
 * @param left - left pointer
 * @param right - right pointer
 * @returns partition pointer, pointer where the array should be divided by half
 */
export function randomizedPartition(array: number[], left = 0, right = array.length - 1): number {
    const k = randomFromRange(left, right);
    swap(array, k, right);

    return partition(array, left, right);
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
export function quickSort(
    array: number[],
    left: number = 0,
    right: number = array.length - 1,
): number[] {
    if (left >= right) {
        return array;
    }

    const pivotIndex = partition(array, left, right);

    quickSort(array, left, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, right);

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
export function partition(array: number[], left: number, right: number): number {
    const pivot = array[right]; // last element
    let i = left - 1; // last sorted element index

    for (let j = left; j < right; ++j) {
        if (array[j] <= pivot) {
            ++i;
            swap(array, i, j);
        }
    }

    // put the pivot element right after the lat moved element
    swap(array, ++i, right);

    return i;
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
