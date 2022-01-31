import {countSort} from '../count';

/**
 * LSD Radix Sort
 * Current implementation works only with positive integers
 * @time complexity: O(d(n + b))
 * @space complexity: O(w + n)
 * @param array
 */
export function radixSort(array: number[]): number[] {
    let result: number[] = array;
    const max = Math.max.apply(Math, array);

    for (let place = 1; Math.floor(max / place) > 0; place *= 10) {
        // place = [1, 10, 100, ...]
        result = countSort(result, 0, 9, place);
    }

    return result;
}
