import { MinHeap } from '../../data-structures/heap';

/**
 * Heap Sort
 * sort the array in place => empties array at the end
 * @param array
 */
export function heapSort(array: number[]): number[] {
    let min: number;
    const result: number[] = [];
    // build min heap from the array
    const heap = new MinHeap(array);

    for (let i = heap.size - 1; i >= 0; --i) {
        min = heap.poll();
        result.push(min);
    }

    return result;
}

// Note: for obtaining descendant order use MaxHeap instead
