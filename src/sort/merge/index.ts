function merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let i: number = 0;  // for left array
    let j: number = 0;  // for right array

    // compare the arrays item by item and fill the result array
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            ++i;
        } else {
            result.push(right[j]);
            ++j;
        }
    }

    // merge the rest part of the longest array
    return [...result, ...left.slice(i), ...right.slice(j)];
}

function mergeSort(array: number[]): number[] {
    if (!array.length || array.length === 1) {
        // return if empty array or one item is in the array
        return array;
    }

    // get the middle item of the array rounded down
    const middle: number = Math.floor(array.length / 2);
    // items on the left side
    const left: number[] = array.slice(0, middle);
    // items on the right side
    const right: number[] = array.slice(middle);

    return merge(
        mergeSort(left),
        mergeSort(right)
    );
}

export default mergeSort;