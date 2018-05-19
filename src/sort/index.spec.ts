import insertionSort from './insertion';
import mergeSort from './merge';

describe('InsertionSortSpec', () => {
    const sortArray = (arr: number[]) => {
        if (!arr) return;

        return arr.sort((a: number, b: number) => a - b);
    };
    let array: number[];

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

    afterEach(() => expect(insertionSort(array)).toEqual(sortArray(array)));
    afterEach(() => expect(mergeSort(array)).toEqual(sortArray(array)));
});