import { EqualFunction } from '../../utils';

/**
 * Singly-Linked List Node Interface.
 */
export interface ISinglyLinkecListNode<T> {
    data: T;
    next: ISinglyLinkecListNode<T> | null;
}

/**
 * Singly Linked List Data Structure.
 */
export class SinglyLinkedList<T> {
    // pointer to the head of the list
    private head: ISinglyLinkecListNode<T> | null = null;
    // pointer to the tail of the list
    private tail: ISinglyLinkecListNode<T> | null = null;
    // list length
    private listLength: number = 0;

    constructor(array?: T[], comparator?: EqualFunction<T>) {
        if (Array.isArray(array)) {
            array.forEach(value => this.insert(value));
            this.listLength = array.length;
        }

        if (comparator) {
            this.areEqual = comparator;
        }
    }

    /**
     * length of the list
     */
    public get length(): number {
        return this.listLength;
    }

    /**
     * checks if the list is empty
     */
    public isEmpty(): boolean {
        return this.listLength === 0;
    }

    /**
     * searches for the value
     * @complexity: O(n)
     * @param value
     * @returns pointer to the node
     */
    public search(value: T): ISinglyLinkecListNode<T> | null {
        for (let node = this.head; node !== null; node = node.next) {
            if (this.areEqual(node.data, value)) {
                return node;
            }
        }

        return null;
    }

    /**
     * Inserts a node to the end of the list
     * @complexity: O(1)
     * @param value
     */
    public insert(value: T): void {
        const node = { data: value, next: null };

        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }

        this.listLength++;
    }

    /**
     * inserts a node after the value
     * @complexity: O(n)
     * @param value
     * @param newValue
     */
    public insertAfter(value: T, newValue: T): void {
        const node = this.search(value);

        if (node) {
            const newNode = { data: newValue, next: node.next };

            node.next = newNode;

            if (node === this.tail) {
                // if inserted after the tail, then move the tail one step right
                this.tail = newNode;
            }

            this.listLength++;
        }
    }

    /**
     * removes the node
     * @complexity: O(n)
     * @param value
     */
    public remove(value: T): T | null {
        for (let current = this.head, previous = null; current !== null; previous = current, current = current.next) {
            if (this.areEqual(current.data, value)) {
                if (current === this.head) {
                    this.head = this.head.next;
                } else if (current === this.tail) {
                    this.tail = previous;
                } else {
                    (previous as ISinglyLinkecListNode<T>).next = current.next;
                }

                this.listLength--;

                return current.data;
            }
        }

        return null;
    }

    /**
     * removes the head node
     */
    public removeHead() {
        if (this.head) {
            this.head = this.head.next;
        }
    }

    public getHead(): ISinglyLinkecListNode<T> | null {
        return this.head;
    }

    /**
     * traverses through the list
     * @complexity: O(n)
     * @param fn
     */
    public traverse(fn: Function): any {
        for (let node = this.head; node !== null; node = node.next) {
            const result = fn(node);

            if (result !== undefined) {
                return result;
            }
        }
    }

    /**
     * prints the list
     * @complexity: O(n)
     */
    public print(): void {
        let output = '';

        this.traverse((node: ISinglyLinkecListNode<T>) => (output += `${JSON.stringify(node.data)}, `));

        // tslint:disable-next-line
        console.log(`[${output}]`);
    }

    /**
     * checks if two values are equal
     */
    private areEqual: EqualFunction<T> = (a: T, b: T): boolean => a === b;
}
