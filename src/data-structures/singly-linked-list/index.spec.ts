import { SinglyLinkedList } from '.';

describe('SinglyLinkedListSpec', () => {
    const list = new SinglyLinkedList<number>();

    it('list should be empty', () => {
        expect(list.isEmpty()).toBe(true);
    });

    it('should add the node', () => {
        list.add(10);

        expect(list.length).toEqual(1);
        expect(list.search(10)).toBeDefined();
    });

    it('should inster after the first node', () => {
        list.add(30);
        list.insertAfter(10, 20);

        expect(list.length).toEqual(3);
        expect(list.search(10)).toBeDefined();
        expect(list.search(20)).toBeDefined();
        expect(list.search(30)).toBeDefined();
    });

    it('should remove the middle node', () => {
        expect(list.remove(20)).toBe(true);
        expect(list.length).toEqual(2);
        expect(list.search(20)).toBeNull();
    });
});
