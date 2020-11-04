import {RedBlackTree} from './index';
import {RedBlackNode} from './node';
import {isValidBinarySearchTree} from '../binary-search-tree/index.spec';

describe('RedBlackTree', () => {
    let tree: RedBlackTree<string>;
    let grandparent: RedBlackNode<string>;
    let parent: RedBlackNode<string>;
    let node: RedBlackNode<string>;
    let uncle: RedBlackNode<string> | undefined;
    let sibling: RedBlackNode<string> | undefined;

    beforeAll(() => {
        tree = new RedBlackTree<string>();
    });

    it('should be empty', () => {
        expect(tree.getRoot()).toBeUndefined();
        expect(tree.nodes).toEqual(0);
        expect(tree.height).toEqual(0);
    });

    it('should insert a root and fix the tree', () => {
        const root = new RedBlackNode<string>(11, '11');

        tree.insert(root);

        expect(tree.getRoot()).toBe(root);
        expect(tree.nodes).toEqual(1);
        expect(tree.height).toEqual(1);
    });

    it('should insert two more nodes', () => {
        tree.insert(new RedBlackNode<string>(14, '14'));
        tree.insert(new RedBlackNode<string>(2, '2'));

        expect(tree.nodes).toEqual(3);
        expect(tree.height).toEqual(2);
    });

    /* No Insert Fixup happened so far. */

    describe('Insert Fixup', () => {
        /* Tree:
                11[B]
            2[R]    14[R]
        */

        it('should insert (Case A1)', () => {
            node = new RedBlackNode<string>(1, '1');
            grandparent = tree.getRoot() as RedBlackNode<string>;
            parent = grandparent.left!;
            uncle = grandparent.right;

            expect(grandparent.isBlack()).toBe(true);
            expect(parent.isRed()).toBe(true);
            expect(tree.isRedNode(uncle)).toBe(true);

            tree.insert(node);

            expect(node.parent).toBe(parent);
            expect(grandparent.isBlack()).toBe(true);
            expect(parent.isBlack()).toBe(true);
            expect(tree.isBlackNode(uncle)).toBe(true);
            expect(node.isRed()).toBe(true);
        });

        it('should insert (Case B1)', () => {
            tree.insert(new RedBlackNode<string>(20, '20'));
            tree.insert(new RedBlackNode<string>(7, '7'));

            node = new RedBlackNode<string>(5, '5');
            grandparent = tree.search(2) as RedBlackNode<string>;
            parent = grandparent.right!;
            uncle = grandparent.left;

            expect(grandparent.isBlack()).toBe(true);
            expect(parent.isRed()).toBe(true);
            expect(tree.isRedNode(uncle)).toBe(true);

            tree.insert(node);

            expect(node.parent).toBe(parent);
            expect(grandparent.isRed()).toBe(true);
            expect(parent.isBlack()).toBe(true);
            expect(tree.isBlackNode(uncle)).toBe(true);
            expect(node.isRed()).toBe(true);
        });

        it('should insert (Case A2 & A3)', () => {
            node = new RedBlackNode<string>(6, '6');
            grandparent = tree.iterativeSearch(7) as RedBlackNode<string>;
            parent = grandparent.left!;
            uncle = grandparent.right;

            expect(grandparent.isBlack()).toBe(true);
            expect(parent.isRed()).toBe(true);
            expect(uncle).toBeUndefined();

            tree.insert(node);

            expect(node.parent).toBe(tree.search(2));
            expect(node.left).toBe(tree.search(5));
            expect(node.right).toBe(tree.search(7));

            expect(grandparent.isRed()).toBe(true);
            expect(parent.isRed()).toBe(true);
            expect(node.isBlack()).toBe(true);
        });

        it('should insert (Case B2 & B3)', () => {
            node = new RedBlackNode<string>(17, '17');
            grandparent = tree.iterativeSearch(14) as RedBlackNode<string>;
            parent = grandparent.right!;
            uncle = grandparent.left;

            expect(grandparent.isBlack()).toBe(true);
            expect(parent.isRed()).toBe(true);
            expect(uncle).toBeUndefined();

            tree.insert(node);

            expect(node.parent).toBe(tree.getRoot());
            expect(node.left).toBe(tree.search(14));
            expect(node.right).toBe(tree.search(20));

            expect(grandparent.isRed()).toBe(true);
            expect(parent.isRed()).toBe(true);
            expect(node.isBlack()).toBe(true);
        });

        it('should change the root as a result of balancing', () => {
            node = new RedBlackNode<string>(10, '10');
            grandparent = tree.iterativeSearch(6) as RedBlackNode<string>;
            parent = grandparent.right!;
            uncle = grandparent.left;

            expect(grandparent.isBlack()).toBe(true);
            expect(parent.isRed()).toBe(true);
            expect(tree.isRedNode(uncle)).toBe(true);

            tree.insert(node);

            expect(node.parent).toBe(tree.search(7));
            expect(grandparent).toBe(tree.getRoot());
            expect(node.left).toBeUndefined();
            expect(node.right).toBeUndefined();

            expect(grandparent.isBlack()).toBe(true);
            expect(parent.isBlack()).toBe(true);
            expect(node.isRed()).toBe(true);
        });
    });

    describe('', () => {
        /* Tree:
                                6[B]
                    2[R]                        11[R]
            1[B]            5[B]        7[B]            17[B]
                                           10[R]    14[R]      20[R]
        */

        it('should delete root', () => {
            node = tree.getRoot() as RedBlackNode<string>;

            expect(node.isBlack()).toBe(true);
            expect(node.parent).toBeUndefined();

            tree.delete(node);

            expect(tree.search(6)).toBeUndefined();
            expect(tree.getRoot()).toBe(tree.search(7));
        });

        it('should delete 17', () => {
            node = tree.search(17) as RedBlackNode<string>;
            parent = node.parent!; // 11
            sibling = parent.left; // 7

            expect(parent.isRed()).toBe(true);
            expect(tree.isBlackNode(sibling)).toBe(true);

            tree.delete(node);

            expect(tree.search(17)).toBeUndefined();
            expect(parent.right).toBe(tree.search(20));
        });

        it('should remove 11', () => {
            node = tree.search(11) as RedBlackNode<string>;
            parent = node.parent!; // 7 - root
            sibling = parent.left; // 2

            tree.delete(node);

            expect(tree.search(11)).toBeUndefined();
            expect(parent.right).toBe(tree.search(14));
            expect(parent.right!.isRed()).toBe(true);
        });

        it('should delete 1', () => {
            node = tree.search(1) as RedBlackNode<string>;
            parent = node.parent!; // 2
            sibling = parent.right; // 5

            tree.delete(node);

            expect(tree.search(1)).toBeUndefined();
            expect(parent.left).toBeUndefined();

            expect(parent.isBlack()).toBe(true);
            expect(tree.isRedNode(sibling)).toBe(true);
        });

        it('should delete 2', () => {
            node = tree.search(2) as RedBlackNode<string>;
            parent = node.parent!; // 7 - root
            sibling = parent.right; // 14

            tree.delete(node);

            expect(tree.search(2)).toBeUndefined();
            expect(parent.left).toBe(tree.search(5));

            expect(parent.isBlack()).toBe(true);
            expect(tree.isBlackNode(parent.left)).toBe(true);
        });

        it('should delete 5', () => {
            node = tree.search(5) as RedBlackNode<string>;
            parent = node.parent!; // 7 - root
            sibling = parent.right; // 14

            tree.delete(node);

            expect(tree.search(5)).toBeUndefined();
            expect(tree.getRoot()).toBe(sibling);
            expect(sibling!.left).toBe(parent);
            expect(sibling!.right).toBe(tree.search(20));

            expect(tree.isBlackNode(sibling)).toBe(true);
            expect(tree.isBlackNode(sibling!.left)).toBe(true);
            expect(tree.isBlackNode(sibling!.right)).toBe(true);
        });
    });

    afterEach(() => {
        expect(isValidRedBlackTree(tree)).toBe(true);
    });
});

