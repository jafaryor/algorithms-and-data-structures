import {BinarySearchTree} from './index';
import {BinarySearchNode} from './node';

describe('BinarySearchTree', () => {
    const tree = new BinarySearchTree<string>();

    it('should be no root', () => {
        expect(tree.isEmpty()).toBe(true);
        expect(tree.nodes).toEqual(0);
        expect(tree.height).toEqual(0);
    });

    it('should have height of 1 and 1 node', () => {
        tree.recursiveInsert(new BinarySearchNode<string>(26, '26'));

        expect(tree.nodes).toEqual(1);
        expect(tree.height).toEqual(1);
    });

    it('should have the height of 2 and 3 nodes', () => {
        tree.recursiveInsert(new BinarySearchNode<string>(17, '17'));
        tree.insert(new BinarySearchNode<string>(41, '41'));

        expect(tree.nodes).toEqual(3);
        expect(tree.height).toEqual(2);
    });

    it('should have height of 4 and 8 nodes', () => {
        insertNodes(tree, [14, 21, 30, 47, 10]);

        expect(tree.nodes).toEqual(8);
        expect(tree.height).toEqual(4);
    });

    it('should have height of 3 and 7 nodes', () => {
        const node = tree.search(10);

        tree.delete(node!);

        expect(tree.nodes).toEqual(7);
        expect(tree.height).toEqual(3);
    });

    it('should return the correct min value', () => {
        insertNodes(tree, [10, 38, 16, 28, 19, 23]);

        expect(tree.min()!.value).toEqual('10');
    });

    it('should return the correct max value', () => {
        insertNodes(tree, [20, 35, 12, 15, 39, 7]);

        expect(tree.max()!.value).toEqual('47');
    });

    it('should return the correct predecessor', () => {
        insertNodes(tree, [3, 45]);

        const node = tree.iterativeSearch(19);

        expect(tree.predecessor(node!)!.value).toEqual('17');
    });

    it('should return the correct successor', () => {
        const node = tree.iterativeSearch(23);

        expect(tree.successor(node!)!.value).toEqual('26');
    });

    it('should remove the root', () => {
        const root = tree.search(26);

        tree.delete(root!);

        expect(tree.getRoot()!.value).toEqual('28');
    });

    it('should empty the tree', () => {
        tree.empty();

        expect(tree.isEmpty()).toBe(true);
        expect(tree.height).toEqual(0);
        expect(tree.nodes).toEqual(0);
    });

    afterEach(() => {
        expect(isValidBinarySearchTree(tree.getRoot())).toBe(true);
    });
});

/**
 * Inserts a bunch of nodes in a loop.
 */
export function insertNodes(
    tree: BinarySearchTree<string>,
    nodes: number[]
): void {
    nodes.forEach((node: number) => {
        tree.insert(new BinarySearchNode<string>(node, node.toString()));
    });
}

/**
 * Checks if the tree is valid.
 */
export function isValidBinarySearchTree<T>(
    node?: BinarySearchNode<T>
): boolean {
    if (!node) return true;

    const left = isValidBinarySearchTree(node.left);
    const right = isValidBinarySearchTree(node.right);

    if (node.left && !node.right) {
        return left && right && node.left.key < node.key;
    } else if (!node.left && node.right) {
        return left && right && node.key <= node.right.key;
    } else if (node.left && node.right) {
        return (
            left &&
            right &&
            node.left.key < node.key &&
            node.key <= node.right.key
        );
    } else {
        return left && right;
    }
}
