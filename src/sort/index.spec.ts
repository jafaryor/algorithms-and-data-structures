import {difference} from 'lodash';
import {
    bubbleSort,
    insertionSort,
    mergeSort,
    heapSort,
    selectionSort,
    quickSortBasic,
    quickSort,
    randomizedQuickSort,
    countSort,
    radixSort,
    bucketSort,
    shellSort,
} from './index';

describe('SortingSpecs', () => {
    let array: number[];
    let sortedArray: number[];
    let skipAlgorithms: Function[];
    const sortArray = (arr: number[]) =>
        arr.sort((a: number, b: number) => a - b);
    const sortingAlgorithms: Function[] = [
        bubbleSort,
        insertionSort,
        mergeSort,
        heapSort,
        selectionSort,
        quickSortBasic,
        quickSort,
        randomizedQuickSort,
        countSort,
        radixSort,
        bucketSort,
        shellSort,
    ];

    beforeEach(() => {
        skipAlgorithms = [];
    });

    test('empty array', () => {
        array = [];
    });

    test('single number', () => {
        array = [2];
    });

    test('repeated numbers', () => {
        array = [7, 7, 7, 7, 7, 7, 7];
    });

    test('positive integers', () => {
        array = [5, 9, 13, 4, 1, 6];
    });

    test('positive and negative integers', () => {
        array = [8, -2, 0, -10, 10];
        skipAlgorithms = [radixSort, bucketSort];
    });

    test('positive floating numbers', () => {
        array = [1 / 2, 1.2, 10 / 3, 0.4, 6.6];
        skipAlgorithms = [countSort, radixSort];
    });

    test('positive and negative floating numbers', () => {
        array = [10 / 2, -1.2, 10 / 7, 0.54, -7.6];
        skipAlgorithms = [countSort, radixSort, bucketSort];
    });

    test('positive and negative real numbers', () => {
        array = [1 / 3, -1.5, -7 / 3, 1.4, 5.5, 1, 8, -10];
        skipAlgorithms = [countSort, radixSort, bucketSort];
    });

    test('real and +/-Infinity numbers', () => {
        array = [1 / 2, 1 / 3, -7 / 3, 1.9, +Infinity, -Infinity, 0];
        skipAlgorithms = [countSort, radixSort, bucketSort];
    });

    test('ascending sorted array', () => {
        array = [1, 2, 3, 4, 5, 6, 7];
    });

    test('descending sorted array', () => {
        array = [7, 6, 5, 4, 3, 2, 1];
    });

    test('no array', () => {
        // TODO: implement this case
        // array = undefined;
        // skipAlgorithms = [];
    });

    afterEach(() => {
        sortedArray = sortArray(array);

        difference(sortingAlgorithms, skipAlgorithms).forEach((algorithm) =>
            expect(algorithm([...array])).toEqual(sortedArray),
        );
    });
});
