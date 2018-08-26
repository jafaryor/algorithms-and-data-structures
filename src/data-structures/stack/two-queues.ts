import { Queue } from '../queue';

export class StackWithTwoQueues<T> {
    private queue01: Queue<T>;
    private queue02: Queue<T>;

    constructor(array?: T[]) {
        this.queue01 = new Queue<T>(array || []);
        this.queue02 = new Queue<T>();
    }

    /**
     * adds value to the stack
     * @complexity: O(1)
     * @param value
     */
    public push(value: T): void {
        this.queue01.enqueue(value);
    }

    /**
     * take the top item from the stack and return its value
     * @complexity: O(n)
     * @returns the pulled out item's value
     */
    public pop(): T | undefined {
        this.moveItemsToSecondQueue();

        const value = this.queue01.dequeue();

        this.swapQueues();

        return value;
    }

    /**
     * returns the value of the top item
     * @complexity: O(n)
     */
    public peek(): T | undefined {
        this.moveItemsToSecondQueue();

        const value = this.queue01.peek();

        if (!this.queue01.isEmpty()) {
            // move the last item to the second queue
            this.queue02.enqueue(this.queue01.dequeue());
        }

        this.swapQueues();

        return value;
    }

    /**
     * returns the length of the stack
     */
    public get length(): number {
        return this.queue01.length + this.queue02.length;
    }

    /**
     * tells if the queue is empty
     */
    public isEmpty(): boolean {
        return this.queue01.isEmpty() && this.queue02.isEmpty();
    }

    /**
     * prints the stack
     */
    public print(): void {
        this.queue01.print();
        this.queue02.print();
    }

    /**
     * moves all items except the last one from the first queue to the second queue
     * @complexity: O(n)
     */
    private moveItemsToSecondQueue(): void {
        while (this.queue01.length > 1) {
            this.queue02.enqueue(this.queue01.dequeue());
        }
    }

    /**
     * swaps the queues
     */
    private swapQueues(): void {
        const temp = this.queue01;

        this.queue01 = this.queue02;
        this.queue02 = temp;
    }
}
