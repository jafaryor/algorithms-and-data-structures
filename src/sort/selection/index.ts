import {swap} from '../../utils';

/**
 * Selection Sort
 * @timeO(n^2)
 */
export function selectionSort(array: number[]): number[] {
    let minIndex: number;

    for (let i = 0; i < array.length; ++i) {
        minIndex = i;

        for (let j = i + 1; j < array.length; ++j) {
            if (array[minIndex] > array[j]) minIndex = j;
        }

        swap(array, i, minIndex);
    }

    return array;
}
