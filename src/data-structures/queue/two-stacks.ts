import { Stack } from '../stack';

/**
 * The Queue implemented with a couple of Stacks
 */
export class QueueWithTwoStacks<T> {
    private stack01: Stack<T>;
    private stack02: Stack<T>;

    constructor(array?: T[]) {
        this.stack01 = new Stack<T>(array || []);
        this.stack02 = new Stack<T>();
    }

    /**
     * adds value to queue
     * @complexity: O(1)
     * @param value
     */
    public enqueue(value: T): void {
        this.stack01.push(value);
    }

    /**
     * pulls out the first element from the queue
     * @complexity: O(n)
     * @returns the value of the pulled out item
     */
    public dequeue(): T | undefined {
        if (this.stack02.isEmpty()) {
            this.moveItemsToSecondStack();
        }

        return this.stack02.pop();
    }

    /**
     * return the value of the first item
     * @complexity: O(n)
     * @returns the value of the first item
     */
    public peek(): T | undefined {
        if (this.stack02.isEmpty()) {
            this.moveItemsToSecondStack();
        }

        return this.stack02.peek();
    }

    /**
     * tells if the queue is empty
     */
    public isEmpty(): boolean {
        return this.stack01.isEmpty() && this.stack02.isEmpty();
    }

    /**
     * returns the length of the queue
     */
    public get length(): number {
        return this.stack01.length + this.stack02.length;
    }

    /**
     * prints the queue
     */
    public print(): void {
        this.stack01.print();
        this.stack02.print();
    }

    /**
     * moves the items from the first stack to the second one
     * @complexity: O(n)
     */
    private moveItemsToSecondStack(): void {
        while (!this.stack01.isEmpty()) {
            const value = this.stack01.pop();

            if (value) {
                this.stack02.push(value);
            }
        }
    }
}
