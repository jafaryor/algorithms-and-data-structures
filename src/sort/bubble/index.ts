function bubbleSort(array: number[]): number[] {
    let swapped: boolean;

    do {
        swapped = false;

        for (let i = 0; i < array.length - 1; ++i) {
            if (array[i] > array[i + 1]) {
                [array[i], array[i + 1]] = [array[i + 1], array[i]];
                swapped = true;
            }
        }
    } while (swapped);

    return array;
}

export default bubbleSort;