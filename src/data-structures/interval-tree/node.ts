import {RedBlackNode, RedBlackNodeColor} from '../red-black-tree/node';

/**
 * The Interval Tree Node Class.
 */
export class IntervalNode<T> extends RedBlackNode<T> {
    parent?: IntervalNode<T>;
    left?: IntervalNode<T>;
    right?: IntervalNode<T>;
    high: number;
    max: number;

    constructor(
        low: number, // Low end of the interval.
        high: number, // High end of the interval.
        value: T,
        color: RedBlackNodeColor = RedBlackNodeColor.BLACK,
        parent?: IntervalNode<T>,
        left?: IntervalNode<T>,
        right?: IntervalNode<T>,
    ) {
        // Low end of the interval in the key.
        super(low, value, color, parent, left, right);

        this.high = high;
        this.max = high;
    }

    /**
     * Returns the interval of the node.
     */
    get interval(): Interval {
        return new Interval(this.key, this.high);
    }
}

/**
 * Interval Class.
 * [low, high]
 */
export class Interval {
    low: number;
    high: number;

    constructor(low: number, high: number) {
        this.low = low;
        this.high = high;
    }

    /**
     * Checks if the two intervals overlap.
     * @time O(1)
     */
    isOverlapWith(interval: Interval): boolean {
        return (
            Math.max(this.low, interval.low) <=
            Math.min(this.high, interval.high)
        );
    }
}
