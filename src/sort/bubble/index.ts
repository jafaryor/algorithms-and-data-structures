import { swap } from '../../utils/utils';

/**
 * Bubble Sort
 * @param array
 */
export function bubbleSort(array: number[]): number[] {
    let swapped: boolean;

    do {
        swapped = false;

        for (let i = 0; i < array.length - 1; ++i) {
            if (array[i] > array[i + 1]) {
                swap(array, i, i + 1);
                swapped = true;
            }
        }
    } while (swapped);

    return array;
}
