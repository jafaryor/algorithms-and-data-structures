import {Trie} from '.';

describe('Trie', () => {
    const trie = new Trie<number>();

    beforeEach(() => {
        trie.insert('by', 4);
        trie.insert('shells', 3);
        trie.insert('she', 0);
        trie.insert('sea', 2);
        trie.insert('the', 5);
        trie.insert('sells', 1);
    });

    it('should find existing words', () => {
        expect(trie.search('she')).toBe(0);
        expect(trie.search('shells')).toBe(3);
        expect(trie.search('by')).toBe(4);
        expect(trie.search('sells')).toBe(1);
        expect(trie.search('sea')).toBe(2);
        expect(trie.search('the')).toBe(5);
    });

    it('should not find non-existing words', () => {
        expect(trie.search('buy')).toBeUndefined();
        expect(trie.search('ant')).toBeUndefined();
        expect(trie.search('these')).toBeUndefined();
    });

    it('should delete word "she"', () => {
        trie.delete('she');

        expect(trie.search('she')).toBeUndefined();
        expect(trie.search('shells')).toBe(3);
    });

    it('should delete word "shells"', () => {
        trie.delete('shells');

        expect(trie.search('shells')).toBeUndefined();
        expect(trie.search('she')).toBe(0);
    });

    it('should not delete non-existing words', () => {
        trie.delete('these');
        expect(trie.search('the')).toBe(5);
    });

    it('should be two words with prefix "sh"', () => {
        expect(trie.keysWithPrefix('sh')).toEqual(['she', 'shells']);
    });

    it('longest prefix of "sellsman" should be "sells"', () => {
        expect(trie.longestPrefixOf('sellsman')).toBe('sells');
    });
});
