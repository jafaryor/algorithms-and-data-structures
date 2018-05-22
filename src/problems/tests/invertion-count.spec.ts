import { invertionCounter } from '../invertion-count';

describe('InvertionCounterSpec', () => {
    let input: number[];
    let amount: number;

    it('first base case', () => {
        input = [7, 6, 5, 4, 3, 2, 1];
        amount = 21; // (7 * (7 - 1)) / 2 = 21
    });

    it('second base case', () => {
        input = [4, 3, 2, 1];
        amount = 6; // (4 * (4 - 1)) / 2 = 6
    });

    it('single item', () => {
        input = [7];
        amount = 0;
    });

    afterEach(() => expect(invertionCounter.count(input)).toEqual(amount));
});