/**
 * @space O(n)
 * @note all indices must be one-based.
 */
export class FenwickTree {
    private readonly n: number;
    // A one-based array i.e. the index starts from 1.
    // That is why, it contains 0.
    private readonly tree: number[] = [0];

    /**
     * Construct a Fenwick tree with an initial set of values.
     * @time O(n)
     */
    constructor(nums: number[]) {
        this.n = nums.length;

        // Clone the nums in to tree array.
        for (let i = 0; i < this.n; i++) this.tree.push(nums[i]);

        // Tree contruction.
        for (let i = 1; i <= this.n; i++) {
            const parent = i + this.rsb(i);

            if (parent <= this.n) this.tree[parent] += this.tree[i];
        }
    }

    /**
     * Returns he position of the first non-zero bit from
     * right in the binary representation.
     * Eventually, it is converted to decimal number.
     * @time O(1)
     */
    private rsb(i: number): number {
        return i & -i;
    }

    /**
     * Adds "value" to the index 'i'.
     * @time O(log n)
     */
    add(idx: number, value: number): void {
        for (let i = idx; i <= this.n; i += this.rsb(i)) {
            this.tree[i] += value;
        }
    }

    /**
     * Computes the sum from [1, i]
     * @time O(log n)
     */
    prefixSum(idx: number): number {
        let sum = 0;

        for (let i = idx; i > 0; i -= this.rsb(i)) {
            sum += this.tree[i];
        }

        return sum;
    }

    /**
     * Range sum. Returns the sum of the interval [from, to].
     * @time O(log n)
     */
    sum(from: number, to: number): number {
        return this.prefixSum(to) - this.prefixSum(from - 1);
    }

    /**
     * Range update. Add values within [from, to] range.
     * @time O(log n)
     */
    // rangeAdd(from: number, to: number, value: number): void {
    //     this.add(to + 1, -value);
    //     this.add(from, value);
    // }

    /**
     * Get the value at index "i".
     * @time O(log n)
     */
    get(i: number): number {
        return this.sum(i, i);
    }

    /**
     * Update the value at index "i" to "value".
     * @time O(log n)
     */
    update(i: number, value: number): void {
        this.add(i, value - this.get(i));
    }

    /**
     * Range update. Updates values within [from, to] range.
     * @time O(log n)
     */
    // rangeUpdate(from: number, to: number, value: number): void {
    //     this.update(from, value);
    //     this.update(to + 1, -value);
    // }

    /**
     * Returns the clone of the tree.
     * For testing purposes.
     * @time O(n)
     */
    getClone(): number[] {
        return [...this.tree];
    }
}
