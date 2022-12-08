/**
 * The Segment Tree.
 * @space O(4n)
 */
export class SegmentTree {
    private readonly n: number;
    private readonly tree: number[] = [];

    constructor(nums: number[]) {
        this.n = nums.length;
        this.build(nums, 0, 0, this.n - 1);
    }

    /**
     * Sets the value of nums[idx] to "value".
     */
    update(idx: number, value: number): void {
        return this.updateHelper(0, 0, this.n - 1, idx, value);
    }

    /**
     * Returns the sum of segment nums[left ... right].
     */
    sum(left: number, right: number): number {
        return this.sumHelper(0, 0, this.n - 1, left, right);
    }

    /**
     * Returns the value at specific index.
     */
    get(idx: number): number {
        return this.sumHelper(0, 0, this.n - 1, idx, idx);
    }

    /**
     * Builds the tree.
     * @param nums - input array of numbers.
     * @param nodeIdx  - current node index.
     * @param left - left bundary of the "nums".
     * @param right - right boundary of the "nums".
     * @time O(4n)
     * @space O(logn)
     */
    private build(
        nums: number[],
        nodeIdx: number,
        left: number,
        right: number,
    ): void {
        // Base case. A leaf node is reached.
        if (left === right) this.tree[nodeIdx] = nums[left];
        else {
            // Divide step.
            const mid = Math.floor((left + right) / 2);
            // Conquer step.
            this.build(nums, nodeIdx * 2 + 1, left, mid);
            this.build(nums, nodeIdx * 2 + 2, mid + 1, right);
            // Combine step.
            // Store the sum of the current segment into the current node.
            this.tree[nodeIdx] =
                this.tree[nodeIdx * 2 + 1] + this.tree[nodeIdx * 2 + 2];
        }
    }

    /**
     * Returns the sum of segment nums[rangeLeft, rangeRight].
     * @param nodeIdx - current node index.
     * @param currLeft - left limit of the current segment.
     * @param currRight - right limit of the current segment.
     * @param segLeft - left limit of the given query segment.
     * @param segRight - right limit of the given query segment.
     * @time O(4logn)
     * @space O(logn)
     */
    private sumHelper(
        nodeIdx: number,
        currLeft: number,
        currRight: number,
        segLeft: number,
        segRight: number,
    ): number {
        if (segLeft > segRight) {
            // Base case.
            return 0;
        } else if (currLeft === segLeft && currRight === segRight) {
            // The range is found. Return the sum of the range.
            return this.tree[nodeIdx];
        } else {
            // Considers 2 cases:
            // 1. The segment of the query can fall completely into the
            //    domain of either the left or the right child.
            //    In this case, we go to either left child (tree[currLeft, currMid])
            //    or to the right child (tree[currMid + 1, currRihgt]).
            // 2. The query segment intersects with both children.
            //    In this case we make two recursive calls, one for each child.
            //    First we go to the left child, compute a partial sum of segment
            //    [segLeft, currMid] then go to the right child, compute the
            //    partial sum of segment [currMid + 1, segRight], and then
            //    combine the answers by adding them together.
            const currMid = Math.floor((currLeft + currRight) / 2);

            return (
                this.sumHelper(
                    2 * nodeIdx + 1,
                    currLeft,
                    currMid,
                    segLeft,
                    Math.min(currMid, segRight),
                ) +
                this.sumHelper(
                    2 * nodeIdx + 2,
                    currMid + 1,
                    currRight,
                    Math.max(segLeft, currMid + 1),
                    segRight,
                )
            );
        }
    }

    /**
     * Sets the value of nums[idx] to "value".
     * @param nodeIdx - current node index.
     * @param currLeft - left limit of the current segment.
     * @param currRight - right limit of the current segment.
     * @param idx
     * @param value
     * @time O(logn)
     * @space O(logn)
     */
    private updateHelper(
        nodeIdx: number,
        currLeft: number,
        currRight: number,
        idx: number,
        value: number,
    ): void {
        if (currLeft === currRight) {
            // The node is found. Update its value.
            this.tree[nodeIdx] = value;
        } else {
            const currMid = Math.floor((currLeft + currRight) / 2);

            if (idx <= currMid) {
                // Go to the left child, since idx is within left child's segment.
                this.updateHelper(
                    nodeIdx * 2 + 1,
                    currLeft,
                    currMid,
                    idx,
                    value,
                );
            } else {
                // Go to the right child, since idx is within right child's segment.
                this.updateHelper(
                    nodeIdx * 2 + 2,
                    currMid + 1,
                    currRight,
                    idx,
                    value,
                );
            }

            // Update value of parent, which is sum of its children's values.
            this.tree[nodeIdx] =
                this.tree[nodeIdx * 2 + 1] + this.tree[nodeIdx * 2 + 2];
        }
    }

    /**
     * Returns a copy of the tree.
     */
    getCopy(): number[] {
        return [...this.tree];
    }
}
