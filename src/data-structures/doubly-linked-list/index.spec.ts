import {DoublyLinkedList} from './index';

xdescribe('DoublyLinkedListSpec', () => {
    const list = new DoublyLinkedList<number>();

    it('should be empty', () => {
        expect(list.isEmpty()).toBe(true);
        expect(list.length).toEqual(0);
    });

    it('should insert a value', () => {
        list.insert(10);

        expect(list.search(10)).toBeDefined();
        expect(list.length).toEqual(1);
    });

    it('should remove the node', () => {
        list.remove(10);

        expect(list.search(10)).toBeUndefined();
        expect(list.length).toEqual(0);
    });

    it('should not be empty', () => {
        const newList = new DoublyLinkedList<number>([10, 20]);

        expect(newList.isEmpty()).toBe(false);
        expect(newList.length).toEqual(2);
    });
});
