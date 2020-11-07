import {BinaryNode} from '../../data-structures/binary-tree/node';
import {Alphabet, buildHuffmanTree} from '../huffman-code';

describe('Huffman Code', () => {
    let root: BinaryNode<string>;
    let parent: BinaryNode<string>;
    let left: BinaryNode<string>;
    let right: BinaryNode<string>;
    let alphabet: Alphabet;

    describe('6 character file', () => {
        beforeAll(() => {
            alphabet = [
                {
                    key: 45,
                    value: new BinaryNode<string>(45, 'a'),
                },
                {
                    key: 13,
                    value: new BinaryNode<string>(13, 'b'),
                },
                {
                    key: 12,
                    value: new BinaryNode<string>(12, 'c'),
                },
                {
                    key: 16,
                    value: new BinaryNode<string>(16, 'd'),
                },
                {
                    key: 9,
                    value: new BinaryNode<string>(9, 'e'),
                },
                {
                    key: 5,
                    value: new BinaryNode<string>(5, 'f'),
                },
            ];
            root = buildHuffmanTree(alphabet)!;
        });

        it('tree level 1', () => {
            expect([root.key, root.value]).toEqual([100, '100']);
        });

        it('tree level 2', () => {
            parent = root;
            left = parent.left!;
            right = parent.right!;

            expect([left.key, left.value]).toEqual([45, 'a']);
            expect([right.key, right.value]).toEqual([55, '55']);
        });

        it('tree level 3', () => {
            parent = root.right!;
            left = parent.left!;
            right = parent.right!;

            expect([left.key, left.value]).toEqual([25, '25']);
            expect([right.key, right.value]).toEqual([30, '30']);
        });

        it('tree level 4', () => {
            parent = root.right!.left!;
            left = parent.left!;
            right = parent.right!;

            expect([left.key, left.value]).toEqual([12, 'c']);
            expect([right.key, right.value]).toEqual([13, 'b']);

            parent = root.right!.right!;
            left = parent.left!;
            right = parent.right!;

            expect([left.key, left.value]).toEqual([14, '14']);
            expect([right.key, right.value]).toEqual([16, 'd']);
        });

        it('tree level 5', () => {
            parent = root.right!.right!.left!;
            left = parent.left!;
            right = parent.right!;

            expect([left.key, left.value]).toEqual([5, 'f']);
            expect([right.key, right.value]).toEqual([9, 'e']);
        });
    });
});
