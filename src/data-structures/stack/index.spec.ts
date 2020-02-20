import { Stack } from '.';

describe('StackSpec', () => {
    it('should initialize an empty stack', () => {
        const stack = new Stack<string>();

        expect(stack.length).toEqual(0);
        expect(stack.peek()).toBeUndefined();
    });

    it('should initialize a stack from passed array', () => {
        const stack = new Stack<number>([1, 2, 3]);

        expect(stack.length).toEqual(3);
        expect(stack.peek()).toEqual(3);
    });

    describe('Stack Operations', () => {
        const stack: Stack<number> = new Stack<number>();

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
