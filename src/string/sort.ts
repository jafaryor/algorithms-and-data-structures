import {createArrayAndFillWith, swap} from '../utils';

/**
 * String Sort algorithms.
 */
export class StringSort {
    // Extended ASCII alphabet size.
    private readonly alphabetRadix = 256;
    // The subarray size to use insertion sort instead of MSD.
    private readonly msdCutoff = 10;
    // 256 length space buffer.
    private auxiliary: string[];

    /**
     * The Least Significant Digit string sort.
     * Sorts the strings on leading "w" characters.
     * To sort an array of strings that each have exactly w characters,
     * we do w key-indexed counting sorts: one for each character position,
     * proceeding from right to left.
     * @note for extended ASCII characters only.
     * @complexity O(7wn + 3wr) = O(wn)
     * @spaceComplexity O(n + r) = O(n)
     */
    lsd(strings: string[], w: number): string[] {
        // Number of all strings.
        const n = strings.length;
        // Holds the frequency counts.
        let count: number[];

        this.auxiliary = [];

        // Sort by key-indexed counting on d-th character.
        for (let d = w - 1; d >= 0; d--) {
            count = createArrayAndFillWith(this.alphabetRadix, 0);

            // Count the number of times each character appears in the strings.
            for (let i = 0; i < n; i++) {
                // charCodeAt() returns the ASCII code of the character.
                count[strings[i].charCodeAt(d) + 1]++;
            }

            // Transform count into indices.
            for (let i = 0; i < this.alphabetRadix; i++) {
                count[i + 1] += count[i];
            }

            // Distribute to the auxiliary array.
            for (let i = 0; i < n; i++) {
                this.auxiliary[count[strings[i].charCodeAt(d)]++] = strings[i];
            }

            // Copy back to original array of strings.
            for (let i = 0; i < n; i++) {
                strings[i] = this.auxiliary[i];
            }
        }

        return strings;
    }

    /**
     * The Most Significant Digit string sort.
     * To sort an array of strings, we sort them on their first character
     * using key-indexed counting, then (recursively) sort the subarrays
     * corresponding to each first-character value.
     * @note for extended ASCII characters only.
     * @complexity O(7wn + 3wr) = O(wn), where w - average string length.
     * @spaceComplexity O(r * length_of_longest_string + n)
     */
    msd(strings: string[]): string[] {
        this.auxiliary = [];

        return this.msdHelper(strings, 0, strings.length - 1, 0);
    }

    /**
     * Sorts from strings[low] to strings[high] at the d-th character.
     */
    private msdHelper(
        strings: string[],
        low: number,
        high: number,
        d: number,
    ): string[] {
        if (high <= low + this.msdCutoff) {
            // Use insertion sort on small subarrays.
            // Because the msd is inefficient for small subarrays.
            this.insertionSort(strings, low, high, d);

            return strings;
        }

        // Holds the frequency counts.
        const count = createArrayAndFillWith(this.alphabetRadix + 2, 0);

        // Count the number of times each character appears in the strings.
        for (let i = low; i <= high; i++) {
            count[this.charAt(strings[i], d) + 2]++;
        }

        // Transform count into indices.
        for (let i = 0; i < this.alphabetRadix + 1; i++) {
            count[i + 1] += count[i];
        }

        // Distribute to the auxiliary array.
        for (let i = low; i <= high; i++) {
            this.auxiliary[count[this.charAt(strings[i], d) + 1]++] =
                strings[i];
        }

        // Copy back to original array of strings.
        for (let i = low; i <= high; i++) {
            strings[i] = this.auxiliary[i - low];
        }

        // Recursively sort for each character value.
        for (let i = 0; i < this.alphabetRadix; i++) {
            this.msdHelper(
                strings,
                low + count[i],
                low + count[i + 1] - 1,
                d + 1,
            );
        }

        return strings;
    }

    /**
     * 3-way string quicksort.
     * To sort an array of strings, we 3-way partition them on their
     * first character, then (recursively) sort the three resulting
     * subarrays: the strings whose first character is less than the
     * partitioning character, the strings whose first character is
     * equal to the partitioning character (excluding their first
     * character in the sort), and the strings whose first character
     * is greater than the partitioning character.
     * @complexity O(wn), where w - average string length.
     * @spaceComplexity O(w + log(n))
     */
    quick3way(strings: string[]): string[] {
        return this.quick3wayHelper(strings, 0, strings.length - 1, 0);
    }

    /**
     * 3-way string quicksort helper.
     */
    private quick3wayHelper(
        strings: string[],
        low: number,
        high: number,
        d: number,
    ): string[] {
        if (high <= low) return strings;

        // Take the d-th char of string[low] string as a pivot.
        const pivot = this.charAt(strings[low], d);
        let i = low + 1;
        let k = low;
        let l = high;

        // Partition the strings into three subarrays:
        // The strings whose first character is less than the pivot,
        // the strings whose first character is equal to the pivot,
        // and the strings whose first character is greater than the pivot.
        while (i <= l) {
            // If the pivot is less than the string, move it to the left.
            if (this.charAt(strings[i], d) < pivot) {
                swap(strings, k++, i++);
            }

            // If the pivot is greater than the string, move it to the right.
            else if (this.charAt(strings[i], d) > pivot) {
                swap(strings, i, l--);
            }

            // If the pivot is equal to the string, do nothing
            else {
                i++;
            }
        }

        // The partition looks like this:
        // strings[low ... k-1] < pivot = strings[k ... l] > strings[l+1 ... high]

        // Sort the first subarrays.
        this.quick3wayHelper(strings, low, k - 1, d);
        // Sort the second subarrays.
        if (pivot >= 0) this.quick3wayHelper(strings, k, l, d + 1);
        // Sort the third subarrays.
        this.quick3wayHelper(strings, l + 1, high, d);

        return strings;
    }

    /**
     * Returns the index of character in the extended ASCII alphabet.
     */
    private charAt(s: string, index: number): number {
        return index < s.length ? s.charCodeAt(index) : -1;
    }

    /**
     * Insertion Sort for small strings (from 1 to 10 characters).
     */
    private insertionSort(
        strings: string[],
        low: number,
        high: number,
        d: number,
    ): string[] {
        for (let i = low; i <= high; i++) {
            for (
                let j = i;
                j > low &&
                strings[j]
                    .substring(d)
                    .localeCompare(strings[j - 1].substring(d)) < 0;
                j--
            ) {
                swap(strings, j, j - 1);
            }
        }

        return strings;
    }
}
