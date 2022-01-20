import {Queue} from '..';
import {TrieNode} from './node';

/**
 * The Trie data structure.
 * @note n - referred to the length of the given word.
 */
export class Trie<T> {
    // The root node of the trie.
    private readonly root = new TrieNode<T>();

    /**
     * Returns the value associated with the given word (key).
     * @time O(n)
     */
    search(word: string): T | undefined {
        const node = this.searchHelper(this.root, word, 0);

        return node && node.value;
    }

    /**
     * The search helper function.
     * Returns value associated with key in the subtrie rooted at node.
     */
    private searchHelper(
        node: TrieNode<T> | undefined,
        word: string,
        index: number,
    ): TrieNode<T> | undefined {
        if (node == null) return;

        // If the word is over, return the value.
        if (index === word.length) return node;

        // Use index's character to determine which subtrie to search.
        const char = word[index];

        // Recursively search the subtrie.
        return this.searchHelper(node.children[char], word, index + 1);
    }

    /**
     * Inserts a word into the trie.
     * @time O(n)
     */
    insert(word: string, value: T): void {
        this.insertHelper(this.root, word, value, 0);
    }

    /**
     * The insert helper function.
     * Change value associated with key if in subtrie rooted at given node.
     */
    private insertHelper(
        node: TrieNode<T> | undefined,
        word: string,
        value: T,
        index: number,
    ): TrieNode<T> {
        if (node == null) {
            node = new TrieNode<T>();
        }

        // If the word is over, set the value.
        if (index === word.length) {
            node.value = value;
        } else {
            // Use index's character to determine which subtrie to insert into.
            const char = word[index];

            // Recursively insert the word into the subtrie.
            node.children[char] = this.insertHelper(
                node.children[char],
                word,
                value,
                index + 1,
            );
        }

        return node;
    }

    /**
     * Deletes a word from the trie.
     * @time O(n)
     */
    delete(word: string): void {
        this.deleteHelper(this.root, word, 0);
    }

    /**
     * The delete helper function.
     */
    private deleteHelper(
        node: TrieNode<T> | undefined,
        word: string,
        index: number,
    ): TrieNode<T> | undefined {
        if (node == null) return;

        // - - - Top to bottom. - - -
        if (index === word.length) {
            // The word is found, delete the node's value.
            node.value = undefined;
        } else {
            // Use index's character to determine which subtrie to delete from.
            const char = word[index];

            // Recursively delete the word in bottom-up manner.
            node.children[char] = this.deleteHelper(
                node.children[char],
                word,
                index + 1,
            )!;
        }

        // - - - Bottom to top. - - -
        // If node has value then keep the node.
        if (node.value != null) return node;

        // If node has a child. keep the node.
        for (const char in node.children) {
            if (node.children[char] != null) return node;
        }

        // Otherwise, delete the node.
        return;
    }

    /**
     * Searches for all words in the trie starting with the given prefix.
     */
    keysWithPrefix(prefix: string): string[] {
        const queue = new Queue<string>();
        // Finds the trie node corresponding to the prefix.
        const node = this.searchHelper(this.root, prefix, 0);

        this.collect(node, prefix, queue);

        return queue.toArray();
    }

    /**
     * Collects all the words in the trie.
     */
    private collect(
        node: TrieNode<T> | undefined,
        prefix: string,
        queue: Queue<string>,
    ): void {
        if (node == null) return;

        // If the node has a value, add it to the queue.
        if (node.value != null) {
            // A word has found.
            queue.enqueue(prefix);
        }

        // Recursively collect words from the subtrie.
        for (const char in node.children) {
            if (node.children.hasOwnProperty(char)) {
                this.collect(node.children[char], prefix + char, queue);
            }
        }
    }

    /**
     * Finds the longest key that is a prefix of a given string.
     */
    longestPrefixOf(word: string): string {
        const length = this.longestPrefixOfHelper(this.root, word, 0, 0);

        return word.substr(0, length);
    }

    /**
     * Returns the length longest key that is a prefix of a given string.
     */
    private longestPrefixOfHelper(
        node: TrieNode<T> | undefined,
        word: string,
        index: number,
        length: number,
    ): number {
        if (node == null) return length;

        // If the word is found, update the max length.
        if (node.value != null) {
            length = index;
        }

        // If the word is not found, return the length.
        if (index === word.length) return length;

        // Use index's character to determine which subtrie to search.
        const char = word[index];

        // Recursively search the subtrie.
        return this.longestPrefixOfHelper(
            node.children[char],
            word,
            index + 1,
            length,
        );
    }
}
