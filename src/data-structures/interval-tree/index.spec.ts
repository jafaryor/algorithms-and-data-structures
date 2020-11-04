import {IntervalTree} from './';
import {IntervalNode, Interval} from './node';
import {isValidRedBlackTree} from '../red-black-tree/index.spec';

describe('Interval Tree', () => {
    let tree: IntervalTree<string>;
    let node: IntervalNode<string>;

    beforeAll(() => {
        tree = new IntervalTree<string>();
    });

    it('should be empty', () => {
        expect(tree.getRoot()).toBeUndefined();
        expect(tree.nodes).toEqual(0);
        expect(tree.height).toEqual(0);
    });

    describe('Insert', () => {
        it('should insert a root', () => {
            node = new IntervalNode<string>(16, 16, '16 - 16');
            tree.insert(node);

            expect(tree.getRoot()).toBe(node);
            expect(tree.nodes).toEqual(1);
            expect(tree.height).toEqual(1);
        });

        it('should insert multiple nodes', () => {
            tree.insert(new IntervalNode<string>(8, 9, '8 - 9'));
            tree.insert(new IntervalNode<string>(25, 30, '25 - 30'));
            tree.insert(new IntervalNode<string>(5, 8, '5 - 8'));
            tree.insert(new IntervalNode<string>(15, 23, '15 - 23'));
            tree.insert(new IntervalNode<string>(17, 19, '17 - 19'));
            tree.insert(new IntervalNode<string>(26, 26, '26 - 26'));
            tree.insert(new IntervalNode<string>(0, 3, '0 - 3'));
            tree.insert(new IntervalNode<string>(6, 10, '6 - 10'));
            tree.insert(new IntervalNode<string>(19, 20, '19 - 20'));

            expect(tree.getRoot()).toBe(
                tree.searchInterval(new Interval(16, 16)),
            );
            expect(tree.nodes).toEqual(10);
            expect(tree.height).toEqual(4);
        });
    });

    describe('SearchInterval', () => {
        it('should be fully inside the interval', () => {
            expect(tree.searchInterval(new Interval(19, 21))?.value).toEqual(
                '15 - 23',
            );
        });

        it('should be fully outside the interval', () => {
            expect(tree.searchInterval(new Interval(7, 10))?.value).toEqual(
                '8 - 9',
            );
        });

        it('should overlap partially on the left', () => {
            expect(tree.searchInterval(new Interval(2, 7))?.value).toEqual(
                '5 - 8',
            );
        });

        it('should overlap partially on the right', () => {
            expect(tree.searchInterval(new Interval(27, 33))?.value).toEqual(
                '25 - 30',
            );
        });

        it('should not overlap', () => {
            expect(tree.searchInterval(new Interval(-7, -5))).toBeUndefined();
        });

        it('should overlap with single point interval', () => {
            expect(tree.searchInterval(new Interval(16, 16))?.value).toEqual(
                '16 - 16',
            );
        });
    });

    describe('Delete', () => {
        it('should delete a leaf', () => {
            node = tree.search(19) as IntervalNode<string>;

            tree.delete(node);

            expect(tree.search(19)).toBeUndefined();
            expect(tree.nodes).toEqual(9);
        });

        it('should delete the root', () => {
            node = tree.search(16) as IntervalNode<string>;

            tree.delete(node);

            expect(tree.getRoot()).toBe(tree.search(17));
            expect(tree.search(16)).toBeUndefined();
            expect(tree.nodes).toEqual(8);
        });

        it('should delete the most right leaf', () => {
            node = tree.search(26) as IntervalNode<string>;

            tree.delete(node);

            expect(tree.search(26)).toBeUndefined();
            expect(tree.nodes).toEqual(7);
        });

        it('should delete the tree max', () => {
            node = tree.search(25) as IntervalNode<string>;

            tree.delete(node);

            expect(tree.search(25)).toBeUndefined();
            expect(tree.nodes).toEqual(6);
        });
    });

    afterEach(() => {
        expect(isValidIntervalTree(tree)).toBe(true);
    });
});

/**
 * Checks if the tree is a valid interval tree.
 */
export function isValidIntervalTree(tree: IntervalTree<string>): boolean {
    return isValidRedBlackTree(tree) && areMaxesCorrect(tree);
}

/**
 * Checks if are the node's max values are correctly calculated.
 */
function areMaxesCorrect(tree: IntervalTree<string>): boolean {
    const root = tree.getRoot() as IntervalNode<string>;
    let isCorrect = true;

    (function getNodeMax(node?: IntervalNode<string>): number {
        if (!node) return 0;

        const leftMax = getNodeMax(node.left);
        const rightMax = getNodeMax(node.right);
        const nodeMax = Math.max(leftMax, rightMax, node.high);

        isCorrect = isCorrect && node.max === nodeMax;

        return nodeMax;
    })(root);

    return isCorrect;
}
