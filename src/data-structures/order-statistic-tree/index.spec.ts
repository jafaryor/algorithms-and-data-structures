import {OrderStatisticTree} from './';
import {isValidRedBlackTree} from '../red-black-tree/index.spec';
import {OrderStatisticNode} from './node';

describe('OrderStatisticTree', () => {
    let tree: OrderStatisticTree<string>;
    let node: OrderStatisticNode<string>;

    beforeAll(() => {
        tree = new OrderStatisticTree<string>();
    });

    it('should be empty', () => {
        expect(tree.getRoot()).toBeUndefined();
        expect(tree.nodes).toEqual(0);
        expect(tree.height).toEqual(0);
    });

    describe('Insert', () => {
        it('should insert a root', () => {
            node = new OrderStatisticNode<string>(26, '26');
            tree.insert(node);

            expect(tree.getRoot()).toBe(node);
            expect(tree.nodes).toEqual(1);
            expect(tree.height).toEqual(1);
        });

        it('should insert multiple nodes', () => {
            tree.insert(new OrderStatisticNode<string>(41, '41'));
            tree.insert(new OrderStatisticNode<string>(17, '17'));
            tree.insert(new OrderStatisticNode<string>(47, '47'));
            tree.insert(new OrderStatisticNode<string>(14, '14'));
            tree.insert(new OrderStatisticNode<string>(30, '30'));
            tree.insert(new OrderStatisticNode<string>(21, '21'));
            tree.insert(new OrderStatisticNode<string>(28, '28'));
            tree.insert(new OrderStatisticNode<string>(10, '10'));
            tree.insert(new OrderStatisticNode<string>(38, '38'));
            tree.insert(new OrderStatisticNode<string>(16, '16'));
            tree.insert(new OrderStatisticNode<string>(19, '19'));
            tree.insert(new OrderStatisticNode<string>(21, '21'));
            tree.insert(new OrderStatisticNode<string>(7, '7'));
            tree.insert(new OrderStatisticNode<string>(12, '12'));
            tree.insert(new OrderStatisticNode<string>(14, '14'));
            tree.insert(new OrderStatisticNode<string>(20, '20'));
            tree.insert(new OrderStatisticNode<string>(35, '35'));
            tree.insert(new OrderStatisticNode<string>(39, '39'));
            tree.insert(new OrderStatisticNode<string>(3, '3'));

            expect(tree.getRoot()).toBe(tree.search(26));
            expect(tree.nodes).toEqual(20);
            expect(tree.height).toEqual(6);
        });
    });

    describe('Select', () => {
        it('should select 17th smallest node', () => {
            node = tree.select(17)!;

            expect(node).toBe(tree.search(38));
        });

        it('11th and 12th smallest nodes should be equal', () => {
            node = tree.selectRecursive(11)!;

            expect(node.key).toEqual(tree.select(12)!.key);
        });

        it('should select the min node', () => {
            node = tree.select(1)!;

            expect(node).toBe(tree.search(3));
        });

        it('should select the min node', () => {
            node = tree.selectRecursive(20)!;

            expect(node).toBe(tree.search(47));
        });

        it("should be undefined as 30th smallest node doesn't exist", () => {
            node = tree.select(30)!;

            expect(node).toBeUndefined();
        });
    });

    describe('Rank', () => {
        it('should have rank 17', () => {
            node = tree.search(38) as OrderStatisticNode<string>;

            expect(tree.rank(node)).toEqual(17);
        });

        it('should have min rank', () => {
            node = tree.search(3) as OrderStatisticNode<string>;

            expect(tree.rankRecursive(node)).toEqual(1);
        });

        it('should select the min node', () => {
            node = tree.search(47) as OrderStatisticNode<string>;

            expect(tree.rankRecursive(node)).toEqual(20);
        });
    });

    describe('Delete', () => {
        it('should delete a leaf', () => {
            node = tree.search(3) as OrderStatisticNode<string>;

            tree.delete(node);

            expect(tree.search(3)).toBeUndefined();
            expect(tree.nodes).toEqual(19);
        });

        it('should delete the root', () => {
            node = tree.getRoot() as OrderStatisticNode<string>;

            tree.delete(node);

            expect(tree.search(26)).toBeUndefined();
            expect(tree.nodes).toEqual(18);
        });

        it('should delete a random node in left subtree', () => {
            node = tree.search(17) as OrderStatisticNode<string>;

            tree.delete(node);

            expect(tree.search(17)).toBeUndefined();
            expect(tree.nodes).toEqual(17);
        });

        it('should delete the right most node', () => {
            node = tree.search(47) as OrderStatisticNode<string>;

            tree.delete(node);

            expect(tree.search(47)).toBeUndefined();
            expect(tree.nodes).toEqual(16);
        });

        it('should delete a random node in right subtree', () => {
            node = tree.search(38) as OrderStatisticNode<string>;

            tree.delete(node);

            expect(tree.search(38)).toBeUndefined();
            expect(tree.nodes).toEqual(15);
        });

        it('should delete the right most node', () => {
            node = tree.search(41) as OrderStatisticNode<string>;

            tree.delete(node);

            expect(tree.search(41)).toBeUndefined();
            expect(tree.nodes).toEqual(14);
        });

        it('should delete the left most node in right subtree', () => {
            node = tree.search(30) as OrderStatisticNode<string>;

            tree.delete(node);

            expect(tree.search(30)).toBeUndefined();
            expect(tree.nodes).toEqual(13);
        });
    });

    afterEach(() => {
        expect(isValidOrderStatisticTree(tree)).toBe(true);
    });
});

/**
 * Checks if the tree is valid order statistic tree.
 */
export function isValidOrderStatisticTree(
    tree: OrderStatisticTree<string>,
): boolean {
    return isValidRedBlackTree(tree) && isNodeSizeValid(tree);
}

/**
 * Checks if the amount of children + 1 equal to its size.
 */
function isNodeSizeValid(tree: OrderStatisticTree<string>): boolean {
    let valid = true;

    function calculateNodeSize(node?: OrderStatisticNode<string>): number {
        if (!node) return 0;

        const childrenSize =
            calculateNodeSize(node.left) + calculateNodeSize(node.right);

        valid = valid && childrenSize + 1 === node.size;

        return childrenSize + 1;
    }

    calculateNodeSize(tree.getRoot() as OrderStatisticNode<string>);

    return valid;
}
