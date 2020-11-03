import {RedBlackTree} from '../red-black-tree';
import {IntervalNode, Interval} from './node';
import {nodePrinterCallback} from '../binary-tree';

/**
 * The Interval Tree.
 * @height = O(lg n)
 */
export class IntervalTree<T> extends RedBlackTree<T> {
    protected root?: IntervalNode<T>;

    /**
     * Finds a node in tree whose interval overlaps provided interval.
     * If there is no interval that overlaps interval, undefined is returned.
     * @complexity O(lg n)
     */
    searchInterval(interval: Interval): IntervalNode<T> | undefined {
        let current = this.root;

        while (current && !interval.isOverlapWith(current.interval)) {
            if (current.left && current.left.max >= interval.low) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return current;
    }

    /**
     * Inserts a node into the tree.
     * @complexity O(lg n) + O(lg n)
     */
    insert(node: IntervalNode<T>): void {
        super.insert(node);

        // Recalculate the max of each node
        // along the path from node up to the root.
        for (let current = node; current != null; current = current.parent!) {
            this.calculateMax(current);
        }
    }

    /**
     * Removes a node from the tree.
     * @complexity O(lg n) + O(lg n)
     */
    delete(node: IntervalNode<T>): void {
        let startNode: IntervalNode<T> | undefined;

        if (node.left && node.right) {
            // Recalculate the max of each node along the path
            // from successor up to the root.
            // Because the root will be transplanted with its successor.
            startNode = this.successor(node)?.parent as IntervalNode<T>;
        } else {
            // Recalculate the max of each node along the path
            // from node up to the root.
            startNode = node?.parent;
        }

        super.delete(node);

        for (let current = startNode; current != null; current = current.parent!) {
            this.calculateMax(current);
        }
    }

    /**
     * Fixes the involved nodes' max after left rotation.
     * @complexity O(1)
     */
    leftRotate(node: IntervalNode<T>): void {
        const right = node.right!;

        super.leftRotate(node);

        right.max = this.getNodeMax(node);
        this.calculateMax(node);
    }

    /**
     * Fixes the involved nodes' max after right rotation.
     * @complexity O(1)
     */
    rightRotate(node: IntervalNode<T>): void {
        const left = node.left!;

        super.rightRotate(node);

        left.max = this.getNodeMax(node);
        this.calculateMax(node);
    }

    /**
     * Prints/draws an order statistic node tree.
     */
    printIntervalTree(): void {
        super.print(this.printIntervalNode as nodePrinterCallback<T>);
    }

    /**
     * Prints an order statistic node.
     */
    private printIntervalNode(node: IntervalNode<T>): string {
        return `[${node.key} - ${node.high}](${node.isRed() ? 'R' : 'B'}, ${node.max})`;
    }

    /**
     * Calculates the node's max value.
     */
    private calculateMax(node: IntervalNode<T>): void {
        node.max = Math.max(node.high, this.getNodeMax(node.left), this.getNodeMax(node.right));
    }

    /**
     * Returns the max of a node.
     * NIL nodes has max equal to 0.
     */
    private getNodeMax(node?: IntervalNode<T>): number {
        return node ? node.max : 0;
    }
}
