import {RedBlackNode, RedBlackNodeColor} from '../red-black-tree/node';

/**
 * The Order Statistic Tree Node.
 */
export class OrderStatisticNode<T> extends RedBlackNode<T> {
    parent?: OrderStatisticNode<T>;
    left?: OrderStatisticNode<T>;
    right?: OrderStatisticNode<T>;
    size: number;

    constructor(
        key: number,
        value: T,
        color: RedBlackNodeColor = RedBlackNodeColor.BLACK,
        parent?: OrderStatisticNode<T>,
        left?: OrderStatisticNode<T>,
        right?: OrderStatisticNode<T>,
    ) {
        super(key, value, color, parent, left, right);

        this.size = 0;
    }
}
