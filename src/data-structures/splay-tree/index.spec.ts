import {SplayTree} from './';
import {
    isValidBinarySearchTree,
    insertNodes,
} from '../binary-search-tree/index.spec';
import {BinarySearchNode} from '../binary-search-tree/node';

describe('Splay Tree', () => {
    const tree = new SplayTree<string>();
    let node: BinarySearchNode<string>;

    it('should be empty', () => {
        expect(tree.nodes).toEqual(0);
        expect(tree.height).toEqual(0);
        expect(tree.isEmpty()).toBe(true);
    });

    it('should insert root', () => {
        node = new BinarySearchNode<string>(8, '8');

        tree.insert(node);

        expect(tree.getRoot()).toBe(node);
    });

    it('should insert a bunch of nodes', () => {
        insertNodes(tree, [1, 5, 11, 20, 7, 4]);

        expect(tree.getRoot()).toBe(tree.searchWithoutSplay(4));
    });

    it('should delete a leaf', () => {
        node = tree.searchWithoutSplay(8)!;

        tree.delete(node);

        expect(tree.searchWithoutSplay(8)).toBeUndefined();
        expect(tree.getRoot()).toBe(tree.searchWithoutSplay(7));
    });

    it('should delete a node with one child', () => {
        node = tree.searchWithoutSplay(11)!;

        tree.delete(node);

        expect(tree.searchWithoutSplay(11)).toBeUndefined();
        expect(tree.getRoot()).toBe(tree.searchWithoutSplay(7));
    });

    it('should delete the root', () => {
        node = tree.searchWithoutSplay(7)!; // root

        tree.delete(node);

        expect(tree.searchWithoutSplay(7)).toBeUndefined();
        expect(tree.getRoot()).toBe(tree.searchWithoutSplay(5));
    });

    it('should splay the node after find it', () => {
        node = tree.searchWithoutSplay(1)!;

        tree.search(1);

        expect(tree.getRoot()).toBe(node);
    });

    it('should delete the rest of the nodes', () => {
        tree.delete(tree.searchWithoutSplay(4)!);
        tree.delete(tree.searchWithoutSplay(1)!);
        tree.delete(tree.searchWithoutSplay(20)!);
        tree.delete(tree.searchWithoutSplay(5)!);

        expect(tree.getRoot()).toBeUndefined();
    });

    afterEach(() => {
        expect(isValidBinarySearchTree(tree.getRoot())).toBe(true);
    });
});
