import {createArrayAndFillWith} from '../utils';

/**
 * The Least Significant Digit string sort.
 * Sorts the strings on leading "w" characters.
 */
export function lsd(strings: string[], w: number): string[] {
    // Number of all strings.
    const n = strings.length;
    // Extended ASCII alphabet size.
    const r = 256;
    // 256 length space buffer.
    const auxiliary: string[] = [];
    // Holds the frequency counts.
    let count: number[];

    // Sort by key-indexed counting on d-th character.
    for (let d = w - 1; d >= 0; d--) {
        count = createArrayAndFillWith(r, 0);

        // Count the number of times each character appears in the strings.
        for (let i = 0; i < n; i++) {
            // charCodeAt() returns the ASCII code of the character.
            count[strings[i].charCodeAt(d) + 1]++;
        }

        // Transform count into indices.
        for (let i = 0; i < r; i++) {
            count[i + 1] += count[i];
        }

        // Distribute to the auxiliary array.
        for (let i = 0; i < n; i++) {
            auxiliary[count[strings[i].charCodeAt(d)]++] = strings[i];
        }

        // Copy back to original array of strings.
        for (let i = 0; i < n; i++) {
            strings[i] = auxiliary[i];
        }
    }

    return strings;
}
