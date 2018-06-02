import { bubbleSort } from './bubble';
import { insertionSort } from './insertion';
import { mergeSort } from './merge';
import { heapSort } from './heap/index';
import { selectionSort } from './selection/index';

describe('SortingSpecs', () => {
    let array: number[];
    let sortedArray: number[];
    const sortArray = (arr: number[]) => arr.sort((a: number, b: number) => a - b);

    test('basic case', () => {
        array = [5, 9, 13, 4, 1, 6];
    });

    test('negative and positive numbers', () => {
        array = [8, -2, 0, -10, 10];
    });

    test('sorted array', () => {
        array = [1, 2, 3, 4, 5, 6, 7];
    });

    test('array with -1', () => {
        array = [-1, -1, -1, -1];
    });

    test('one item', () => {
        array = [2];
    });

    test('empty array', () => {
        array = [];
    });

    test('no array', () => {
        // TODO: implement this case
        // array = undefined;
    });

    afterEach(() => {
        sortedArray = sortArray(array);

        expect(insertionSort([...array])).toEqual(sortedArray);
        expect(mergeSort([...array])).toEqual(sortedArray);
        expect(bubbleSort([...array])).toEqual(sortedArray);
        expect(heapSort([...array])).toEqual(sortedArray);
        expect(selectionSort([...array])).toEqual(sortedArray);
    });
});
