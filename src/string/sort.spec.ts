import {StringSort} from './sort';

describe('String Sort', () => {
    const stringSorter = new StringSort();
    let strings: string[];
    let sorted: string[];

    it('LSD', () => {
        strings = [
            '4PGC938',
            '2IYE230',
            '3CIO720',
            '1ICK750',
            '1OHV845',
            '4JZY524',
            '1ICK750',
            '3CIO720',
            '1OHV845',
            '1OHV845',
            '2RLA629',
            '2RLA629',
            '3ATW723',
        ];
        sorted = [
            '1ICK750',
            '1ICK750',
            '1OHV845',
            '1OHV845',
            '1OHV845',
            '2IYE230',
            '2RLA629',
            '2RLA629',
            '3ATW723',
            '3CIO720',
            '3CIO720',
            '4JZY524',
            '4PGC938',
        ];

        expect(stringSorter.lsd(strings, 7)).toEqual(sorted);
    });

    it('MSD', () => {
        strings = [
            'she',
            'sells',
            'seashells',
            'by',
            'the',
            'sea',
            'shore',
            'the',
            'shells',
            'she',
            'sells',
            'are',
            'surely',
            'seashells',
        ];
        sorted = [
            'are',
            'by',
            'sea',
            'seashells',
            'seashells',
            'sells',
            'sells',
            'she',
            'she',
            'shells',
            'shore',
            'surely',
            'the',
            'the',
        ];

        expect(stringSorter.msd(strings)).toEqual(sorted);
    });
});
