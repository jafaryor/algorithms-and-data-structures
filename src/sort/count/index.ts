import {findExtremes} from '../../utils';
import {isNumber} from 'lodash';

/**
 * Count Sort (can sort negative integers as well)
 * Space complexity for RadixSort is equal to O(10 + n) = O(n)
 * @time complexity - O(max - min + n)
 * @space complexity - O(max - min + n)
 * @param array - array to be sorted
 * @param min - min possible value
 * @param max - max possible value
 * @param digitPlace - [1, 10, 100, ...]. Used only in RadixSort!
 */
export function countSort(
    array: number[],
    min?: number,
    max?: number,
    digitPlace?: number,
): number[] {
    let i: number;
    let digit: number;
    const count: number[] = []; // count array
    const result: number[] = []; // sorted array

    // if no max or min is provided, find them out
    if (!isNumber(min) || !isNumber(max)) {
        const extremes = isNumber(digitPlace)
            ? {min: 0, max: 9}
            : findExtremes(array);

        min = extremes.min;
        max = extremes.max;
    }

    // all counts start from zero
    for (i = min; i <= max; ++i) {
        count[i] = 0;
    }

    // counting occurrences of each number of array
    for (i = 0; i < array.length; ++i) {
        // count digitIndex-th digit from array[j] if digitIndex was passed
        digit = getDigit(array[i], digitPlace);
        // count
        count[digit] = count[digit] >= 0 ? ++count[digit] : 0;
    }

    // sum counts from left to right
    for (i = min + 1; i <= max; ++i) {
        count[i] += count[i - 1];
    }

    // form sorted array
    for (i = array.length - 1; i >= 0; --i) {
        digit = getDigit(array[i], digitPlace);

        result[--count[digit]] = array[i];
    }

    return result;
}

// returns digit with index 'index' from 'value'. If didn't find => returns '0'
const getDigit = (value: number, digitPlace: number | undefined): number =>
    isNumber(digitPlace) ? Math.floor(value / digitPlace) % 10 : value;
