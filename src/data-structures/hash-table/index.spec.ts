import { HashTable } from './index';

describe('HashTable', () => {
    const table = new HashTable<number>(12);

    it('should be empty', () => {
        expect(table.isEmpty()).toBe(true);
        expect(table.loadFactor).toEqual(0);
    });

    it('should insert an item', () => {
        table.insert(10, 100);

        expect(table.size).toEqual(1);
        expect(table.search(10)).toEqual(jasmine.objectContaining({ data: { key: 10, value: 100 } }));
    });

    it('should remove the item', () => {
        table.insert(20, 200);
        table.delete(10);

        expect(table.size).toEqual(1);
        expect(table.search(10)).toEqual(null);
    });

    it('should insert 4 new items and remove half of them', () => {
        table.insert(10, 100);
        table.insert(30, 300);
        table.insert(40, 400);
        table.insert(50, 500);

        expect(table.size).toEqual(5);
        expect(table.isEmpty()).toBe(false);

        table.delete(20);
        table.delete(30);
        table.delete(40);

        expect(table.size).toEqual(2);
        expect(table.search(20)).toBe(null);
        expect(table.search(30)).toBe(null);
        expect(table.search(40)).toBe(null);
    });
});
