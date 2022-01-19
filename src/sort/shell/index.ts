import {swap} from '../../utils';

/**
 * Shell Sorting
 * @timeO(n^(3/2))
 */
export function shellSort(array: number[]): number[] {
    const n = array.length;
    // Interval size.
    let h = 1;

    // Find the interval less and closest to the n/3.
    while (h < n / 3) h = 3 * h + 1;

    while (h >= 1) {
        // h-sort the array.
        for (let i = h; i < n; i++) {
            // Insert a[i] among a[i-h], a[i-2h], a[i-3h], ...
            for (let j = i; j >= h && array[j] < array[j - h]; j -= h) {
                swap(array, j, j - h);
            }
        }

        // Reduce the interval size by third.
        h = h / 3;
    }

    return array;
}
