/**
 * Merge Sort Algorithm.
 */
export class MergeSorter {
    private static aux: number[];

    static sortTopDown(array: number[]): number[] {
        MergeSorter.aux = new Array(array.length);
        MergeSorter.sortTopDownRecursive(array, 0, array.length - 1);

        return array;
    }

    /**
     * Top-down Merge Sort.
     * @time O(n log n)
     * @space O(n)
     */
    private static sortTopDownRecursive(
        array: number[],
        left: number,
        right: number,
    ): void {
        if (right <= left) return;

        const mid = left + Math.floor((right - left) / 2);

        MergeSorter.sortTopDownRecursive(array, left, mid);
        MergeSorter.sortTopDownRecursive(array, mid + 1, right);

        MergeSorter.merge(array, left, mid, right);
    }

    /**
     * Bottom-up Merge Sort.
     * @time O(n log n)
     * @space O(n)
     */
    static sortBottomUp(array: number[]): number[] {
        // Subarray size.
        let size: number;
        let left: number;
        let right: number;
        let mid: number;
        const n = array.length;
        MergeSorter.aux = new Array(n);

        // Pick subarrays size (1, 2, 4, 8, ...)
        for (size = 1; size < n; size *= 2) {
            // Merge subarrays of size "size".
            for (left = 0; left < n - size; left += size + size) {
                mid = left + size - 1;
                right = Math.min(left + size + size - 1, n - 1);

                MergeSorter.merge(array, left, mid, right);
            }
        }

        return array;
    }

    /**
     * Merges array[left..mid] with array[mid+1..right].
     */
    private static merge(
        array: number[],
        left: number,
        mid: number,
        right: number,
    ): void {
        let i = left;
        let j = mid + 1;

        // Copy array[left..right] to aux[left..right].
        for (let k = left; k <= right; k++) {
            MergeSorter.aux[k] = array[k];
        }

        // Merge back to array[left..right].
        for (let k = left; k <= right; k++) {
            if (i > mid) {
                // Left half exhausted (take from the right).
                array[k] = MergeSorter.aux[j++];
            } else if (j > right) {
                // Right half exhausted (take from the left).
                array[k] = MergeSorter.aux[i++];
            } else if (MergeSorter.aux[j] < MergeSorter.aux[i]) {
                // Right value is less than left value (take from the right).
                array[k] = MergeSorter.aux[j++];
            } else {
                // Left value is less than right value (take from the left).
                array[k] = MergeSorter.aux[i++];
            }
        }
    }
}
