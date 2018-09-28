export interface ISinglyLinkecListNode<T> {
    data: T;
    next: ISinglyLinkecListNode<T> | null;
}

/**
 * Singly Linked List Data Structure
 */
export class SinglyLinkedList<T> {
    // pointer to the head of the list
    private head: ISinglyLinkecListNode<T> | null = null;
    // pointer to the tail of the list
    private tail: ISinglyLinkecListNode<T> | null = null;
    // list length
    private listLength: number = 0;

    constructor(array?: T) {
        if (Array.isArray(array)) {
            array.forEach(element => this.add(element));
        }
    }

    /**
     * searches for the value
     * @complexity: O(n)
     * @param value
     * @returns pointer to the node
     */
    public search(value: T): ISinglyLinkecListNode<T> | null {
        return this.traverse((node: ISinglyLinkecListNode<T>) => (node.data === value ? node : null));
    }

    /**
     * adds a node to the end of the list
     * @complexity: O(1)
     * @param value
     */
    public add(value: T): void {
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
     * inserts a node after
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
    public remove(value: T): boolean {
        let previous = this.head;

        return (
            this.traverse((current: ISinglyLinkecListNode<T>) => {
                if (current.data === value && previous) {
                    if (current === this.head) {
                        this.head = this.head.next;
                    } else if (current === this.tail) {
                        this.tail = previous;
                    }

                    previous.next = current.next;
                    this.listLength--;

                    return true;
                }

                previous = current;
            }) || false
        );
    }

    /**
     * traverses through the list
     * @complexity: O(n)
     * @param fn
     */
    public traverse(fn: Function): any {
        for (let node = this.head; node !== null; node = node.next) {
            const result = fn(node);

            if (result) {
                return result;
            }
        }
    }

    /**
     * length of the list
     */
    public get length(): number {
        return this.listLength;
    }

    /**
     * tells if the list is empty
     */
    public isEmpty(): boolean {
        return this.listLength === 0;
    }

    /**
     * prints the list
     * @complexity: O(n)
     */
    public print(): void {
        let output = '';

        this.traverse((node: ISinglyLinkecListNode<T>) => (output += `${node.data}, `));

        // tslint:disable-next-line
        console.log(`[${output}]`);
    }
}
