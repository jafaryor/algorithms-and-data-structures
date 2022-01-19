// ======================================================================
// The Naive String Matching Algorithm.
// ======================================================================

/**
 * The naive string-matching algorithm for finding all valid shifts of P in T.
 * @param T - text
 * @param P - pattern
 * @timeO((n - m + 1) * m)
 */
export function naiveStringMatching(T: string, P: string): number[] {
    const n = T.length;
    const m = P.length;
    const shifts = [] as number[];

    for (let s = 0; s <= n - m; s++) {
        if (P === T.substr(s, m)) {
            shifts.push(s);
        }
    }

    return shifts;
}

// ======================================================================
// The Rabin-Karp String Matching Algorithm.
// ======================================================================

/**
 * The Rabin-Karp Algorithm for finding pattern occurrences in a text.
 * @param T - text
 * @param P - patterns
 * @param d - size of alphabet
 * @param q - any prime number to avoid big numbers
 * @note all characters are interpreted as radix-10 digits.
 * @timeO((n - m + 1) * m)
 */
export function rabinKarpMatcher(
    T: string,
    P: string,
    alphabet: string[],
    q: number = 101,
): number[] {
    const n = T.length;
    const m = P.length;
    const d = alphabet.length;
    const h = Math.pow(d, m - 1) % q;
    const shifts = [] as number[];
    const input = rabinKarpPreprocess(T, P, alphabet);
    // Pattern hash code.
    let patternHash = 0;
    // The hash code of the current m-length part of text.
    let textHash = 0;

    // Preprocessing.
    for (let i = 0; i < m; i++) {
        // Computes hash value of P.
        patternHash = (d * patternHash + input.P[i]) % q;
        // Compute hash value of T[1...m].
        textHash = (d * textHash + input.T[i]) % q;
    }

    // Slide the pattern over text one by one.
    for (let s = 0; s <= n - m; s++) {
        // Check if hashes of P and T[s...s+m] are equal.
        if (patternHash === textHash) {
            // Check if content of P and T[s...s+m] are equal,
            // in order to rule out the possibility of a
            // "spurious hit" (when hashes are equal but contents are different).
            if (P === T.substr(s, m)) {
                shifts.push(s);
            }
        }

        // Check if shift s is valid.
        if (s < n - m) {
            // Compute the hash value of T[s+1...s+m+1] for the next iteration.
            textHash = (d * (textHash - input.T[s] * h) + input.T[s + m]) % q;

            // We might get negative value of t, converting it to positive .
            if (textHash < 0) textHash = textHash + q;
        }
    }

    return shifts;
}

/**
 * Converts text and pattern strings into radix-10 digits.
 * @param T - text
 * @param P - patterns
 * @param alphabet (∑) - alphabet
 */
function rabinKarpPreprocess(
    T: string,
    P: string,
    alphabet: string[],
): {
    T: number[];
    P: number[];
} {
    const dictionary = alphabet.reduce(
        (dict: {[key: string]: number}, char: string, i: number) => {
            dict[char] = i;

            return dict;
        },
        {} as {[key: string]: number},
    );

    return {
        T: Array.from(T).map((char: string) => dictionary[char]),
        P: Array.from(P).map((char: string) => dictionary[char]),
    };
}

// ======================================================================
// The Finite Automata String Matching Algorithm.
// ======================================================================

/**
 * The Finite Automata Algorithm for finding pattern occurrences in a text.
 * @param T - text
 * @param P - pattern
 * @param alphabet (∑) - alphabet
 * @timeO(n)
 */
export function finiteAutomatonMatcher(
    T: string,
    P: string,
    alphabet: string[],
): number[] {
    const n = T.length;
    const m = P.length;
    const shifts = [] as number[];
    const transitionTable = computeTransitionFunction(P, alphabet);
    let q = 0;

    // Go through each character of the text T.
    for (let i = 1; i <= n; i++) {
        // Transition to a new state after reading the next character of the text.
        q = transitionTable[q][T[i - 1]];

        // Check if automaton is in final state, which means the pattern is found.
        if (q === m) shifts.push(i - m);
    }

    return shifts;
}

