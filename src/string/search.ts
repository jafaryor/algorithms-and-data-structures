/**
 * The string searching algorithms.
 */
export class StringSearcher {
    /**
     * Knuth-Morris-Pratt algorithm.
     * Searches a pattern in a string.
     * Returns the indexes of the occurrence of the pattern in the string.
     * @complexity O(n + m), where:
     *      - n is the length of the string
     *      - m is the length of the pattern.
     */
    knuthMorrisPratt(pattern: string, text: string): number[] {
        const m = pattern.length;
        const n = text.length;
        // Compute the longest proper prefix which is also suffix.
        const lps = this.computeLPS(pattern);
        // The index of the first character of the pattern in the text.
        let i = 0;
        // The index of the first character of the text.
        let j = 0;
        // The result of the search.
        const result: number[] = [];

        while (i < m && j < n) {
            if (pattern[i] === text[j] && i === m - 1) {
                // The last character of the pattern is matched.
                // The pattern is found.
                result.push(j - m + 1);
                i = 0;
                j++;
            } else if (pattern[i] === text[j]) {
                // The character matches.
                i++;
                j++;
            } else {
                if (i !== 0) {
                    // The first character is not matched.
                    // Backtrack
                    i = lps[i - 1];
                } else {
                    // Mismatch after at least one matching character.
                    j++;
                }
            }
        }

        return result;
    }

    /**
     * Computer the longest proper prefix which is also suffix.
     * @complexity O(m), where m is the length of the pattern.
     */
    private computeLPS(pattern: string): number[] {
        const m = pattern.length;
        const lps = new Array<number>(m);
        let i = 0;
        let j = 1;

        // No proper prefix for the string of length 1.
        lps[0] = 0;

        while (j < m) {
            if (pattern[i] === pattern[j]) {
                // The character matches.
                lps[j] = i + 1;
                i++;
                j++;
            } else if (i !== 0) {
                // The first character is not matched.
                i = lps[i - 1];
            } else {
                // Mismatch after at least  one matching character.
                lps[j] = 0;
                j++;
            }
        }

        return lps;
    }
}
