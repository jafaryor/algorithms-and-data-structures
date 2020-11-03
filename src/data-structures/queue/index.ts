import {cloneDeep} from 'lodash';

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
    enqueue(value: T): void {
        this.queue.push(value);
    }

    /**
     * pulls out the first element from the queue
     * @returns the value of the pulled out item
     */
    dequeue(): T | undefined {
        return this.queue.shift();
    }

    /**
     * return the value of the first item
     */
    peek(): T | undefined {
        return this.queue[0];
    }

    /**
     * tells if the queue is empty
     */
    isEmpty(): boolean {
        return this.length === 0;
    }

    /**
     * returns the length of the queue
     */
    get length(): number {
        return this.queue.length;
    }

    /**
     * prints the queue
     */
    print(): void {
        // tslint-disable-next-line
        console.log('[', this.queue.join(' '), ']');
    }
}
