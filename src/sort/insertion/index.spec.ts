import InsertionSort from './index';

describe('InsertionSortSpec', () => {
    let array: number[];
    const sortArray = (arr: number[]) => arr.sort((a: number, b: number) => a - b);

    test('basic case', () => {
        array = [5, 9, 13, 4, 1, 6];
    });

    test('negative and positive numbers', () => {
        array = [8, -2, 0, -10, 10];
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

    afterEach(() => {
        expect(InsertionSort(array)).toEqual(sortArray(array));
    });
});