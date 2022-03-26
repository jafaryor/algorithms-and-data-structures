import {EqualFunction} from '../../utils';
import {SinglyLinkedListNode} from './node';

/**
 * Singly Linked List Data Structure.
 */
export class SinglyLinkedList<T> {
    // pointer to the head of the list
    private head: SinglyLinkedListNode<T> | null = null;
    // pointer to the tail of the list
    private tail: SinglyLinkedListNode<T> | null = null;
    // list length
    private listLength: number = 0;

    constructor(array?: T[], comparator?: EqualFunction<T>) {
        if (Array.isArray(array)) {
            array.forEach((value) => this.insert(value));
            this.listLength = array.length;
        }

        if (comparator) {
            this.areEqual = comparator;
        }
    }

    /**
     * length of the list
     */
    get length(): number {
        return this.listLength;
    }

    /**
     * checks if the list is empty
     */
    isEmpty(): boolean {
        return this.listLength === 0;
    }

    /**
     * searches for the value
     * @time O(n)
     * @param value
     * @returns pointer to the node
     */
    search(value: T): SinglyLinkedListNode<T> | null {
        for (let node = this.head; node !== null; node = node.next) {
            if (this.areEqual(node.data, value)) {
                return node;
            }
        }

        return null;
    }

    /**
     * Inserts a node to the end of the list
     * @time O(1)
     * @param value
     */
    insert(value: T): void {
        const node = {data: value, next: null};

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
     * @time O(n)
     * @param value
     * @param newValue
     */
    insertAfter(value: T, newValue: T): void {
        const node = this.search(value);

        if (node) {
            const newNode = {data: newValue, next: node.next};

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
     * @time O(n)
     * @param value
     */
    remove(value: T): T | null {
        for (
            let current = this.head, previous = null;
            current !== null;
            previous = current, current = current.next
        ) {
            if (this.areEqual(current.data, value)) {
                if (current === this.head) {
                    this.head = this.head.next;
                } else if (current === this.tail) {
                    this.tail = previous;
                    this.tail && (this.tail.next = null);
                } else {
                    (previous as SinglyLinkedListNode<T>).next = current.next;
                }

                this.listLength--;

                return current.data;
            }
        }

        return null;
    }

    /**
     * Floyd's Tortoise and Hare Algorithm.
     * If the list is cyclic, returns the entrance of the cycle.
     * Otherwise return "null".
     * @time O(n)
     */
    isCyclic(): SinglyLinkedListNode<T> | null {
        let tortoise = this.head;
        let hare = this.head;

        while (hare && hare.next) {
            tortoise = tortoise!.next;
            hare = hare.next.next;

            if (tortoise === hare) {
                // Cycle is found.
                tortoise = this.head;

                while (tortoise !== hare) {
                    tortoise = tortoise!.next;
                    hare = hare!.next;
                }

                return tortoise;
            }
        }

        return null;
    }

    /**
     * removes the head node
     */
    removeHead() {
        if (this.head) {
            this.head = this.head.next;
        }
    }

    getHead(): SinglyLinkedListNode<T> | null {
        return this.head;
    }

    /**
     * traverses through the list
     * @time O(n)
     * @param fn
     */
    // tslint:disable-next-line: no-any
    forEach(fn: (node: SinglyLinkedListNode<T>) => any): any {
        for (let node = this.head; node !== null; node = node.next) {
            const result = fn(node);

            if (result !== undefined) {
                return result;
            }
        }
    }

    /**
     * Converts to an array.
     * @time O(n)
     */
    toArray(): T[] {
        const array = [] as T[];

        this.forEach((node: SinglyLinkedListNode<T>) => {
            array.push(node.data);
        });

        return array;
    }

    /**
     * prints the list
     * @time O(n)
     */
    print(): void {
        let output = '';

        this.forEach(
            (node: SinglyLinkedListNode<T>) =>
                (output += `${JSON.stringify(node.data)}, `),
        );

        // tslint:disable-next-line
        console.log(`[${output}]`);
    }

    /**
     * checks if two values are equal
     */
    private areEqual: EqualFunction<T> = (a: T, b: T): boolean => a === b;
}
