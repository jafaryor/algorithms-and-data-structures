/**
 * Doubly-Linked List Node interface.
 */
export interface IDoublyLinkedListNode<T> {
    data: T | null;
    previous: IDoublyLinkedListNode<T>;
    next: IDoublyLinkedListNode<T>;
}

/**
 * Doubly-Linked List Data Structure + Sentinel.
 * @modification: A sentinel is a dummy object that allows us to simplify boundary conditions.
 */
export class DoublyLinkedList<T> {
    private listLength = 0;
    private readonly sentinel: IDoublyLinkedListNode<T> = {
        data: null,
        previous: this.sentinel,
        next: this.sentinel
    };

    constructor(array?: T[]) {
        this.sentinel.previous = this.sentinel;
        this.sentinel.next = this.sentinel;

        if (Array.isArray(array)) {
            array.forEach(value => this.insert(value));
            this.listLength = array.length;
        }
    }

    /**
     * length of the list.
     */
    public get length(): number {
        return this.listLength;
    }

    /**
     * inserts a value to the list.
     * @complexity: O(1)
     * @param value
     */
    public insert(value: T) {
        const last = this.sentinel.previous;
        const node: IDoublyLinkedListNode<T> = {
            data: value,
            previous: last,
            next: this.sentinel
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
    public remove(value: T) {
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
    public search(value: T): IDoublyLinkedListNode<T> | null {
        return this.traverse((node: IDoublyLinkedListNode<T>) => (node.data === value ? node : null));
    }

    /**
     * traverses through the list
     * @complexity: O(n)
     * @param fn
     */
    public traverse(fn: Function): any {
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
    public isEmpty() {
        return this.listLength === 0;
    }

    /**
     * prints the list
     * @complexity: O(n)
     */
    public print(): void {
        let output = '';

        this.traverse((node: IDoublyLinkedListNode<T>) => (output += `${node.data}, `));

        // tslint:disable-next-line
        console.log(`[${output}]`);
    }
}
