import {StringSearcher} from './search';

describe('StringSearcher', () => {
    const stringSearcher = new StringSearcher();

    describe('Knuth-Morris-Pratt Algorithm', () => {
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

    describe('Boyer-Moore Algorithm', () => {
        it('case 01', () => {
            expect(
                stringSearcher.boyerMoore('NEEDLE', 'FINDINAHAYSTACKNEEDLE'),
            ).toEqual([15]);
        });

        it('case 02', () => {
            expect(
                stringSearcher.boyerMoore('AACAA', 'AABRAACADABRAACAADABRA'),
            ).toEqual([12]);
        });

        it('case 02', () => {
            expect(
                stringSearcher.boyerMoore('AACA', 'AABRAACADABRAACAADABRA'),
            ).toEqual([4, 12]);
        });
    });
});
