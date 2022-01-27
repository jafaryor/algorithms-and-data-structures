import {Stack} from '../stack';

/**
 * The Queue implemented by a couple of Stacks
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
     * @time O(1)
     * @param value
     */
    enqueue(value: T): void {
        this.stack01.push(value);
    }

    /**
     * pulls out the first element from the queue
     * @time O(n)
     * @returns the value of the pulled out item
     */
    dequeue(): T | undefined {
        if (this.stack02.isEmpty()) {
            this.moveItemsToSecondStack();
        }

        return this.stack02.pop();
    }

    /**
     * return the value of the first item
     * @time O(n)
     * @returns the value of the first item
     */
    peek(): T | undefined {
        if (this.stack02.isEmpty()) {
            this.moveItemsToSecondStack();
        }

        return this.stack02.peek();
    }

    /**
     * tells if the queue is empty
     */
    isEmpty(): boolean {
        return this.stack01.isEmpty() && this.stack02.isEmpty();
    }

    /**
     * returns the length of the queue
     */
    get length(): number {
        return this.stack01.length + this.stack02.length;
    }

    /**
     * prints the queue
     */
    print(): void {
        this.stack01.print();
        this.stack02.print();
    }

    /**
     * moves the items from the first stack to the second one
     * @time O(n)
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
