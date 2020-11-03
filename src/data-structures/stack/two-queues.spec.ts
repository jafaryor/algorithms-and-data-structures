import {StackWithTwoQueues} from './two-queues';

describe('StackWithTwoQueuesSpec', () => {
    it('should initialize an empty stack', () => {
        const stack = new StackWithTwoQueues<string>();

        expect(stack.length).toEqual(0);
        expect(stack.peek()).toBeUndefined();
    });

    it('should initialize a stack from passed array', () => {
        const stack = new StackWithTwoQueues<number>([1, 2, 3]);

        expect(stack.length).toEqual(3);
        expect(stack.peek()).toEqual(3);
    });

    describe('Stack Operations', () => {
        const stack: StackWithTwoQueues<number> = new StackWithTwoQueues<number>();

        it('should push', () => {
            stack.push(10);
            stack.push(20);

            expect(stack.length).toEqual(2);
        });

        it('should return the value of the top item', () => {
            expect(stack.peek()).toEqual(20);
        });

        it('should pop', () => {
            expect(stack.pop()).toEqual(20);
            expect(stack.length).toEqual(1);
            expect(stack.peek()).toEqual(10);
        });
    });
});
