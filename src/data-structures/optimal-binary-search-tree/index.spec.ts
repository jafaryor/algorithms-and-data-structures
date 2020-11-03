import {OptimalBinarySearchTree} from '.';
import {BinarySearchNode} from '../binary-search-tree/node';

describe('OptimalBinarySearchTree', () => {
    let tree: OptimalBinarySearchTree<string>;
    let root: BinarySearchNode<string>;

    it('5 nodes', () => {
        tree = new OptimalBinarySearchTree<string>(
            ['null', '1', '2', '3', '4', '5'],
            [0, 0.15, 0.1, 0.05, 0.1, 0.2],
            [0.05, 0.1, 0.05, 0.05, 0.05, 0.1],
        );

        root = tree.getRoot()!;

        expect(root.value).toEqual('2');
        expect(root.left?.value).toEqual('1');
        expect(root.right?.value).toEqual('5');
        expect(root.right?.left?.value).toEqual('4');
        expect(root.right?.left?.left?.value).toEqual('3');
    });

    it('7 nodes', () => {
        tree = new OptimalBinarySearchTree<string>(
            ['null', '1', '2', '3', '4', '5', '6', '7'],
            [0, 0.04, 0.06, 0.08, 0.02, 0.1, 0.12, 0.14],
            [0.06, 0.06, 0.06, 0.06, 0.05, 0.05, 0.05, 0.05],
        );

        root = tree.getRoot()!;

        expect(root.value).toEqual('5');
        expect(root.left?.value).toEqual('2');
        expect(root.left?.left?.value).toEqual('1');
        expect(root.left?.right?.value).toEqual('3');
        expect(root.left?.right?.right?.value).toEqual('4');
        expect(root.right?.value).toEqual('7');
        expect(root.right?.left?.value).toEqual('6');
    });
});
