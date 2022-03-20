import {QuickFindImplementation, UnionFinder} from '.';

describe('Dynamic Connectivity Problem', () => {
    const pairs = [
        [4, 3],
        [3, 8],
        [6, 5],
        [9, 4],
        [2, 1],
        [8, 9],
        [5, 0],
        [7, 2],
        [6, 1],
        [1, 0],
        [6, 7],
    ];
    const unionFinder = new UnionFinder();

    describe('Quick Find', () => {
        it('should find connected components', () => {
            expect(
                unionFinder.findConnectedComponents(
                    10,
                    pairs,
                    QuickFindImplementation.QUICK_FIND,
                ),
            ).toEqual([1, 1, 1, 8, 8, 1, 1, 1, 8, 8]);
        });
    });

    describe('Quick Union', () => {
        it('should find connected components', () => {
            expect(
                unionFinder.findConnectedComponents(
                    10,
                    pairs,
                    QuickFindImplementation.QUICK_UNION,
                ),
            ).toEqual([1, 1, 1, 8, 3, 0, 5, 1, 8, 8]);
        });
    });

    describe('Weighted Quick Union', () => {
        it('should find connected components', () => {
            expect(unionFinder.findConnectedComponents(10, pairs)).toEqual([
                6, 2, 6, 4, 4, 6, 6, 2, 4, 4,
            ]);
        });
    });
});
