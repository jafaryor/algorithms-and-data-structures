/**
 * Shell Sorting
 * @param array
 */
export function shellSort(array: number[]): number[] {
    // Start with a big gap, then reduce the gap
    for (
        let gap = Math.floor(array.length / 2);
        gap > 0;
        gap = Math.floor(gap / 2)
    ) {
        // Do a gapped insertion sort for this gap size.
        // The first gap elements a[0..gap-1] are already in gapped order
        // keep adding one more element until the entire array is
        // gap sorted
        for (let i = gap; i < Math.floor(array.length / 2); i += 1) {
            // add a[i] to the elements that have been gap sorted
            // save a[i] in temp and make a hole at position i
            const temp = array[i];

            // shift earlier gap-sorted elements up until the correct
            // location for a[i] is found
            let j;
            for (j = i; j >= gap && array[j - gap] > temp; j -= gap) {
                array[j] = array[j - gap];
            }

            //  put temp (the original a[i]) in its correct location
            array[j] = temp;
        }
    }

    return array;
}
