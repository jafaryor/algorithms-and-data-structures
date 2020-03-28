import {BinaryNode} from './node';

/**
 * The Binary Tree.
 */
export class BinaryTree<T> {
    protected root?: BinaryNode<T>;
    protected inorderWalkLogs: number[] = [];

    /**
     * Prints the tree in the following pattern: [ left | parent | right ]
     * Prints the left -> root -> right
     * @complexity O(n)
     */
    inorderTreeWalk(node: BinaryNode<T> | undefined = this.root): void {
        if (!node) return;

        this.inorderTreeWalk(node.left);

        console.log(node.value);
        // logging logic - start.
        if (node === this.root) this.inorderWalkLogs = [];
        this.inorderWalkLogs.push(node.key);
        // end.

        this.inorderTreeWalk(node.right);
    }

    /**
     * Prints the tree in the following pattern: [ parent | left | right ]
     * Prints children -> root
     * @complexity O(n)
     */
    preorderTreeWalk(node?: BinaryNode<T>): void {
        if (!node) return;

        console.log(node.value);

        this.preorderTreeWalk(node.left);
        this.preorderTreeWalk(node.right);
    }

    /**
     * Prints the tree in the following pattern: [ left | right | parent ]
     * Prints root -> children
     * @complexity O(n)
     */
    postorderTreeWalk(node?: BinaryNode<T>): void {
        if (!node) return;

        this.postorderTreeWalk(node.left);
        this.postorderTreeWalk(node.right);

        console.log(node.value);
    }

    /**
     * Replaces one subtree (a) with another subtree (b).
     * If the "b" is undefined, the subtree "a" will be just removed.
     * @complexity O(1)
     */
    transplant(a: BinaryNode<T>, b: BinaryNode<T> | undefined): void {
        // "a" is root f the tree.
        if (!a.parent) this.root = b;
        // "a" is a left child of its parent.
        else if (a === a.parent.left) a.parent.left = b;
        // "a" is the right child of its parent.
        else a.parent.right = b;

        // Links "b" to the parent of "a".
        if (b) b.parent = a.parent;
    }

    /**
     * Prints the tree starting from root.
     */
    print(
        node: BinaryNode<T> | undefined = this.root,
        indent: string,
        last: boolean
    ): void {
        if (!node) return;

        let line = indent;

        if (last) {
            line += 'R----';
            indent += '   ';
        } else {
            line += 'L----';
            indent += '|  ';
        }

        console.log(`${line}[${node.key}, ${node.value}]`);

        this.print(node.left, indent, false);
        this.print(node.right, indent, true);
    }
}
