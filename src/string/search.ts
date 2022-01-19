/**
 * The string searching algorithms.
 * @where
 *      - n is the length of the string
 *      - m is the length of the pattern.
 */
export class StringSearcher {
    // The modulo value: a big prime number.
    private readonly q = 1000000007;
    // R is an alphabet size.
    private readonly R = 256;

    /**
     * Knuth-Morris-Pratt algorithm.
     * Searches a pattern in a string.
     * Returns the indexes of the occurrence of the pattern in the string.
     * @timeO(n + m)
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
        // The first index of substrings that mach with the search.
        const matchIndices: number[] = [];

        while (i < m && j < n) {
            if (pattern[i] === text[j] && i === m - 1) {
                // The last character of the pattern is matched.
                // The pattern is found.
                matchIndices.push(j - m + 1);
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

        return matchIndices;
    }

    /**
     * Computer the longest proper prefix which is also suffix.
     * @timeO(m)
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

    /**
     * Boyer-Moore algorithm.
     * Scans from right to left in the pattern, skip-ping to align
     * any character causing a mismatch with its rightmost
     * occurrence in the pattern.
     * Returns the indexes of the occurrence of the pattern in the string.
     * @timeO(n * m)
     */
    boyerMoore(pattern: string, text: string): number[] {
        const m = pattern.length;
        const n = text.length;
        const rightOccurrences = this.computeRightmostOccurrences(pattern);
        // The first index of substrings that mach with the search.
        const matchIndices: number[] = [];
        // Indicates how many characters to skip in the text.
        let skip = 0;
        let backtrackIndex = 0;

        // Left ro right scan of text
        for (let i = 0; i <= n - m; i += skip) {
            skip = 0;

            // Right to left scan of pattern.
            for (let j = m - 1; j >= 0; j--) {
                if (pattern[j] !== text[i + j]) {
                    // The character did not match.
                    backtrackIndex = rightOccurrences[text[i + j]];
                    // Skip to the rightmost occurrence of the character.
                    skip = j - (backtrackIndex != null ? backtrackIndex : -1);

                    if (skip < 1) {
                        // The character is not present in the pattern.
                        // Skip to the next character.
                        skip = 1;
                    }

                    break;
                }
            }

            if (skip === 0) {
                // All character matched. I.e. the pattern is found.
                matchIndices.push(i);
                // Skip the found pattern and move to the next character.
                skip = m + 1;
            }
        }

        return matchIndices;
    }

    /**
     * Builds a table giving the rightmost occurrence
     * in the pattern of each possible character.
     * @note If a character is not present in the table,
     *       then its value is -1.
     * @timeO(m)
     */
    private computeRightmostOccurrences(pattern: string): {
        [char: string]: number;
    } {
        const m = pattern.length;
        const rightOccurrences: {[char: string]: number} = {};

        for (let i = 0; i < m; i++) {
            // Since we move from left to right,
            // the rightmost occurrence of the character
            // will overrides the left occurrences.
            rightOccurrences[pattern[i]] = i;
        }

        return rightOccurrences;
    }

    /**
     * Rabin-Karp algorithm.
     * @note works only for extended ASCII characters.
     * @timeO(n * m)
     */
    rabinKarp(pattern: string, text: string): number[] {
        const n = text.length;
        const m = pattern.length;

        // Pattern always should be longer than the text.
        if (n < m) return [];

        // The hash value of the pattern.
        const patternHash = this.hash(pattern);
        // The hash value of the text.
        let textHash = this.hash(text.substr(0, m));
        const rM = this.calculateRadixPowers(pattern);
        // The first index of substrings that mach with the search.
        const matchIndices: number[] = [];

        for (let i = m; i < n; i++) {
            // Calculates the hash value of the text's substring from i-m to i.
            textHash =
                (textHash + this.q - ((rM * text.charCodeAt(i - m)) % this.q)) %
                this.q;
            textHash = (textHash * this.R + text.charCodeAt(i)) % this.q;

            if (textHash === patternHash) {
                // The hash values match.
                // Check if the pattern is a substring of the text.
                if (text.substr(i - m + 1, m) === pattern) {
                    // The pattern is a substring of the text.
                    // The pattern is found.
                    matchIndices.push(i - m + 1);
                }
            }
        }

        return matchIndices;
    }

    /**
     * Calculates the value of R^(m-1) % q.
     * @timeO(m)
     */
    private calculateRadixPowers(pattern: string): number {
        let rM = 1;

        for (let i = 1; i < pattern.length; i++) {
            rM = (rM * this.R) % this.q;
        }

        return rM;
    }

    /**
     * Calculates the hash value of the given text.
     * @timeO(m)
     */
    private hash(text: string): number {
        let prefix = 0;

        for (let i = 0; i < text.length; i++) {
            prefix = (prefix * this.R + text.charCodeAt(i)) % this.q;
        }

        return prefix;
    }
}
