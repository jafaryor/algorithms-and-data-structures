import { QuickSelection } from './quick';
import { MedianOfMedians } from './median-of-medians';

describe('SelectionSpec', () => {
    const quickSelection = new QuickSelection();
    const medianOfMedians = new MedianOfMedians();
    const sortComparator = (a: number, b: number) => a - b;

    let array: number[];
    let order: number;
    let result: number | undefined;

    test('empty array', () => {
        array = [];
        order = 0;
        // result = undefined;
    });

    test('positive integers', () => {
        array = [7];
        order = 0;
        // result = 7;
    });

    test('same numbers', () => {
        array = [7, 7, 7, 7, 7, 7, 7];
        order = 4;
        // result = 7;
    });

    test('positive integers', () => {
        array = [5, 9, 6, 2, 0, 10];
        order = 5;
        // result = 10;
    });

    test('positive repetetive integers', () => {
        array = [2, 9, 6, 6, 9, 10, 2];
        order = 1;
        // result = 2;
    });

    test('positive repetetive integers', () => {
        array = [2, 9, 6, 6, 9, 10, 2];
        order = 1;
        // result = 2;
    });

    test('integers', () => {
        array = [2, 9, -6, 6, 9, -10, 1, 20];
        order = 0;
        // result = -10;
    });

    test('positive floating numbers', () => {
        array = [1 / 2, 1.2, 10 / 3, 0.4, 6.6];
        order = 2;
        // result = 1.2;
    });

    test('positive and negative floating numbers', () => {
        array = [10 / 2, -1.2, 10 / 7, 0.54, -7.6];
        order = 1;
        // result = -1.2;
    });

    test('real and +/-Infinity numbers', () => {
        array = [1 / 2, 1 / 3, -7 / 3, 1.9, +Infinity, -Infinity, 0];
        order = 0;
        // result = -Infinity;
    });

    test('ascending sorted array', () => {
        array = [1, 2, 3, 4, 5, 6, 7];
        order = 1;
        // result = 2;
    });

    test('descending sorted array', () => {
        array = [7, 6, 5, 4, 3, 2, 1];
        order = 6;
        // result = 7;
    });

    afterEach(() => {
        result = array.sort(sortComparator)[order];

        expect(quickSelection.select([...array], order)).toEqual(result);
        expect(quickSelection.loopSelect([...array], order)).toEqual(result);
        expect(medianOfMedians.select([...array], order)).toEqual(result);
    });
});
