/**
 * The Set Data Strcuture
 */
export class Set<T> {
    private values = new Array<T>();

    constructor(array?: T[]) {
        if (Array.isArray(array)) {
            array.forEach(value => this.add(value));
        }
    }

    /**
     * length of the list
     */
    public get length(): number {
        return this.values.length;
    }

    /**
     * tells if the list is empty
     */
    public isEmpty(): boolean {
        return this.values.length === 0;
    }

    public add(value: T): void {
        if (!~this.values.indexOf(value)) {
            this.values.push(value);
        }
    }

    public remove(value: T): void {
        const index = this.values.indexOf(value);

        if (~index) {
            this.values.splice(index, 1);
        }
    }

    public contains(value: T): boolean {
        return this.values.indexOf(value) !== -1;
    }

    public union(set: Set<T>): Set<T> {
        const newSet = new Set<T>(this.values);

        set.traverse(newSet.add.bind(newSet));

        return newSet;
    }

    public intersect(set: Set<T>): Set<T> {
        const newSet = new Set<T>();

        this.values.forEach(value => {
            if (set.contains(value)) {
                newSet.add(value);
            }
        });

        return newSet;
    }

    public difference(set: Set<T>): Set<T> {
        const newSet = new Set<T>();

        this.values.forEach(value => {
            if (!set.contains(value)) {
                newSet.add(value);
            }
        });

        return newSet;
    }

    public isSubsetOf(set: Set<T>): boolean {
        return this.values.every(set.contains, set);
    }

    /**
     * traverses through the list
     * @complexity: O(n)
     * @param fn
     */
    public traverse(fn: Function): any {
        for (const value of this.values) {
            const result = fn(value);

            if (result !== undefined) {
                return result;
            }
        }
    }
}
