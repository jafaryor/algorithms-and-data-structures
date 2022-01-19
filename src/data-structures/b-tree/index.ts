import {BTreeNode} from './node';

/**
 * The B-Tree Class.
 * h = O(log_t(n)), where t - order of the tree.
 */
export class BTree<T> {
    protected root: BTreeNode<T>;
    protected order: number;

    constructor(order: number) {
        if (order < 2) {
            throw new Error('B-Tree order should be great or equal 2!');
        } else {
            this.order = order;
        }

        this.build();
    }

    /**
     * Builds the tree.
     * @timeO(1)
     */
    private build(): BTreeNode<T> {
        // Create a leaf as a root.
        this.root = new BTreeNode<T>();

        return this.root;
    }

    /**
     * Returns the reference to the node with a specific key.
     * @param node - a node to start search from
     * @param key - key to be searched for
     * @time- O(t * log_t(n)), where:
     * t - linear search in array of keys of length <= t
     * log_t(n) - height of the tree
     * @note - If replace the linear search of key with binary search,
     * then the complexity will be:
     * (lg(t) * log_t(n)) = O(lg(t) * lg(n) / lg(t)) = O(lg n)
     */
    search(
        node: BTreeNode<T>,
        key: number,
    ): BTreeNodeAndChildIndex<T> | undefined {
        let i = 1;

        // Linear search of the key.
        while (i <= node.size && key > node.keys[i]) {
            i = i + 1;
        }

        if (i <= node.size && key === node.keys[i]) {
            // The node is found.
            return {
                node,
                childIndex: i,
            };
        } else if (node.isLeaf) {
            // The node was not found.
            return;
        } else {
            // Go to the next children.
            return this.search(node.children[i], key);
        }
    }

    /**
     * Inserts a new node into a tree.
     * @timeO(t * h) = O(t * log_t(n))
     * @spaceO(h) = O(log_t(n))
     */
    insert(key: number, value: T): void {
        if (this.isNodeFull(this.root)) {
            const root = this.root;

            // The root is now first child of the new root.
            this.root = new BTreeNode([], [root]);

            // Split the node as it is full.
            this.split(this.root, 0);
        }

        // Inserts the new node into a non-full node.
        this.insertToNonFull(this.root, key, value);
    }

    /**
     * Deletes the key "key" from the subtree rooted at "node".
     * @timeO(t * h) = O(t * log_t(n))
     * @spaceO(h) = O(log_t(n))
     * @note - must start from root.
     */
    delete(key: number, node: BTreeNode<T>): void {
        // TODO: Implement delete procedure.
    }

    /**
     * Finds the min key of the tree.
     * @note - must start from root.
     * @time- O(log_t(n))
     */
    min(node?: BTreeNode<T>): number | undefined {
        if (!node) {
            return;
        } else if (node.isLeaf) {
            return node.keys[0];
        } else {
            return this.min(node.children[0]);
        }
    }

    /**
     * Finds the max key of the tree.
     * @note - must start from root.
     * @time- O(log_t(n))
     */
    max(node?: BTreeNode<T>): number | undefined {
        if (!node) {
            return;
        } else if (node.isLeaf) {
            return node.keys[node.size - 1];
        } else {
            return this.max(node.children[node.size]);
        }
    }

    /**
     * Splits the child into two and adjusts the node
     * so that it has an additional child.
     * @param parent - parent node which holds reference to the target node.
     * @param nodeIndex - target's node index in the list of parent's children.
     * @timeO(t) - due to loops each running t times.
     * @spaceO(1)
     */
    private split(parent: BTreeNode<T>, nodeIndex: number): void {
        // node has 2t-1 keys and 2t children.
        const node = parent.children[nodeIndex];
        const newNode = new BTreeNode<T>();

        // Sets the type and number of keys of the new node.
        newNode.isLeaf = node.isLeaf;
        newNode.size = this.order - 1;

        // Copies the right half of node's keys to the newNode.
        for (let j = 0; j < this.order - 1; j++) {
            newNode.keys[j] = node.keys[j + this.order];
        }

        if (!node.isLeaf) {
            // Copies the right half of node's children to the newNode.
            for (let j = 0; j < this.order; j++) {
                newNode.children[j] = node.children[j + this.order];
            }
        }

        // Reduces the size of the node by half.
        node.size = this.order;

        // Moves the right half of parent's children to right by 1 slot.
        for (let j = parent.size; j > nodeIndex; j--) {
            parent.children[j + 1] = parent.children[j];
        }

        // Puts the newNode right next to the node in the children list.
        parent.children[nodeIndex + 1] = newNode;

        // Moves the right half of parent's keys to right by 1 slot.
        for (let j = parent.size; j >= nodeIndex; j--) {
            parent.keys[j + 1] = parent.keys[j];
        }

        // Puts the node's key before the newNode's key in the keys list.
        parent.keys[nodeIndex] = node.keys[this.order - 1];

        // Increases the size of parent node by 1.
        parent.size = parent.size + 1;
    }

    /**
     * Inserts a key into a non-full node "node".
     * @timeO(t * h) = O(t * log_t(n)), where:
     * t - while loop
     * log_t(n) - the height of the tree
     * @spaceO(h) = O(log_t(n))
     */
    private insertToNonFull(node: BTreeNode<T>, key: number, value: T): void {
        let i = node.size - 1;

        if (node.isLeaf) {
            // Moves all key greater than "key" to right by 1.
            while (i >= 0 && key < node.keys[i]) {
                node.keys[i + 1] = node.keys[i];
                i--;
            }

            // Puts the key into node's keys list.
            node.keys[i + 1] = key;
            // Increase the keys list size by 1.
            node.size = node.size + 1;
        } else {
            // Finds the correct child, the next recursion goes.
            while (i >= 0 && key < node.keys[i]) {
                i--;
            }

            // Adjusts the next recursion position.
            i++;

            if (this.isNodeFull(node.children[i])) {
                this.split(node, i);

                // Adjusts the next recursion position.
                if (key > node.keys[i]) {
                    i++;
                }
            }

            this.insertToNonFull(node.children[i], key, value);
        }
    }

    /**
     * Checks if the node is full.
     * E.g. if the number of keys is equal to (2t - 1).
     */
    private isNodeFull(node?: BTreeNode<T>): boolean {
        return node?.size === 2 * this.order - 1;
    }
}

/**
 * The type of B-Tree search result.
 */
export interface BTreeNodeAndChildIndex<T> {
    node: BTreeNode<T>;
    childIndex: number;
}
