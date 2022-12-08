import {SegmentTree} from '.';

describe('Segment Tree', () => {
    let tree: SegmentTree;
    const input = [3, 6, 2, 1, 5, 10, 2, 11, 4, 8];

    beforeEach(() => {
        tree = new SegmentTree(input);
    });

    it('should build the segment tree', () => {
        expect(tree.getCopy()).toEqual([
            52,
            17,
            35,
            11,
            6,
            23,
            12,
            9,
            2,
            1,
            5,
            12,
            11,
            4,
            8,
            3,
            6,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            undefined,
            10,
            2,
        ]);
    });

    it('should return a value at index 5', () => {
        expect(tree.get(5)).toEqual(10);
    });

    it('should return sum of segment [0, 4]', () => {
        expect(tree.sum(0, 4)).toEqual(17);
    });

    it('should return sum of segment [3, 6]', () => {
        expect(tree.sum(3, 6)).toEqual(18);
    });

    it('should update num[6] to 4', () => {
        expect(tree.update(6, 4));
        expect(tree.sum(3, 6)).toEqual(20);
    });
});
