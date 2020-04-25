import {HeapNode} from '../../data-structures/heap/node';
import {MinHeap} from '../../data-structures/heap';

/**
 * Heap Sort
 * sort the array in place => empties array at the end
 * @param array
 */
export function heapSort(array: number[]): number[] {
    let min: HeapNode<number>;
    const result: number[] = [];
    const heapNodeArray: Array<HeapNode<number>> = array.map(
        (item) => new HeapNode<number>(item, item)
    );

    // Build min heap from the array.
    const heap = new MinHeap(heapNodeArray);

    for (let i = heap.size - 1; i >= 0; --i) {
        min = heap.poll();
        result.push(min.value);
    }

    return result;
}

// Note: for obtaining descendant order use MaxHeap instead
