import { swap } from '../../utils/utils';

/**
 * Selection Sort
 * @param array
 */
export function selectionSort(array: number[]): number[] {
    let minIndex: number;

    for (let i = 0; i < array.length - 1; ++i) {
        minIndex = i;

        for (let j = i + 1; j < array.length - 1; ++j) {
            if (array[minIndex] > array[j]) minIndex = j;
        }

        swap(array, i, minIndex);
    }

    return array;
}
