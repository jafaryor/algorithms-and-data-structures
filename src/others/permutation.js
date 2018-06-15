// prints out the distinct permutations of the input array.

/**
 * Swap Characters at position
 * @param arr string value
 * @param i position 1
 * @param j position 2
 */
function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

/**
 * permutation function
 * @param arr array to calculate permutation for
 * @param l starting index
 * @param r end index
 */
function permute(arr, l, r, set) {
    if (l == r) {
        set.add(arr.join(''));
    } else {
        for (let i = l; i <= r; i++) {
            swap(arr, l, i);
            permute(arr, l + 1, r, set);
            swap(arr, l, i);
        }
    }
}

/**
 * @param {arr} - array
 */
function permutation(arr) {
    const set = new Set();

    permute(arr, 0, arr.length, set);

    return set;
}

console.log(permutation([1, 2, 1, 1])); // Set { '121', '112', '211' }