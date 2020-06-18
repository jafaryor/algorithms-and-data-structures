import { OrderStatisticTree } from './';
import { isValidRedBlackTree } from '../red-black-tree/index.spec';


describe('OrderStatisticTree', () => {
    let tree: OrderStatisticTree<string>;

    beforeEach(() => {
        tree = new OrderStatisticTree<string>();
    });
});

/**
 * Checks if the tree is valid order statistic tree.
 */
function isValidOrderStatisticTree(tree: OrderStatisticTree): boolean {
    return isValidRedBlackTree(tree);
}