/**
 * Checks if the tree is a valid red-black tree.
 */
export function isValidRedBlackTree<T>(tree: RedBlackTree<T>): boolean {
    const root = tree.getRoot() as RedBlackNode<T>;

    return (
        isValidBinarySearchTree &&
        isRootBlack(tree) &&
        isRedHasBlackChildren(tree, root) &&
        areAllLeafHasEqualBlackHeight(tree)
    );
}

/**
 * Checks if the root is black.
 */
function isRootBlack<T>(tree: RedBlackTree<T>): boolean {
    return tree.isBlackNode(tree.getRoot() as RedBlackNode<T>);
}

/**
 * Checks if every red node has black children.
 */
function isRedHasBlackChildren<T>(
    tree: RedBlackTree<T>,
    node?: RedBlackNode<T>,
): boolean {
    if (!node) return true;

    const left = isRedHasBlackChildren(tree, node.left);
    const right = isRedHasBlackChildren(tree, node.right);

    if (node.isRed()) {
        return (
            left &&
            right &&
            tree.isBlackNode(node.left) &&
            tree.isBlackNode(node.right)
        );
    } else {
        return left && right;
    }
}

/**
 * Checks if the black height of all leafs are equal.
 */
function areAllLeafHasEqualBlackHeight<T>(tree: RedBlackTree<T>): boolean {
    const root = tree.getRoot() as RedBlackNode<T>;
    const blackHeight = root ? areAllLeafHasEqualBlackHeightHelper(1, root) : 0;

    return blackHeight < 0 ? false : true;
}

/**
 * Calculates the black height of a node and
 * checks if black height of its children are equal.
 */
function areAllLeafHasEqualBlackHeightHelper<T>(
    height: number,
    node?: RedBlackNode<T>,
): number {
    // Leaf is a black node.
    if (!node) return height + 1;

    const blackHeight = node.isBlack() ? height + 1 : height;
    const leftBlackHeight = areAllLeafHasEqualBlackHeightHelper(
        blackHeight,
        node.left,
    );
    const rightBlackHeight = areAllLeafHasEqualBlackHeightHelper(
        blackHeight,
        node.right,
    );

    // -1 is an unbalance indicator.
    return leftBlackHeight === rightBlackHeight ? leftBlackHeight : -1;
}
