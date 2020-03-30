import {RedBlackTree} from './index';

describe('RedBlackTree', () => {
    const tree = new RedBlackTree();

    it('should be empty', () => {
        expect(tree.isEmpty()).toBe(true);
    });
});
