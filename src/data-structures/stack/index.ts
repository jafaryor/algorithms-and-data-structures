import { cloneDeep } from 'lodash';

/**
 * The Stack Data Structure
 */
export class Stack<T> {
    private stack: T[];

    constructor(array?: T[]) {
        this.stack = array ? cloneDeep(array) : [];
    }

    /**
     * adds value to the stack
     * @param value
     */
    public push(value: T): void {
        this.stack.push(value);
    }

    /**
     * take the top item from the stack and return its value
     */
    public pop(): T | undefined {
        return this.stack.pop();
    }

    /**
     * returns the value of the top item
     */
    public peek(): T | undefined {
        return this.stack[this.stack.length - 1];
    }

    /**
     * returns the length of the stack
     */
    public get length(): number {
        return this.stack.length;
    }

    /**
     * tells if the queue is empty
     */
    public isEmpty(): boolean {
        return this.length === 0;
    }

    /**
     * prints the stack
     */
    public print(): void {
        // tslint-disable-next-line
        console.log(this.stack.join(' '));
    }
}
