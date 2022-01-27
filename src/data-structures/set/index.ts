/**
 * The Set Data Strcuture
 */
export class Set<T> {
    private values = new Array<T>();

    constructor(array?: T[]) {
        if (Array.isArray(array)) {
            array.forEach((value) => this.add(value));
        }
    }

    /**
     * length of the list
     */
    get length(): number {
        return this.values.length;
    }

    /**
     * tells if the list is empty
     */
    isEmpty(): boolean {
        return this.values.length === 0;
    }

    /**
     * adds value to the set
     * @time O(n)
     * @param value
     */
    add(value: T): void {
        if (!~this.values.indexOf(value)) {
            this.values.push(value);
        }
    }

    /**
     * removes the value from the set
     * @time O(n)
     * @param value
     */
    remove(value: T): void {
        const index = this.values.indexOf(value);

        if (~index) {
            this.values.splice(index, 1);
        }
    }

    /**
     * true, is the set contains the value
     * @time O(n)
     * @param value
     */
    contains(value: T): boolean {
        return this.values.indexOf(value) !== -1;
    }

    /**
     * set union
     * @time O(k*n)
     * @param set - set has length of k
     */
    union(set: Set<T>): Set<T> {
        const newSet = new Set<T>(this.values);

        set.traverse(newSet.add.bind(newSet));

        return newSet;
    }

    /**
     * set intersect
     * @time O(k*n)
     * @param set - set has length of k
     */
    intersect(set: Set<T>): Set<T> {
        const newSet = new Set<T>();

        this.values.forEach((value) => {
            if (set.contains(value)) {
                newSet.add(value);
            }
        });

        return newSet;
    }

    /**
     * set difference
     * @time O(k*n)
     * @param set - set has length of k
     */
    difference(set: Set<T>): Set<T> {
        const newSet = new Set<T>();

        this.values.forEach((value) => {
            if (!set.contains(value)) {
                newSet.add(value);
            }
        });

        return newSet;
    }

    /**
     * true, if the set is subset of the passed set
     * @time O(n)
     */
    isSubsetOf(set: Set<T>): boolean {
        return this.values.every(set.contains, set);
    }

    /**
     * traverses through the list
     * @time O(n)
     */
    // tslint:disable-next-line: no-any
    traverse(fn: Function): any {
        for (const value of this.values) {
            const result = fn(value);

            if (result !== undefined) {
                return result;
            }
        }
    }
}
