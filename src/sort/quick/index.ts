import {insertionSortOfSubArray} from '..';
import {swap, randomFromRange, shuffle} from '../../utils';

export class QuickSorter {
    /**
     * Insertion sort cutoff.
     * Which means that if the array is smaller than this number, do insertion sort.
     * @note when M = 0, no insertion sort is performed.
     */
    private static readonly M = 10;

    /**
     * Basic Quick Sort
     * @time - O(n logn)
     * @space - O(n)
     */
    static basicSort(array: number[]): number[] {
        if (array.length === 0) return [];

        const left = [];
        const right = [];
        const pivot = array[0];

        for (let i = 1; i < array.length; i++) {
            if (array[i] < pivot) {
                left.push(array[i]);
            } else {
                right.push(array[i]);
            }
        }

        return [
            ...QuickSorter.basicSort(left),
            pivot,
            ...QuickSorter.basicSort(right),
        ];
    }

    /**
     * Quick Sort
     * @time - O(n logn)
     * @space - O(1)
     */
    static sort(array: number[]): number[] {
        // Randomize/shuffle the array, to avoid worst case.
        shuffle(array);

        return QuickSorter.sortHelper(array);
    }

    /**
     * Quick Sort Helper
     * @time - O(n logn)
     * @space - O(1)
     */
    private static sortHelper(
        array: number[],
        left: number = 0,
        right: number = array.length - 1,
    ): number[] {
        if (left + QuickSorter.M >= right) {
            // Do insertion sort for array of size <= M.
            return insertionSortOfSubArray(array, left, right);
        }

        const pivotIndex = QuickSorter.partition(array, left, right);

        QuickSorter.sortHelper(array, left, pivotIndex - 1);
        QuickSorter.sortHelper(array, pivotIndex + 1, right);

        return array;
    }

    /**
     * Median of 3 Quick Sort (Dijkstra’s solution).
     */
    static threeWaySort(
        array: number[],
        left = 0,
        right = array.length - 1,
    ): number[] {
        if (left + QuickSorter.M >= right) {
            // Do insertion sort for array of size <= M.
            return insertionSortOfSubArray(array, left, right);
        }

        let less = left; // Less than pivot element index.
        let i = left + 1; // Equal to pivot element index.
        let greater = right; // Greater than pivot element index.
        const pivot = array[left];

        // Partition the array.
        while (i <= greater) {
            if (array[i] < pivot) {
                swap(array, less++, i++);
            } else if (array[i] > pivot) {
                swap(array, i, greater--);
            } else {
                i++;
            }
        }
        // Now, array[left...less-1] < pivot = array[less...greater] < array[greater+1...right].

        QuickSorter.threeWaySort(array, left, less - 1);
        QuickSorter.threeWaySort(array, greater + 1, right);

        return array;
    }

    /**
     * Partitions the array into array[left...i-1] < array[i] <= array[i+1...right].
     * @time - O(n)
     */
    private static partition(
        array: number[],
        left: number,
        right: number,
    ): number {
        const pivot = array[left]; // first element is pivot.
        let i = left; // left scan index.
        let j = right + 1; // right scan index.

        while (true) {
            // Scan from left to right, find the first element that
            // is greater than the pivot.
            while (array[++i] < pivot) {
                // Avoid run off the right end of the array.
                if (i === right) break;
            }

            // Scan from right to left, find the first element that
            // is less than the pivot.
            while (array[--j] > pivot) {
                // Avoid run off the left end of the array,
                if (j === left) break;
            }

            // Scan indices crossed, partition is finished.
            if (i >= j) break;

            // Swap the found elements, to maintain the invariant property.
            swap(array, i, j);
        }

        // Place pivot in the correct location.
        swap(array, left, j);

        return j;
    }

    /**
     * An alternative Randomized Quick Sort implementation.
     * @time [expected] - O(n logn)
     * @space - O(1)
     */
    static randomizedSort(
        array: number[],
        left = 0,
        right = array.length - 1,
    ): number[] {
        if (left >= right) return array;

        // Partition the array.
        const pivotIndex = QuickSorter.randomizedPartition(array, left, right);

        // Sort the left partition.
        QuickSorter.randomizedSort(array, left, pivotIndex - 1);
        // Sort the right partition.
        QuickSorter.randomizedSort(array, pivotIndex + 1, right);

        return array;
    }

    /**
     * Randomized partitioning (Lomuto Partitioning)
     * @time - O(n)
     */
    private static randomizedPartition(
        array: number[],
        left = 0,
        right = array.length - 1,
    ): number {
        const k = randomFromRange(left, right);
        swap(array, k, right);

        return QuickSorter.partition(array, left, right);
    }
}
