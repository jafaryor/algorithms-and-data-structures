import { insertionSort } from '../insertion';

/**
 * Bucket Sort
 * @time complexity - O(n)
 * @space complexity - O(n)
 * @note - sorts only positive real numbers
 * @param array
 */
export function bucketSort(array: number[]): number[] {
    if (!array.length) {
        return array;
    }

    let i: number = 0;
    const buckets: number[][] = [];
    const max = Math.max.apply(Math, array);

    // Create n empty buckets
    for (let j = 0; j < array.length; ++j) {
        buckets[j] = [];
    }

    // Pushing values to buckets
    array.forEach(item => {
        const bucketIndex = Math.floor((array.length * item) / (max + 1));

        buckets[bucketIndex].push(item);
    });

    // Sort each bucket
    buckets.forEach(bucket => insertionSort(bucket));

    // Concatenate all buckets inro array
    buckets.forEach(bucket => bucket.forEach(item => (array[i++] = item)));

    return array;
}
