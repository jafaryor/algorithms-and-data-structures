import { Set } from './index';

describe('Set', () => {
    const set = new Set<number>();

    it('should be empty', () => {
        expect(set.isEmpty()).toBe(true);
        expect(set.length).toEqual(0);
    });

    it('should add value to the set', () => {
        set.add(10);
        set.add(20);
        set.add(10);

        expect(set.length).toEqual(2);
        expect(set.contains(10)).toBe(true);
        expect(set.contains(20)).toBe(true);
        expect(set.isEmpty()).toBe(false);
    });

    it('should remove the value', () => {
        set.remove(10);

        expect(set.length).toEqual(1);
        expect(set.contains(10)).toBe(false);
    });

    it('should union two sets', () => {
        const set01 = new Set([10]);
        const set02 = new Set([20, 30]);
        const unionSet = set01.union(set02);

        expect(unionSet.length).toEqual(3);
        expect(unionSet.contains(10)).toBe(true);
        expect(unionSet.contains(20)).toBe(true);
        expect(unionSet.contains(30)).toBe(true);
    });

    it('should find intersect of two sets', () => {
        const set01 = new Set([10, 20, 30]);
        const set02 = new Set([20, 30, 40, 50]);
        const intersectSet = set01.intersect(set02);

        expect(intersectSet.length).toEqual(2);
        expect(intersectSet.contains(20)).toBe(true);
        expect(intersectSet.contains(30)).toBe(true);
    });

    it('should find difference of two sets', () => {
        const set01 = new Set([10, 20, 30]);
        const set02 = new Set([10, 30, 40, 50]);
        const differenceSet = set01.difference(set02);

        expect(differenceSet.length).toEqual(1);
        expect(differenceSet.contains(10)).toBe(false);
        expect(differenceSet.contains(20)).toBe(true);
        expect(differenceSet.contains(30)).toBe(false);
    });

    it('first set should be subset of the second set', () => {
        const set01 = new Set([10, 20]);
        const set02 = new Set([0, 20, 40, 10, 50]);

        expect(set01.isSubsetOf(set02)).toBe(true);
    });
});
