import {binarySearch} from './';

describe('Binary Search', () => {
    let input: number[];
    let target: number;
    let resultIndex: number;

    it('case 01', () => {
        input = [-1, 0, 3, 5, 9, 12];
        target = 9;
        resultIndex = 4;
    });

    it('case 01', () => {
        input = [-1, 0, 3, 5, 9, 12];
        target = 2;
        resultIndex = -1;
    });

    it('case 01', () => {
        input = [0];
        target = 0;
        resultIndex = 0;
    });

    it('case 01', () => {
        input = [-1, 0];
        target = 0;
        resultIndex = 1;
    });

    it('case 01', () => {
        input = [-1, 0, 3, 5, 9, 12, 17, 23, 27, 31, 45, 60, 77, 84, 98, 100];
        target = 100;
        resultIndex = 15;
    });

    afterEach(() => {
        expect(binarySearch(input, target)).toEqual(resultIndex);
    });
});
