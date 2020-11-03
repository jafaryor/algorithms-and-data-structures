/**
 * Given a sorted (in ascending order) array of `n` elements and a
 * target value, write a function to search target in the array.
 * If target exists, then return its index, otherwise return `-1`.
 * @complexity - O(lg n)
 * @spaceComplexity - O(1)
 */
export function binarySearch(
    input: number[],
    target: number,
    left: number = 0,
    right: number = input.length - 1,
): number {
    let pivot: number;

    while (left <= right) {
        pivot = Math.floor(left + (right - left) / 2);

        if (input[pivot] === target) {
            return pivot;
        } else if (target < input[pivot]) {
            right = pivot - 1;
        } else {
            left = pivot + 1;
        }
    }

    return -1;
}