/**
 * Creates a transition table from Pattern and Alphabet.
 * @param P - pattern
 * @param alphabet (∑) - alphabet
 * @timeO(m^3 * |∑|)
 */
function computeTransitionFunction(
    P: string,
    alphabet: string[],
): Array<{[character: string]: number}> {
    const m = P.length;
    const transitionTable = [] as Array<{[character: string]: number}>;
    let k: number;

    // Go through states.
    for (let q = 0; q <= m; q++) {
        transitionTable.push({});

        // Go through alphabet characters.
        for (const character of alphabet) {
            // We start with largest k such that:
            // (P_k) ⊐ (P_q + character).
            k = Math.min(m, q + 1);

            // Decrease k until (P_k) ⊐ (P_q + character) becomes true,
            // which must eventually occur, since P_0 = Ɛ is a suffix of every thing.
            while (
                !isSuffixOf(`${P.substr(0, q)}${character}`, P.substr(0, k))
            ) {
                k--;
            }

            // Set δ(q, character) to be the largest k such that
            // (P_k) ⊐ (P_q + character).
            transitionTable[q][character] = k;
        }
    }

    return transitionTable;
}

// ======================================================================
// The Knuth-Morris-Pratt String Matching Algorithm.
// ======================================================================

/**
 * The Knuth-Morris-Pratt Algorithm for finding pattern occurrences in a text.
 * @param T - text
 * @param P - pattern
 * @timeO(n + m) = O(n)
 */
export function knuthMorrisPrattMatcher(T: string, P: string): number[] {
    const n = T.length;
    const m = P.length;
    const shifts = [] as number[];
    const prefix = computePrefixFunction(P);
    let q = 0;

    // Go through the text characters.
    for (let i = 0; i < n; i++) {
        // Check if characters unmatched.
        while (q > 0 && P[q] !== T[i]) {
            // Roll back to the last index of matching prefix.
            q = prefix[q - 1];
        }

        // Check if characters match.
        if (P[q] === T[i]) {
            // Move "q" forward as a match has been found.
            q++;
        }

        // Check if prefix is in final state, which means the pattern is found.
        if (q === m) {
            shifts.push(i - m + 1);

            // Roll back "q" in order to start matching the pattern again.
            q = prefix[q - 1];
        }
    }

    return shifts;
}

/**
 * Computes a prefix function out of pattern.
 * @idea If we know a specific part of pattern is a pattern's prefix,
 *      then we don't need to run through the whole pattern again
 *      to find the match. Instead we start from last index of prefix,
 *      because the suffix of sub-pattern is equal to prefix of pattern.
 *      Example: "cabcad" has the following prefix function [0,0,0,1,2,0].
 * @param P - pattern
 * @timeO(2m) = O(m)
 */
function computePrefixFunction(P: string): number[] {
    const m = P.length;
    const prefix = new Array(m);
    let k = 0;

    prefix[0] = 0;

    // Go through the pattern characters.
    for (let q = 1; q < m; q++) {
        // Check if characters unmatched.
        while (k > 0 && P[k] !== P[q]) {
            // Roll back "k" to the last index of prefix,
            // which is equal to a suffix of P_q.
            k = prefix[k - 1];
        }

        // Check if characters match.
        if (P[k] === P[q]) {
            // Move "k" forward as a match has been found.
            k++;
        }

        // Record the match.
        prefix[q] = k;
    }

    return prefix;
}

// ======================================================================
// Utility Functions.
// ======================================================================

/**
 * Checks if "b" is a suffix of "a".
 * @time(|b|)
 */
export function isSuffixOf(a: string, b: string): boolean {
    return a.endsWith(b);
}

/**
 * Checks if "b" is a prefix of "a".
 * @time(|b|)
 */
export function isPrefixOf(a: string, b: string): boolean {
    return a.startsWith(b);
}
