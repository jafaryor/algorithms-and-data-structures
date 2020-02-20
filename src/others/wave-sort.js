/*
    Given an unsorted array of integers, sort the array into a wave like array.
    An array ‘arr[0..n-1]’ is sorted in wave form if
    arr[0] >= arr[1] <= arr[2] >= arr[3] <= arr[4] >= …..

    Input:  arr[] = {10, 5, 6, 3, 2, 20, 100, 80}
    Output: arr[] = {10, 5, 6, 2, 20, 3, 100, 80} OR
                    {20, 5, 10, 2, 80, 6, 100, 3} OR
                    any other array that is in wave form
*/

function waveSort(arr) {
    sortedArr = arr.sort((a, b) => a - b);

    for (let i = 0; i < sortedArr.length - 1; i += 2) {
        swap(arr, i, i + 1);
    }

    return sortedArr;
}

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

const res = waveSort([10, 5, 6, 3, 2, 20, 100, 80]);
console.log(res);