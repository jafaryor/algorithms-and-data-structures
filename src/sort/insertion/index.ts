/**
 * Insertion Sort
 * @param array
 */
export function insertionSort(array: number[]): number[] {
    let i: number; // index into unsorted section
    let j: number; // index into sorted section
    let key: number; // the value currently being compared

    for (i = 1; i < array.length; ++i) {
        // store the current value because it may shift later
        key = array[i];

        /*
         * Whenever the value in the sorted section is greater than the value
         * in the unsorted section, shift all items in the sorted section over
         * by one. This creates space in which to insert the value.
         */
        for (j = i - 1; j >= 0 && array[j] > key; j--) {
            array[j + 1] = array[j];
        }

        array[j + 1] = key;
    }

    return array;
}

/**
 * Insertion Sort for Subarray
 * @param array
 * @param left - left pointer index, where to start sorting
 * @param right - right pointer index, where we stop sorting
 */
export function insertionSortOfSubArray(
    array: number[],
    left: number = 0,
    right: number = array.length - 1,
): number[] {
    let i: number; // index into unsorted section
    let j: number; // index into sorted section
    let key: number; // the value currently being compared

    for (i = left + 1; i <= right; ++i) {
        // store the current value because it may shift later
        key = array[i];

        /*
         * Whenever the value in the sorted section is greater than the value
         * in the unsorted section, shift all items in the sorted section over
         * by one. This creates space in which to insert the value.
         */
        for (j = i - 1; j >= left && array[j] > key; j--) {
            array[j + 1] = array[j];
        }

        array[j + 1] = key;
    }

    return array;
}
