/*
    A child wants to climb a staircase. It can climb up to 3 step at once. Calculate the amount
    of permutations that are possible to the amount of steps the kid has to take

    Example:
    Input is 2
        1 1
        2
        The answer for 2 is 2.
    Input is 3
        1 1 1
        2 1
        1 2
        3
        The answer for 3 is 4.
    Input is 4
        1 1 1 1
        1 1 2
        1 2 1
        2 1 1
        1 3
        3 1
        4
        When the input is 4, the answer is 7.
    Input is 5
        1 1 1 1 1
        1 1 1 2
        1 1 2 1
        1 2 1 1
        2 1 1 1
        1 1 3
        1 3 1
        3 1 1
        3 2
        2 3
        4 1
        1 4
        5
        When the input is 4, the answer is 13.
*/

/**
 * finds out all combinations of positive numbers that add upto given number.
 * @param {number} n
 */
function findCombinations(n) {
    const result = [];
    // array to store the combinations
    // It can contain max n elements
    const arr = new Array(n);

    //find all combinations
    findCombinationsUtil(arr, 0, n, n, result);

    return result;
}

/** 
 * @param {number[]} arr - array to store the combination
 * @param {number} index - next location in array
 * @param {number} num - given number
 * @param {number} reducedNum - reduced number
 */
function findCombinationsUtil(arr, index, num, reducedNum, result) {
    // Base condition
    if (reducedNum < 0) return;

    // If combination is found, print it
    if (reducedNum == 0) {
        result.push([...arr].slice(0, index));
        return;
    }

    // Find the previous number stored in arr[]
    // It helps in maintaining increasing order
    const prev = (index == 0) ? 1 : arr[index - 1];

    // note loop starts from previous number
    // i.e. at array location index - 1
    for (let k = prev; k <= num; k++) {
        // next element of array is k
        arr[index] = k;

        // call recursively with reduced number
        findCombinationsUtil(arr, index + 1, num, reducedNum - k, result);
    }
}

console.log(findCombinations(5));