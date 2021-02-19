import {euclid, euclidIterative, gcd, lcm} from './gcd-lcm';
import {
    finiteAutomatonMatcher,
    knuthMorrisPrattMatcher,
    naiveStringMatching,
    rabinKarpMatcher,
} from './string-matching';

describe('Advanced Algorithms', () => {
    describe('GSD and LCM', () => {
        it('gcd(899, 493)', () => {
            expect(euclid(899, 493)).toEqual(29);
            expect(euclidIterative(899, 493)).toEqual(29);
            expect(gcd(899, 493)).toEqual({
                gcd: 29,
                x: -6,
                y: 11,
            });
            expect(lcm(899, 493)).toEqual(15283);
        });

        it('gcd(−4, 14)', () => {
            expect(euclid(-4, 14)).toEqual(2);
            expect(euclidIterative(-4, 14)).toEqual(2);
            expect(lcm(-4, 14)).toEqual(28);
        });

        it('gcd(18, 180)', () => {
            expect(euclid(48, 180)).toEqual(12);
            expect(euclidIterative(48, 180)).toEqual(12);
            expect(gcd(48, 180)).toEqual({
                gcd: 12,
                x: 4,
                y: -1,
            });
            expect(lcm(48, 180)).toEqual(720);
        });

        it('gcd(0, 10)', () => {
            expect(euclid(0, 10)).toEqual(10);
            expect(euclidIterative(0, 10)).toEqual(10);
            expect(gcd(0, 10)).toEqual({
                gcd: 10,
                x: 0,
                y: 1,
            });
            expect(lcm(0, 10)).toEqual(0);
        });

        it('gcd(9, 0)', () => {
            expect(euclid(9, 0)).toEqual(9);
            expect(euclidIterative(9, 0)).toEqual(9);
            expect(gcd(9, 0)).toEqual({
                gcd: 9,
                x: 1,
                y: 0,
            });
            expect(lcm(9, 0)).toEqual(0);
        });
    });

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
                expect(rabinKarpMatcher(text, pattern, alphabet)).toEqual(
                    shifts,
                );
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
});
