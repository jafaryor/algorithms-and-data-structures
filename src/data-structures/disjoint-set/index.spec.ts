import {connectedComponents} from '.';
import {DisjointSetNode} from './node';

describe('DisjointSet', () => {
    let components: Array<DisjointSetNode<string>>;
    const vertices = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const edges = [
        [0, 1], // (a, b)
        [0, 2], // (a, c)
        [1, 2], // (b, c)
        [1, 3], // (b, d)
        [4, 5], // (e, f)
        [4, 6], // (e, g)
        [7, 8], // (h, i)
    ];

    beforeAll(() => {
        components = connectedComponents<string>(vertices, edges);
    });

    describe('first connected component', () => {
        it('"a" should be connected to "b"', () => {
            expect(components[0].toSting()).toEqual('a -> b');
        });

        it('"b" should be a root', () => {
            expect(components[1].toSting()).toEqual('b');
        });

        it('"c" should be connected to "b"', () => {
            expect(components[2].toSting()).toEqual('c -> b');
        });

        it('"d" should be connected to "b"', () => {
            expect(components[3].toSting()).toEqual('d -> b');
        });
    });

    describe('second connected component', () => {
        it('"e" should be connected to "f"', () => {
            expect(components[4].toSting()).toEqual('e -> f');
        });

        it('"f" should be a root', () => {
            expect(components[5].toSting()).toEqual('f');
        });

        it('"g" should be connected to "f"', () => {
            expect(components[6].toSting()).toEqual('g -> f');
        });
    });

    describe('third connected component', () => {
        it('"h" should be connected to "i"', () => {
            expect(components[7].toSting()).toEqual('h -> i');
        });

        it('"i" should be a root', () => {
            expect(components[8].toSting()).toEqual('i');
        });
    });

    describe('fourth connected component', () => {
        it('"j" should be a root', () => {
            expect(components[9].toSting()).toEqual('j');
        });
    });
});
