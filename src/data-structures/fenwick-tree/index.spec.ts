import {FenwickTree} from '.';

describe('Fenwick Tree', () => {
    let tree: FenwickTree;

    beforeEach(() => {
        tree = new FenwickTree([1, 2, 3, 4, 5, 6]);
    });

    it('should build tree', () => {
        expect(tree.getClone()).toEqual([0, 1, 3, 3, 10, 5, 11]);
        expect(tree.get(1)).toEqual(1);
        expect(tree.get(4)).toEqual(4);
        expect(tree.get(6)).toEqual(6);
    });

    it('should add 3 to all within range [1, 5]', () => {
        expect(tree.prefixSum(5)).toEqual(15);
        tree.update(2, 4);
        tree.update(3, 2);
        expect(tree.prefixSum(5)).toEqual(16);
    });

    it('should return sum of [2, 5]', () => {
        expect(tree.sum(2, 5)).toEqual(14);
    });
});
