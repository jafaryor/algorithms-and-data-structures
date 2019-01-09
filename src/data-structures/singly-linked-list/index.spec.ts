import { SinglyLinkedList } from '.';
import { DoublyLinkedList } from '../doubly-linked-list/index';

describe('SinglyLinkedListSpec', () => {
    const list = new SinglyLinkedList<number>();

    it('list should be empty', () => {
        expect(list.isEmpty()).toBe(true);
    });

    it('should insert the node', () => {
        list.insert(10);

        expect(list.length).toEqual(1);
        expect(list.search(10)).toBeDefined();
    });

    it('should inster after the first node', () => {
        list.insert(30);
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

    it('should not be empty', () => {
        const newList = new DoublyLinkedList<number>([10, 20, 30]);

        expect(newList.isEmpty()).toBe(false);
        expect(newList.length).toEqual(3);
    });
});
