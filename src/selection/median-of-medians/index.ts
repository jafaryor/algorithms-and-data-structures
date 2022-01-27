import _ from 'lodash';
import {swap} from '../../utils';
import {insertionSortOfSubArray} from '../../sort/insertion';
import {QuickSelection} from '../quick';

export class MedianOfMedians extends QuickSelection {
    /**
     * Quick Selection with Median of Medians technique
     * @time O(n)
     * @param array
     * @param k-th smallest element (0 <= k <= array.length-1)
     * @param left - left pointer index
     * @param right - right pointer index
     */
    select(
        array: number[],
        k: number = 0,
        left: number = 0,
        right: number = array.length - 1,
    ): number {
        const kthSmallestIndex = this.medianSelect(array, k, left, right);

        return array[kthSmallestIndex];
    }

    /**
     * QuickSelection which returns the index of k-th smallest element in the modified array
     * @time O(n)
     * @param array
     * @param k-th smallest element (0 <= k <= array.length-1)
     * @param left - left pointer index
     * @param right - right pointer index
     */
    protected medianSelect(
        array: number[],
        k: number = 0,
        left: number = 0,
        right: number = array.length - 1,
    ): number {
        while (true) {
            if (left === right) {
                return left;
            }

            const mid = this.pivot(array, left, right);
            const pivotIndex = this.partition(array, left, right, mid);

            if (k === pivotIndex) {
                return k;
            } else if (k < pivotIndex) {
                right = pivotIndex - 1;
            } else {
                left = pivotIndex + 1;
            }
        }
    }

    /**
     * returns the pivot index
     * Moves the medians to the beginning of the array and repeat the process with these medians
     * @time O(n)
     * @param array
     * @param left - left pointer index
     * @param right - right pointer index
     */
    protected pivot(array: number[], left: number, right: number): number {
        if (right - left <= 5) {
            // for 5 or less elements just get median
            return this.partition5(array, left, right);
        }

        // otherwise move the medians of five-element subgroups to the first n/5 positions
        for (
            let subLeft = left, subRight = subLeft + 4, median5;
            subLeft <= right;
            subLeft += 5, subRight = subLeft + 4
        ) {
            if (subRight > right) {
                subRight = right;
            }

            // get the median of the i'th five-element subgroup
            median5 = this.partition5(array, subLeft, subRight);
            // move median to the beginning of the five-element subgroup
            swap(array, median5, left + Math.floor((subLeft - left) / 5));
        }

        // compute the median of the calculated medians. Medians are in the begginig of the subarray
        return this.medianSelect(
            array,
            Math.floor((right - left) / 10) + 1,
            left,
            left + Math.floor((right - left) / 5),
        );
    }

    /**
     * returns the median of subarray
     * @time O(1)
     * @param array
     * @param left - left pointer index
     * @param right - right pointer index
     */
    protected partition5(array: number[], left: number, right: number): number {
        insertionSortOfSubArray(array, left, right);

        return Math.floor((left + right) / 2);
    }
}
