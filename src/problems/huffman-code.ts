import {MinPriorityQueue} from '../data-structures/priority-queue';
import {HeapNode} from '../data-structures/heap/node';
import {BinaryNode} from '../data-structures/binary-tree/node';

/**
 * Huffman codes compress data very effectively: Its greedy algorithm uses
 * a table giving how often each character occurs (i.e., its frequency)
 * to build up an optimal way of representing each character as a binary
 * string. We have many options for how to represent such a file of
 * information. Here, we consider the problem of designing a `binary
 * character code` (or `code` for short) in which each character is
 * represented by a unique binary string, which we call a codeword.
 * A `variable-length code` can do considerably better than a
 * fixed-length code, by giving frequent characters short codewords and
 * infrequent characters long code-words.
 * We consider here only codes in which no codeword is also a prefix of
 * some other codeword. Such codes are called `prefix codes`.
 * Although we won’t prove it here, a prefix code can always achieve the
 * optimal data compression among any character code, and so we suffer no
 * loss of generality by restricting our attention to prefix codes.
 * Prefix codes are desirable because they simplify decoding.
 * Since no codeword is a prefix of any other, the codeword that begins
 * an encoded file is unambiguous.
 * The decoding process needs a convenient representation for the
 * prefix code so that we can easily pick off the initial codeword.
 * A binary tree whose leaves are the given characters provides one such
 * representation. We interpret the binary codeword for a character as
 * the simple path from the root to that character, where `0` means
 * “go to the left child” and `1` means “go to the right child.”
 * Since we can now restrict our attention to full binary trees,
 * we can say that if `C` is the alphabet from which the characters are
 * drawn and all character frequencies are positive, then the tree for
 * an optimal prefix code has exactly `|C|` leaves.
 * For each character `c` in the alphabet `C`, let the attribute `c.freq`
 * denote the frequency of `c` in the file and let `d_T(c)` denote the depth
 * of `c`’s leaf in the tree. Note that `d_T(c)` is also the length of
 * the codeword for character `c`. The number of bits required to encode
 * a file is thus: `B(T) = Σ[c∈C](c.freq * d_T(c))`
 * which is define as the cost of the tree `T`.
 */

/**
 * Alphabet is an array of HeapNodes where:
 * key - is a character frequency
 * value - the root of a Binary Tree
 */
export type Alphabet = Array<HeapNode<BinaryNode<string>>>;

/**
 * Character is a single item of Alphabet.
 */
export type Character = HeapNode<BinaryNode<string>>;

/**
 * Builds the tree corresponding to the optimal code in bottom-up manner.
 * @complexity O(n lgn) :
 * [n actions to build MinPriorityQueue] +
 * + ([n iterations of "for" loop] *
 * * [3 MinPriorityQueue operations (2*extractMin + 1*insert)]) =
 * = n + (n * 3lgn)
 */
export function buildHuffmanTree(
    alphabet: Alphabet,
): BinaryNode<string> | undefined {
    let node: BinaryNode<string>;
    let character: Character;
    let left: Character;
    let right: Character;
    let frequency: number;
    const n = alphabet.length;
    const minPriorityQueue = new MinPriorityQueue(alphabet);

    for (let i = 1; i < n; i++) {
        left = minPriorityQueue.extractMin()!;
        right = minPriorityQueue.extractMin()!;
        frequency = left.key + right.key;

        node = new BinaryNode(
            frequency,
            frequency.toString(),
            undefined,
            left.value,
            right.value,
        );
        character = new HeapNode<BinaryNode<string>>(frequency, node);

        minPriorityQueue.insert(character);
    }

    return minPriorityQueue.extractMin()?.value;
}
