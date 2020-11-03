/**
 * Doubly-Linked List Node interface.
 */
export interface DoublyLinkedListNode<T> {
    data: T | null;
    previous: DoublyLinkedListNode<T>;
    next: DoublyLinkedListNode<T>;
}

/**
 * Doubly-Linked List Data Structure + Sentinel.
 * @modification: A sentinel is a dummy object that allows us to simplify boundary conditions.
 */
export class DoublyLinkedList<T> {
    private listLength = 0;
    private readonly sentinel: DoublyLinkedListNode<T>;

    constructor(array?: T[]) {
        this.sentinel = {
            data: null,
            previous: this.sentinel,
            next: this.sentinel,
        };

        if (Array.isArray(array)) {
            array.forEach((value) => this.insert(value));
            this.listLength = array.length;
        }
    }

    /**
     * length of the list.
     */
    get length(): number {
        return this.listLength;
    }

    /**
     * inserts a value to the list.
     * @complexity: O(1)
     * @param value
     */
    insert(value: T) {
        const last = this.sentinel.previous || this.sentinel;
        const node: DoublyLinkedListNode<T> = {
            data: value,
            previous: last,
            next: this.sentinel,
        };

        last.next = node;
        this.sentinel.previous = node;
        this.listLength++;
    }

    /**
     * removes the node from list with the data equal to value.
     * @complexity: O(n)
     * @param value
     */
    remove(value: T) {
        const node = this.search(value);

        if (node) {
            node.previous.next = node.next;
            node.next.previous = node.previous;
            this.listLength--;
        }
    }

    /**
     * searches for the value
     * @complexity: O(n)
     * @param value
     * @returns pointer to the node
     */
    search(value: T): DoublyLinkedListNode<T> | null {
        return this.traverse((node: DoublyLinkedListNode<T>) =>
            node.data === value ? node : null,
        );
    }

    /**
     * traverses through the list
     * @complexity: O(n)
     * @param fn
     */
    // tslint:disable-next-line: no-any
    traverse(fn: Function): any {
        for (let node = this.sentinel.next; node !== this.sentinel; node = node.next) {
            const result = fn(node);

            if (result !== undefined) {
                return result;
            }
        }
    }

    /**
     * tells if the list is empty
     */
    isEmpty() {
        return this.listLength === 0;
    }

    /**
     * prints the list
     * @complexity: O(n)
     */
    print(): void {
        let output = '';

        this.traverse(
            (node: DoublyLinkedListNode<T>) => (output += `${JSON.stringify(node.data)}, `),
        );

        // tslint-disable-next-line
        console.log(`[${output}]`);
    }
}
