import {BinarySearchTree} from '../binary-search-tree';
import {BinarySearchNode} from '../binary-search-tree/node';

/**
 * The Splay Tree.
 */
export class SplayTree<T> extends BinarySearchTree<T> {
    /**
     * Searches for a value in the tree starting from root.
     * @complexity O(h)
     */
    search(
        key: number,
        node: BinarySearchNode<T> | undefined = this.root,
    ): BinarySearchNode<T> | undefined {
        const result = super.search(key, node);

        if (result) this.splay(result);

        return result;
    }

    /**
     * Inserts a new node into the tree.
     * @complexity O(h)
     */
    insert(node: BinarySearchNode<T>): void {
        super.insert(node);
        this.splay(node);
    }

    /**
     * Removes the node from the tree.
     * @complexity O(h) -> [because of the "splay" method]
     */
    delete(node: BinarySearchNode<T>): void {
        const leftSubtree = new SplayTree<T>();
        const rightSubtree = new SplayTree<T>();

        this.splay(node);

        leftSubtree.root = this.root?.left;
        rightSubtree.root = this.root?.right;

        if (leftSubtree.root) leftSubtree.root.parent = undefined;
        if (rightSubtree.root) rightSubtree.root.parent = undefined;

        if (leftSubtree.root) {
            const predecessor = this.predecessor(this.root!)!;

            leftSubtree.splay(predecessor);
            /**
             * Predecessor of root is the max of its left subtree.
             * Which means that after splaying it, the left subtree
             * becomes just a double-linked list, where all children
             * are left child of its parents.
             * Which means the root of the leftSubtree is null.
             */
            leftSubtree.root.right = rightSubtree.root;
            this.root = leftSubtree.root;

            // Links the rightSubtree to the leftSubtree.
            if (rightSubtree.root) rightSubtree.root.parent = this.root;
        } else {
            this.root = rightSubtree.root;
        }
    }

    /**
     * Splay the node (turn the node into root).
     * @complexity O(h)
     */
    private splay(node: BinarySearchNode<T>): void {
        let parent: BinarySearchNode<T>;
        let grandparent: BinarySearchNode<T>;

        while (node.parent) {
            if (node.parent === this.root) {
                if (node === node.parent!.left) {
                    /**
                     *      root
                     *  node
                     */
                    this.rightRotate(node.parent);
                } else {
                    /**
                     *  root
                     *      node
                     */
                    this.leftRotate(node.parent);
                }
            } else {
                // grandparent exists, as the parent is not root.
                parent = node.parent!;
                grandparent = node.grandparent!;

                if (grandparent.left === parent) {
                    if (parent.left === node) {
                        /**
                         *          grandparent
                         *      parent
                         *  node
                         */
                        this.rightRotate(grandparent);
                        this.rightRotate(parent);
                    } else {
                        /**
                         *      grandparent
                         *  parent
                         *      node
                         */
                        this.leftRotate(parent);
                        this.rightRotate(grandparent);
                    }
                } else {
                    if (parent.right === node) {
                        /**
                         *  grandparent
                         *          parent
                         *              node
                         */
                        this.leftRotate(grandparent);
                        this.leftRotate(parent);
                    } else {
                        /**
                         *  grandparent
                         *          parent
                         *      node
                         */
                        this.rightRotate(parent);
                        this.leftRotate(grandparent);
                    }
                }
            }
        }
    }

    /**
     * FOR TESTING PURPOSES ONLY.
     */
    searchWithoutSplay(
        key: number,
        node: BinarySearchNode<T> | undefined = this.root,
    ): BinarySearchNode<T> | undefined {
        return super.search(key, node);
    }
}
