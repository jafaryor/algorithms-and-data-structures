/**
 * Returns array of pairs with difference k in arr[] of size n
 * Time Complexity: O(nlogn)
 * @param {number[]} arr
 * @param {number} diff - result of difference
 * @return {string[]}
 */
function countPairsWithDiffK(arr, diff) {
    const result = [];
    let left = 0;
    let right = 0;

    arr.sort((a, b) => a - b);

    while (right < arr.length) {
        if (arr[right] - arr[left] == diff) {
            result.push(`${arr[right]} - ${arr[left]} = ${diff}`);
            left++;
            right++;
        } else if (arr[right] - arr[left] > diff) {
            left++;
        } else {
            // arr[right] - arr[left] < diff
            right++;
        }
    }

    return result;
}

/**
 * Returns array of pairs with sum k in arr[] of size n
 * Time Complexity: O(nlogn)
 * @param {number[]} arr
 * @param {number} sum - result of sum
 * @return {string[]}
 */
function countPairsWithSumK(arr, sum) {
    const result = [];
    let first = 0;
    let last = arr.length - 1;
    let s = 0;

    arr.sort((a, b) => a - b);

    while (first < last) {
        s = arr[first] + arr[last];

        if (s === sum) {
            result.push(`${arr[first]} + ${arr[last]} = ${sum}`);
            first++;
            last--;
        } else if (s < sum) {
            first++;
        } else {
            last--;
        }
    }

    return result;
}

const arr = [1, 5, 3, 4, 2];

console.log(countPairsWithDiffK(arr, 3));
console.log(countPairsWithSumK(arr, 7));