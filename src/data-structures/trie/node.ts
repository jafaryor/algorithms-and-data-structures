/**
 * The Trie Node class.
 */
export class TrieNode<T> {
    // The value associated with a word.
    // If it undefined, then it is a prefix.
    value?: T;
    // The children of the node.
    children: TrieChildrenMap<T> = {};

    constructor(value?: T) {
        this.value = value;
    }
}

/**
 * The map between a character and the corresponding TrieNode.
 */
export interface TrieChildrenMap<T> {
    [key: string]: TrieNode<T>;
}
