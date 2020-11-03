import {Queue} from '.';

describe('QueueSpec', () => {
    it('should initialize an empty queue', () => {
        const queue = new Queue<string>();

        expect(queue.length).toEqual(0);
        expect(queue.peek()).toBeUndefined();
    });

    it('should initialize a queue from passed array', () => {
        const queue = new Queue<number>([1, 2, 3]);

        expect(queue.length).toEqual(3);
        expect(queue.peek()).toEqual(1);
    });

    describe('Queue Operations', () => {
        const queue: Queue<number> = new Queue<number>();

        it('should enqueue', () => {
            queue.enqueue(10);
            queue.enqueue(20);

            expect(queue.length).toEqual(2);
        });

        it('should return the value of the first item', () => {
            expect(queue.peek()).toEqual(10);
        });

        it('should dequeue', () => {
            expect(queue.dequeue()).toEqual(10);
            expect(queue.length).toEqual(1);
            expect(queue.peek()).toEqual(20);
        });
    });
});
