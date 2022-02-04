import {
    finiteAutomatonMatcher,
    knuthMorrisPrattMatcher,
    naiveStringMatching,
    rabinKarpMatcher,
} from './string-matching';

describe('String Matching', () => {
    let text: string;
    let pattern: string;
    let alphabet: string[];
    let shifts: number[];

    const matchPattern = () => {
        it('Naive', () => {
            expect(naiveStringMatching(text, pattern)).toEqual(shifts);
        });

        it('Rabin-Karp', () => {
            expect(rabinKarpMatcher(text, pattern, alphabet)).toEqual(shifts);
        });

        it('Finite Automaton', () => {
            expect(finiteAutomatonMatcher(text, pattern, alphabet)).toEqual(
                shifts,
            );
        });

        it('Knuth-Morris-Pratt', () => {
            expect(knuthMorrisPrattMatcher(text, pattern)).toEqual(shifts);
        });
    };

    describe('Case 01', () => {
        beforeAll(() => {
            text = 'AABAACAADAABAABA';
            pattern = 'AABA';
            alphabet = ['A', 'B', 'C', 'D'];
            shifts = [0, 9, 12];
        });

        matchPattern();
    });

    describe('Case 02', () => {
        beforeAll(() => {
            text = 'ABABABCABABABCABABABC';
            pattern = 'ABABAC';
            alphabet = ['A', 'B', 'C'];
            shifts = [];
        });

        matchPattern();
    });

    describe('Case 03', () => {
        beforeAll(() => {
            text = 'ababcabcabababd';
            pattern = 'ababd';
            alphabet = ['a', 'b', 'c', 'd'];
            shifts = [10];
        });

        matchPattern();
    });
});
