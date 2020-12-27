/**
 * Singly-Linked List Node Interface.
 */
export interface SinglyLinkedListNode<T> {
    data: T;
    next: SinglyLinkedListNode<T> | null;
}
