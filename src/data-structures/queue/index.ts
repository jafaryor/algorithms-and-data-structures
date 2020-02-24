import { cloneDeep } from 'lodash';

/**
 * The Queue Date Structure
 */
export class Queue<T> {
    private queue: T[];

    constructor(array?: T[]) {
        this.queue = array ? cloneDeep(array) : [];
    }

    /**
     * adds value to queue
     * @param value
     */
    public enqueue(value: T): void {
        this.queue.push(value);
    }

    /**
     * pulls out the first element from the queue
     * @returns the value of the pulled out item
     */
    public dequeue(): T | undefined {
        return this.queue.shift();
    }

    /**
     * return the value of the first item
     */
    public peek(): T | undefined {
        return this.queue[0];
    }

    /**
     * tells if the queue is empty
     */
    public isEmpty(): boolean {
        return this.length === 0;
    }

    /**
     * returns the length of the queue
     */
    public get length(): number {
        return this.queue.length;
    }

    /**
     * prints the queue
     */
    public print(): void {
        // tslint-disable-next-line
        console.log('[', this.queue.join(' '), ']');
    }
}
