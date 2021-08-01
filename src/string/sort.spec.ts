import { lsd } from "./sort";

describe('String Sort', () => {
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

        expect(lsd(strings, 7)).toEqual(sorted);
    });
});

