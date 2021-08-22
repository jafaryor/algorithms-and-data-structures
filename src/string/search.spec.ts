import {StringSearcher} from './search';

describe('StringSearcher', () => {
    describe('Knuth-Morris-Pratt Algorithm', () => {
        const stringSearcher = new StringSearcher();

        it('case 01', () => {
            expect(
                stringSearcher.knuthMorrisPratt('hell', 'hayhellobye'),
            ).toEqual([3]);
        });

        it('case 02', () => {
            expect(
                stringSearcher.knuthMorrisPratt(
                    'AACAA',
                    'AABRAACADABRAACAADABRA',
                ),
            ).toEqual([12]);
        });

        it('case 02', () => {
            expect(
                stringSearcher.knuthMorrisPratt(
                    'AACA',
                    'AABRAACADABRAACAADABRA',
                ),
            ).toEqual([4, 12]);
        });
    });
});
