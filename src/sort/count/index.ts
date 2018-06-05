import { findExtremes } from '../../utils';

/**
 * Count Sort (can sort negative integers as well)
 * @complexity - O((max - min + n)
 * @param array - array to be sorted
 * @param min - min possible value
 * @param max - max possible value
 */
export function countSort(array: number[], min?: number, max?: number): number[] {
    let i: number;
    let j: number = 0;
    const count: number[] = []; // count array

    // if no max or min is provided, find them out
    if (!min || !max) {
        const extremes = findExtremes(array);

        min = extremes.min;
        max = extremes.max;
    }

    // initialize count array with 0
    for (i = min; i <= max; i++) {
        count[i] = 0;
    }

    // counting occurrences of each number of array
    for (i = 0; i < array.length; i++) {
        count[array[i]]++;
    }

    // form sorted array
    for (i = min; i <= max; i++) {
        while (count[i]-- > 0) {
            array[j++] = i;
        }
    }

    return array;
}
