import {AvlTree} from '.';
import {AvlNode} from './node';

describe('AvlTree', () => {
    const tree = new AvlTree<string>();
    let node: AvlNode<string>;

    describe('insert', () => {
        it('should insert a root', () => {
            node = new AvlNode<string>(8, '8');

            tree.insert(node);

            expect(tree.getRoot()).toBe(node);
        });

        it('should change the root to balance', () => {
            tree.insert(new AvlNode<string>(4, '4'));
            tree.insert(new AvlNode<string>(2, '2'));

            node = tree.getRoot() as AvlNode<string>;

            expect(node).toBe(tree.search(4));
            expect(node.left).toBe(tree.search(2));
            expect(node.right).toBe(tree.search(8));
        });

        it('Case 1', () => {
            node = new AvlNode<string>(1, '1');

            tree.insert(node);

            expect(node.parent).toBe(tree.search(2));
        });

        it('Case 2', () => {
            node = new AvlNode<string>(10, '10');

            tree.insert(node);

            expect(node.parent).toBe(tree.search(8));
        });

        it('Case 3', () => {
            node = new AvlNode<string>(3, '3');

            tree.insert(node);

            expect(node.parent).toBe(tree.search(2));
        });

        it('Case 4', () => {
            node = new AvlNode<string>(7, '7');

            tree.insert(node);

            expect(node.parent).toBe(tree.search(8));
        });

        it('should change the root', () => {
            tree.insert(new AvlNode<string>(6, '6'));
            tree.insert(new AvlNode<string>(5, '5'));
            tree.insert(new AvlNode<string>(9, '9'));
            tree.insert(new AvlNode<string>(14, '14'));
            tree.insert(new AvlNode<string>(17, '17'));

            expect(tree.getRoot()).toBe(tree.search(8));
        });
    });

    describe('delete', () => {
        it('Case 1', () => {
            node = tree.search(2) as AvlNode<string>;

            tree.delete(node);

            expect(tree.search(2)).toBeUndefined();
        });

        it('Case 2', () => {
            node = tree.search(14) as AvlNode<string>;

            tree.delete(node);

            expect(tree.search(14)).toBeUndefined();
        });

        it('Case 3', () => {
            node = tree.search(6) as AvlNode<string>;

            tree.delete(node);

            expect(tree.search(6)).toBeUndefined();
        });

        it('Case 4', () => {
            node = tree.search(9) as AvlNode<string>;

            tree.delete(node);

            expect(tree.search(9)).toBeUndefined();
        });

        it('should change root', () => {
            node = tree.search(10) as AvlNode<string>;

            tree.delete(node);

            expect(tree.search(10)).toBeUndefined();
            expect(tree.getRoot()).toBe(tree.search(4));
        });

        it('should delete a leaf', () => {
            node = tree.search(17) as AvlNode<string>;

            tree.delete(node);

            expect(tree.search(17)).toBeUndefined();
        });

        it('should delete the root', () => {
            node = tree.getRoot() as AvlNode<string>;

            tree.delete(node);

            expect(tree.getRoot()).toBe(tree.search(5));
        });
    });

    afterEach(() => {
        expect(isValidAvlTree(tree.getRoot() as AvlNode<string>)).toBe(true);
    });
});

/**
 * Checks if the AVL tree is valid.
 */
function isValidAvlTree<T>(node: AvlNode<T> | undefined): boolean {
    if (!node) return true;

    const left = isValidAvlTree(node.left);
    const right = isValidAvlTree(node.right);

    return left && right && -1 <= node.balanceFactor && node.balanceFactor <= 1
        ? true
        : false;
}
